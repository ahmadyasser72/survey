<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col items-center justify-center space-y-4 mb-8 mt-30">
	<h1 class="text-xl">Hallo: {data.username}</h1>
	<a href="/_admin/new-poll" class="g-button">Buat polling baru</a>
</div>

<div class="overflow-x-auto">
	<table class="min-w-full divide-y divide-gray-200">
		<thead>
			<tr>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poling</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Berakhir</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
				<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
			</tr>
		</thead>
		<tbody class="bg-white divide-y divide-gray-200">
			<tr>
				<td class="px-6 py-4 whitespace-nowrap">Jane Doe</td>
				<td class="px-6 py-4 whitespace-nowrap">http/dajsd.com</td>
				<td class="px-6 py-4 whitespace-nowrap">20-09-2024</td>
				<td class="px-6 py-4 whitespace-nowrap">
					<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
				</td>
				<td class="px-6 py-4 whitespace-nowrap">
					<button class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
					<button class="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>

