<div class="flip-container">
	<!-- <div class="flip-container">
        <article class="flipper dark:bg-slate-800 {flippedCards.get(i) ? 'flipped' : ''}">
            <div
                class="front overflow-hidden rounded-lg shadow-lg {flippedCards.get(i)
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
                    <h2 class="mb-2 text-center text-lg font-semibold dark:text-white">
                        {tvShow.name}
                    </h2>
                    <button
                        class="mt-auto cursor-pointer rounded-lg bg-amber-400 px-4 py-2 text-white transition hover:bg-amber-500"
                        onclick={() => toggleFlip(i, tvShow.id)}
                    >
                        Shuffle
                    </button>
                </div>
            </div>

            <div
                class="back overflow-hidden rounded-lg shadow-lg {flippedCards.get(i)
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
                        class="mt-auto cursor-pointer rounded-lg bg-amber-400 px-4 py-2 text-white transition hover:bg-amber-500"
                        onclick={() => toggleFlip(i, tvShow.id)}
                    >
                        Start Over
                    </button>
                </div>
            </div>
        </article>
    </div> -->

	<div
		class="max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
	>
		<a href="#">
			<img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
		</a>
		<div class="p-5">
			<a href="#">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Noteworthy technology acquisitions 2021
				</h5>
			</a>
			<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
				chronological order.
			</p>
			<a
				href="#"
				class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Read more
				<svg
					class="ms-2 h-3.5 w-3.5 rtl:rotate-180"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>

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
