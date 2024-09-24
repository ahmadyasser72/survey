<script lang="ts">
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind.css';
</script>

<div class="px-6 h-64px border-b flex items-center space-x-4 text-[#666]">
	<div><a href="/">Home</a></div>
	<div><a href="/#about">About</a></div>
	<div><a href="/#survey">Survey</a></div>
	<div><a href="/#contact">Contact</a></div>
</div>
<div>
	<slot></slot>
</div>

<style scoped>
	:global(h1, h2) {
		--at-apply: text-5xl text-[#333] font-bold;
	}
</style>
