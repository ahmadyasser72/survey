<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	export let loading: boolean;
</script>

<Button disabled={loading} {...$$restProps} on:click>
	{#if loading}
		<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
	{/if}
	<slot></slot>
</Button>
