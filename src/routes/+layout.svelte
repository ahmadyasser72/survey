<script lang="ts">
	import '@unocss/reset/tailwind.css';
	import 'virtual:uno.css';

	import { afterNavigate } from '$app/navigation';

	import { setProgressBar } from '$lib/stores';

	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import { onMount } from 'svelte';

	let progressbar: ProgressBar;
	onMount(() => {
		setProgressBar(progressbar);
	});

	let showMobileMenu = false;
	$: mobileMenuClasses = showMobileMenu ? 'max-h-64' : 'max-h-0 <md:-translate-x-100%';
	afterNavigate(() => (showMobileMenu = false));
</script>

<ProgressBar bind:this={progressbar} class="text-gradient" />

<header class="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
	<div class="flex-1 flex justify-between items-center">
		<a href="/" class="text-xl">Pilihanku</a>
	</div>

	<label for="menu-toggle" class="cursor-pointer md:hidden">
		<svg
			class="fill-current text-gray-900"
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
		>
			<title>menu</title>
			<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
		</svg>
	</label>
	<input
		on:change={() => (showMobileMenu = !showMobileMenu)}
		class="hidden"
		type="checkbox"
		id="menu-toggle"
	/>

	<nav id="menu" class="<md:w-full">
		<ul class="md:flex items-center justify-between text-base text-gray-700 {mobileMenuClasses}">
			<li><a class="md:p-4 py-3 px-0 block" href="/">Home</a></li>
			<li><a class="md:p-4 py-3 px-0 block" href="/#about">About</a></li>
			<li><a class="md:p-4 py-3 px-0 block" href="/polling">Polling</a></li>
			<li><a class="md:p-4 py-3 px-0 block" href="/#saran">Saran</a></li>
		</ul>
	</nav>
</header>

<div>
	<slot></slot>
</div>

<footer class="text-sm leading-6 mt-8 px-3">
	<div class="pt-10 pb-28 border-t border-slate-200 sm:flex justify-between text-slate-500">
		<div class="mb-6 sm:mb-0 sm:flex">
			<p>Copyright © 2024 Pilihanku.</p>
		</div>
		<div class="flex space-x-10 text-slate-400">
			<a
				href="https://github.com/ahmadyasser72/survey"
				class="hover:text-slate-500"
				target="_blank"
			>
				<span class="sr-only">GitHub</span><svg width="25" height="24" fill="currentColor">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M12.846 0c-6.63 0-12 5.506-12 12.303 0 5.445 3.435 10.043 8.205 11.674.6.107.825-.262.825-.585 0-.292-.015-1.261-.015-2.291-3.015.569-3.795-.754-4.035-1.446-.135-.354-.72-1.446-1.23-1.738-.42-.23-1.02-.8-.015-.815.945-.015 1.62.892 1.845 1.261 1.08 1.86 2.805 1.338 3.495 1.015.105-.8.42-1.338.765-1.645-2.67-.308-5.46-1.37-5.46-6.075 0-1.338.465-2.446 1.23-3.307-.12-.308-.54-1.569.12-3.26 0 0 1.005-.323 3.3 1.26.96-.276 1.98-.415 3-.415s2.04.139 3 .416c2.295-1.6 3.3-1.261 3.3-1.261.66 1.691.24 2.952.12 3.26.765.861 1.23 1.953 1.23 3.307 0 4.721-2.805 5.767-5.475 6.075.435.384.81 1.122.81 2.276 0 1.645-.015 2.968-.015 3.383 0 .323.225.707.825.585a12.047 12.047 0 0 0 5.919-4.489 12.537 12.537 0 0 0 2.256-7.184c0-6.798-5.37-12.304-12-12.304Z"
					>
					</path>
				</svg>
			</a>
			<a href="/discord" class="hover:text-slate-500">
				<span class="sr-only">Discord</span><svg width="23" height="24" fill="currentColor">
					<path
						d="M9.555 9.23c-.74 0-1.324.624-1.324 1.385S8.827 12 9.555 12c.739 0 1.323-.624 1.323-1.385.013-.761-.584-1.385-1.323-1.385Zm4.737 0c-.74 0-1.324.624-1.324 1.385S13.564 12 14.292 12c.74 0 1.324-.624 1.324-1.385s-.584-1.385-1.324-1.385Z"
					>
					</path>
					<path
						d="M20.404 0H3.442c-.342 0-.68.065-.995.19a2.614 2.614 0 0 0-.843.536 2.46 2.46 0 0 0-.562.801c-.13.3-.197.62-.196.944v16.225c0 .324.066.645.196.944.13.3.321.572.562.801.241.23.527.412.843.537.315.124.653.189.995.19h14.354l-.67-2.22 1.62 1.428 1.532 1.344L23 24V2.472c0-.324-.066-.644-.196-.944a2.46 2.46 0 0 0-.562-.8A2.614 2.614 0 0 0 21.4.19a2.726 2.726 0 0 0-.995-.19V0Zm-4.886 15.672s-.456-.516-.836-.972c1.659-.444 2.292-1.428 2.292-1.428a7.38 7.38 0 0 1-1.456.707 8.67 8.67 0 0 1-1.836.517 9.347 9.347 0 0 1-3.279-.012 11.074 11.074 0 0 1-1.86-.516 7.621 7.621 0 0 1-.924-.409c-.039-.023-.076-.035-.113-.06-.027-.011-.04-.023-.052-.035-.228-.12-.354-.204-.354-.204s.608.96 2.215 1.416c-.38.456-.848.996-.848.996-2.797-.084-3.86-1.824-3.86-1.824 0-3.864 1.822-6.996 1.822-6.996 1.823-1.296 3.557-1.26 3.557-1.26l.127.145c-2.278.623-3.33 1.57-3.33 1.57s.279-.143.747-.347c1.355-.564 2.43-.72 2.873-.756.077-.012.14-.024.216-.024a10.804 10.804 0 0 1 6.368 1.129s-1.001-.9-3.153-1.526l.178-.19s1.735-.037 3.557 1.259c0 0 1.823 3.133 1.823 6.996 0 0-1.076 1.74-3.874 1.824Z"
					>
					</path>
				</svg>
			</a>
		</div>
	</div>
</footer>

<style scoped>
	:global(.text-gradient) {
		background: linear-gradient(to right, #0132d9, #e64c54);
		color: transparent;
	}

	nav#menu ul {
		transition-property: max-height, transform;
		transition-duration: 300ms, 334ms;
		transition-timing-function: ease-out, ease-in-out;
	}
</style>
