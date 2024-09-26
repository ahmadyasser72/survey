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
	$: total = Object.values(data).reduce((acc, value) => acc + value);
</script>

<Pie data={{ labels, datasets: [{ data: Object.values(data) }] }} />
<p class="mt-2 md:mt-4 font-bold">Total: {total} suara</p>
