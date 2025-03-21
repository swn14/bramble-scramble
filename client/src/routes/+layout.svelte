<script lang="ts">
	import '../app.css';
	let { children } = $props();
	let thisYear = new Date().getFullYear();

	function toggleDarkMode(event: Event) {
		event.preventDefault();
		const currentTheme = localStorage.getItem('theme');
		const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', targetTheme);
		document.documentElement.classList.toggle(
			'dark',
			localStorage.theme === 'dark' ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	}
</script>

<!-- <nav class="topnav flex min-h-[50px] w-full items-center bg-white dark:bg-slate-900">
	<a class="flex text-white">Home</a>
</nav> -->

<nav class="bg-white dark:bg-slate-800">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					type="button"
					class="focus:outline-hidden relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					<!--
			  Icon when menu is closed.
  
			  Menu open: "hidden", Menu closed: "block"
			-->
					<svg
						class="block size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<!--
			  Icon when menu is open.
  
			  Menu open: "block", Menu closed: "hidden"
			-->
					<svg
						class="hidden size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<a
							href="#"
							class="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
							aria-current="page">Home</a
						>
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<button
					onclick={toggleDarkMode}
					class="flex w-10 cursor-pointer justify-self-end bg-transparent"
					><svg
						class="h-[28px] w-[28px] fill-black dark:fill-white"
						viewBox="0 0 512 512"
						xmlns="http://www.w3.org/2000/svg"
					>
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<path
							d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
						></path>
					</svg></button
				>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="sm:hidden" id="mobile-menu">
		<div class="space-y-1 px-2 pb-3 pt-2">
			<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
			<a
				href="#"
				class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
				aria-current="page">Home</a
			>
		</div>
	</div>
</nav>

{@render children()}

<footer class="bg-linear-95 min-h-[50px] from-slate-950 to-gray-700">
	<div class="flex justify-end p-4">
		<p class="text-slate-400">Copyright ©{thisYear} Sheldon Nofer. All Rights Reserved</p>
	</div>
	<div class="flex justify-end">
		<p class="text-slate-400">
			TV and Movie data provided my <a
				class="visited:text-purple-60 text-blue-600 underline hover:text-blue-800"
				href="https://www.themoviedb.org/"
				target="_blank">TMDB</a
			>
		</p>
	</div>
</footer>
