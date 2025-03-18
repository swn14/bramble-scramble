<script lang="ts">
	import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import type { PageProps } from './$types';
	import type { ActionResult } from '@sveltejs/kit';
	let responseMessage = '';

	async function handleSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		console.log(data);

		const response = await fetch('/api/registration/api-key', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				emailAddress: data.get('email')
			})
		});

		const result: ActionResult = deserialize(await response.text());

		console.log(result);

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<h1>Register</h1>
<form onsubmit={handleSubmit}>
	<input type="email" name="email" required />
	<button type="submit">Submit</button>
</form>
