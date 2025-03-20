<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { RandomEpisode, Result, SearchResult, TvShow } from '$lib/server-types';
	import Pagination from '../lib/Pagination.svelte';

	let searchResults: Result<SearchResult<TvShow>>;
	let currentPage = 1;
	let totalPages = 10;
	let query = '';
	let flippedCards = new Map<number, boolean>(); // Track flipped state
	let randomEpisodes = new Map<number, RandomEpisode>();

	// Read query parameters from URL on mount
	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		query = params.get('query') || '';
		currentPage = parseInt(params.get('page') || '1', 10);

		if (query) {
			fetchResults();
		}
	});

	async function fetchResults() {
		if (!query) return; // Avoid empty searches

		const response = await fetch(`/api/tv/search?query=${query}&pageNumber=${currentPage}`, {
			method: 'GET',
			headers: {
				'x-api-key': 'c17b242a-ab82-45e9-9ca0-8a79474f875e'
			}
		});
		searchResults = await response.json();
	}

	async function handleSubmit(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		event.preventDefault();
		flippedCards = new Map<number, boolean>();
		randomEpisodes = new Map<number, RandomEpisode>();
		const data = new FormData(event.currentTarget);
		query = data.get('query') as string;
		currentPage = 1; // Reset to first page on new search

		goto(`?query=${encodeURIComponent(query)}&page=${currentPage}`, { replaceState: true });
		fetchResults();
	}

	const handlePageChange = (event: CustomEvent) => {
		currentPage = event.detail.page;
		goto(`?query=${encodeURIComponent(query)}&page=${currentPage}`, { replaceState: true });
		fetchResults();
	};

	async function toggleFlip(index: number, seriesId: number) {
		const response = await fetch(`/api/tv/random-episode?seriesId=${seriesId}`, {
			method: 'GET',
			headers: {
				'x-api-key': 'c17b242a-ab82-45e9-9ca0-8a79474f875e'
			}
		});
		const randomEpisodeResponse: Result<RandomEpisode> = await response.json();
		if (randomEpisodeResponse.data != null) {
			randomEpisodes.set(seriesId, randomEpisodeResponse.data);
			randomEpisodes = new Map(randomEpisodes);
			flippedCards.set(index, !flippedCards.get(index));
			flippedCards = new Map(flippedCards); // Force reactivity
		}
		console.log(randomEpisodes.get(seriesId));
	}
</script>

<section>
	<div class="flex justify-center">
		<h1>Tellyport</h1>
	</div>
</section>
<section class="m-4">
	<div class="flex justify-items-stretch">
		<form onsubmit={handleSubmit} class="grow">
			<label
				for="default-search"
				class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label
			>
			<div class="relative grow">
				<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
					<svg
						class="h-4 w-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					type="search"
					name="query"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
					placeholder="Search for TV shows..."
					required
				/>
				<button
					type="submit"
					class="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>Search</button
				>
			</div>
		</form>
	</div>
</section>
<section class="m-4">
	{#if searchResults != null && searchResults.data != null}
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each searchResults.data.results as tvShow, i}
				<div class="flip-container">
					<article class="flipper {flippedCards.get(i) ? 'flipped' : ''}">
						<!-- Front Side -->
						<div
							class="front overflow-hidden rounded-lg bg-white shadow-lg {flippedCards.get(i)
								? 'hidden'
								: 'visible'}"
						>
							<img
								class="h-64 w-full object-cover"
								alt={tvShow.name}
								src={tvShow.posterPath
									? 'https://image.tmdb.org/t/p/w500' + tvShow.posterPath
									: 'https://placehold.co/600x400?text=No\\nImage'}
							/>
							<div class="flex flex-col items-center p-4">
								<h2 class="mb-2 text-center text-lg font-semibold">{tvShow.name}</h2>
								<button
									class="mt-auto cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
									onclick={() => toggleFlip(i, tvShow.id)}
								>
									Shuffle
								</button>
							</div>
						</div>

						<!-- Back Side -->
						<div
							class="back overflow-hidden rounded-lg bg-white shadow-lg {flippedCards.get(i)
								? 'visible'
								: 'hidden'}"
						>
							<img
								class="h-64 w-full object-cover"
								alt={randomEpisodes.get(tvShow.id)?.name}
								src={'https://image.tmdb.org/t/p/w500' + randomEpisodes.get(tvShow.id)?.imagePath}
							/>
							<div class="flex flex-col items-center p-4">
								<h2 class="mb-2 text-center text-lg font-semibold">
									{randomEpisodes.get(tvShow.id)?.name}
								</h2>
								<p class="px-2 text-center text-sm">
									Season Number: {randomEpisodes.get(tvShow.id)?.season}
								</p>
								<p class="px-2 text-center text-sm">
									Episode Number: {randomEpisodes.get(tvShow.id)?.episode}
								</p>
								<p class="px-2 text-center text-sm">
									{randomEpisodes.get(tvShow.id)?.overview}
								</p>
								<button
									class="mt-auto cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
									onclick={() => toggleFlip(i, tvShow.id)}
								>
									Start Over
								</button>
							</div>
						</div>
					</article>
				</div>
			{/each}
		</div>
		<Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
	{/if}
</section>

<style>
	.flip-container {
		perspective: 1000px;
	}

	.flipper {
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.flipped .front {
		/* height: 0; */
	}

	.front,
	.back {
		/* position: absolute; */
		/* height: 0; */
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
	}

	.back {
		transform: rotateY(180deg);
		background-color: #f3f4f6;
	}
</style>
