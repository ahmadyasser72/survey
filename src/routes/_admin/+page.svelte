<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const activeClasses = 'bg-green-100 text-green-800';
	const endedClasses = 'bg-red-100 text-red-800';
</script>

<div class="flex flex-col items-center space-y-4 mb-8 mt-4">
	<h1 class="text-xl">Hello @{data.username}</h1>
	<a href="/_admin/polls/create" class="g-button">Buat polling baru</a>
</div>

<div class="overflow-x-auto">
	<table class="min-w-full divide-y divide-gray-200">
		<thead>
			<tr>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Polling</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Link</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Tanggal Berakhir</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Status</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
					>Action</th
				>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200">
			{#each data.list as { id, nama, route, batas_waktu, active }}
				<tr>
					<td class="px-6 py-4 whitespace-nowrap">{nama}</td>
					<td class="px-6 py-4 whitespace-nowrap"
						><a class="underline" href="/polling/{route}">/polling/{route}</a></td
					>
					<td class:text-gray-400={batas_waktu === undefined} class="px-6 py-4 whitespace-nowrap">
						{batas_waktu?.toLocaleString() ?? 'n/a'}
					</td>
					<td class="px-6 py-4 whitespace-nowrap">
						<span
							class="{active
								? activeClasses
								: endedClasses} px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
							>{active ? 'Active' : 'Ended'}</span
						>
					</td>
					<td class="px-6 py-4 whitespace-nowrap">
						<a
							href="/_admin/polls/update?id={id}"
							class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
							>Edit</a
						>
						<button
							class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
							>Delete</button
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
