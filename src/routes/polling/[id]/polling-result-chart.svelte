<script lang="ts">
	import { Pie } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Colors,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, Colors);

	export let data: Record<string, number>;
	$: labels = Object.keys(data).map((value, idx) => `(${idx + 1}) ${value}`);
</script>

<div class="md:h-88 flex justify-center">
	{#if Object.values(data).every((value) => value === 0)}
		<p class="text-lg font-bold">Data polling kosong</p>
	{:else}
		<Pie
			data={{ labels, datasets: [{ data: Object.values(data) }] }}
			options={{ plugins: { legend: { align: 'start', position: 'bottom' } } }}
		/>
	{/if}
</div>
