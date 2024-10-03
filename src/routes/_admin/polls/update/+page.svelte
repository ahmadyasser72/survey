<script lang="ts">
	import DefaultForm from '../DefaultForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<DefaultForm mode="update" prefilled={data} />
