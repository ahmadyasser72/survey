<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
	<h1 class="text-center text-3xl font-bold mb-8">{data.nama}</h1>

	<form class="flex flex-col items-center">
		<div class="flex flex-wrap justify-center gap-6">
			{#each Object.entries(data.pilihan) as [pilihan, linkGambar], idx}
				<label for="option{idx}" class="card-option relative cursor-pointer">
					<input type="radio" id="option{idx}" name="vote" value={pilihan} class="hidden peer" />
					<div
						class="bg-white rounded-lg shadow-lg overflow-hidden w-64 h-80 p-4 transition-transform duration-300 transform peer-checked:scale-105 peer-checked:border-4 peer-checked:border-blue-500"
					>
						<img
							src={linkGambar}
							alt="Gambar {pilihan}"
							class="w-full h-40 object-cover rounded-md mb-4"
						/>
						<h2 class="text-2xl font-bold text-gray-800 mb-2">{pilihan}</h2>
						<p class="text-gray-700 leading-tight">A beautiful view of the mountain.</p>
					</div>
				</label>
			{/each}
		</div>
		<div class="mt-6">
			<button type="submit" class="bg-blue-500! text-white px-6 py-3 rounded-lg hover:bg-blue-700!">
				Submit Vote
			</button>
		</div>
	</form>
</div>

<div class="flex w-full bg-white border border-gray-300 shadow-md rounded-lg p-5">
	<div class="w-1/3 flex justify-center items-center">
		<div class="w-24 h-24 rounded-full bg-cyan-300 text-white flex justify-center items-center">
			<span class="text-lg font-bold">100%</span>
		</div>
	</div>

	<div class="w-2/3 px-4">
		<div class="mb-2 flex items-center">
			<span class="font-bold">pilihan 1</span>
			<div class="w-full h-4 ml-2 bg-gray-300 rounded-full overflow-hidden">
				<div class="h-full bg-cyan-300 progress-bar" style="width: 100%;"></div>
			</div>
			<span class="ml-2">pilihan 2</span>
		</div>

		<div class="mb-2 flex items-center">
			<span class="font-bold">pilihan 2</span>
			<div class="w-full h-4 ml-2 bg-gray-300 rounded-full overflow-hidden">
				<div class="h-full bg-gray-300" style="width: 0%;"></div>
			</div>
			<span class="ml-2">0 Suara</span>
		</div>

		<div class="mb-2 flex items-center">
			<span class="font-bold">pilihan 3</span>
			<div class="w-full h-4 ml-2 bg-gray-300 rounded-full overflow-hidden">
				<div class="h-full bg-gray-300" style="width: 0%;"></div>
			</div>
			<span class="ml-2">0 Suara</span>
		</div>

		<div class="mt-4 font-bold">Total: 1 suara</div>

		<div class="mt-4 flex space-x-2">
			<button class="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-700">
				Refresh
			</button>
			<button class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
				Kembali Ke Polling
			</button>
			<button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">
				Bagikan
			</button>
		</div>

		<div class="mt-4 bg-gray-100 px-4 py-2 rounded-lg flex items-center justify-between">
			<input type="text" readonly value="https://link" class="bg-transparent w-full outline-none" />
			<button class="text-cyan-500">Copy</button>
		</div>
	</div>
</div>
