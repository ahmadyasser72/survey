<script lang="ts">
	import BaseForm from '../BaseForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<BaseForm mode="update" prefilled={data} />
