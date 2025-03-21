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
		class="mx-1 cursor-pointer rounded bg-amber-400 px-3 py-2 font-bold text-white hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
		on:click={() => goToPage(currentPage - 1)}
		disabled={currentPage === 1}
	>
		Previous
	</button>

	{#each Array(totalPages) as _, i}
		<button
			class="mx-1 cursor-pointer rounded px-5 py-2 font-bold"
			class:bg-amber-400={currentPage === i + 1}
			class:text-white={currentPage === i + 1}
			class:bg-gray-200={currentPage !== i + 1}
			class:hover:bg-amber-400={currentPage !== i + 1}
			class:hover:text-white={currentPage !== i + 1}
			on:click={() => goToPage(i + 1)}
		>
			{i + 1}
		</button>
	{/each}

	<button
		class="mx-1 cursor-pointer rounded bg-amber-400 px-3 py-2 font-bold text-white hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
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
