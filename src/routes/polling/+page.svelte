<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="mx-auto w-80% md:w-full py-4 md:px-8 lg:px-32">
	<div class="text-center justify-center p-4">
		<h2>Daftar Polling</h2>
	</div>
	<div class="py-4 grid md:grid-cols-2 gap-4">
		{#each data.value as { nama, pertanyaan, route }}
			<a
				href="/polling/{route}"
				class="flex gap-4 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start"
			>
				<div class="relative w-32 h-32 flex-shrink-0">
					<img
						class="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
						loading="lazy"
						src="/img/pilihan.png"
					/>
				</div>

				<div class="flex flex-col gap-2 py-2">
					<p class="text-xl font-bold">{nama}</p>

					<p class="text-gray-500">
						{pertanyaan}
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>
