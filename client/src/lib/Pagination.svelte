<script lang="ts">
	export let currentPage = 1;
	export let totalPages = 1;

	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
			dispatch('pageChange', { page });
		}
	};

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="mt-4 flex justify-center">
	<button
		class="mx-1 rounded bg-gray-200 px-3 py-2 hover:bg-gray-300 disabled:opacity-50"
		on:click={() => goToPage(currentPage - 1)}
		disabled={currentPage === 1}
	>
		Previous
	</button>

	{#each Array(totalPages) as _, i}
		<button
			class="mx-1 rounded px-3 py-2"
			class:bg-blue-500={currentPage === i + 1}
			class:text-white={currentPage === i + 1}
			class:bg-gray-200={currentPage !== i + 1}
			class:hover:bg-gray-300={currentPage !== i + 1}
			on:click={() => goToPage(i + 1)}
		>
			{i + 1}
		</button>
	{/each}

	<button
		class="mx-1 rounded bg-gray-200 px-3 py-2 hover:bg-gray-300 disabled:opacity-50"
		on:click={() => goToPage(currentPage + 1)}
		disabled={currentPage === totalPages}
	>
		Next
	</button>
</div>

<style>
	button {
		transition: background 0.2s;
	}
</style>
