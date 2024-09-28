<script lang="ts">
	import PollingCard from './PollingCard.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mx-auto w-80% md:w-full py-4 md:px-8 lg:px-32">
	<div class="text-center justify-center p-4">
		<h1 class="text-center text-3xl font-bold mb-8 pt-6">Daftar Polling</h1>
	</div>
	<div class="py-4 grid md:grid-cols-2 gap-4">
		{#each data.value as { title, description, route }}
			<PollingCard {title} {description} {route} />
		{/each}
	</div>
</div>
