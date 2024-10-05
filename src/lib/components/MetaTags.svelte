<script lang="ts">
	import { onMount } from 'svelte';

	interface Meta {
		title: string;
		description?: string;
		image?: string;
	}

	export let meta: Meta;

	let url: string;
	onMount(() => {
		const _url = new URL(document.URL);
		url = _url.origin + _url.pathname;
	});
</script>

<svelte:head>
	<title>{meta.title}</title>

	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />

	{#each Object.entries(meta) as [key, value]}
		<meta property="og:{key}" content={value} />
	{/each}
</svelte:head>
