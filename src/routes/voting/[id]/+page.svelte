<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { onMount, tick } from 'svelte';
	import type { PageData, SubmitFunction } from './$types';
	import ChartHasilPolling from './ChartHasilPolling.svelte';
	import { invalidateAll } from '$app/navigation';
	import { fade, fly, slide } from 'svelte/transition';

	export let data: PageData;

	let hasilPollingHeading: HTMLHeadingElement;
	let showResult = false;
	const toggleShowResult = async (value = !showResult) => {
		showResult = value;
		if (showResult) {
			await tick();
			window.scrollTo({ behavior: 'smooth', top: hasilPollingHeading.offsetTop });
		}
	};

	let voteKey: string;
	onMount(() => {
		const url = new URL(document.URL);
		voteKey = `vote-${url.pathname.split('/').at(-1)}`;
	});

	const handleSubmit: SubmitFunction = async ({ cancel }) => {
		if (localStorage.getItem(voteKey) === '1') {
			alert('Anda sudah pernah vote disini!');
			cancel();
		}

		return async ({ result, update }) => {
			if (result.type === 'success') {
				await applyAction(result);
				await invalidateAll();
				localStorage.setItem(voteKey, '1');
				alert(`Voting untuk "${result.data?.pilihan}" berhasil!`);

				await update({ invalidateAll: false });
				await toggleShowResult(true);
			}
		};
	};

	const doShare = () =>
		navigator.share({ title: `(polling) ${data.nama}`, text: data.pertanyaan, url: document.URL });
</script>

<div class="flex flex-col lg:flex-row children:flex-1 bg-gray-100">
	<section
		class="transition-transform-500"
		class:lg:translate-x-20%={showResult}
		class:lg:translate-x-50%={!showResult}
	>
		<h1 class="text-center text-3xl font-bold mb-8 mt-6">{data.nama}</h1>

		<div class="bg-white rounded-lg shadow-lg w-80% md:w-60ch p-4 mb-8">
			<p>{data.pertanyaan}</p>
		</div>

		<form
			class="flex flex-col items-center w-80% md:min-w-60ch"
			method="POST"
			enctype="multipart/form-data"
			use:enhance={handleSubmit}
		>
			<div class="flex flex-wrap justify-center gap-6">
				{#each Object.entries(data.pilihan) as [pilihan, linkGambar], idx}
					<label
						for="option{idx}"
						class="card-option relative cursor-pointer w-full md:w-64 min-h-64"
					>
						<input
							type="radio"
							id="option{idx}"
							name="index_pilihan"
							value={idx}
							class="hidden peer"
						/>
						<div
							class="bg-white rounded-lg shadow-lg overflow-hidden px-8 py-6 transition-transform duration-300 transform peer-checked:scale-105 peer-checked:border-4 peer-checked:border-blue-500 mb-2 peer-checked:mb-0"
						>
							<img
								src={linkGambar}
								alt="Gambar {pilihan}"
								class="w-full h-40 object-cover rounded-md mb-4"
							/>
							<h2 class="text-center text-2xl font-bold text-gray-800">{pilihan}</h2>
						</div>
					</label>
				{/each}
			</div>
			<div class="relative mt-6 w-full md:w-60ch flex flex-col justify-center">
				<div class="flex justify-center">
					<button class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
						Vote
					</button>
				</div>
				<button
					on:click|preventDefault={() => toggleShowResult()}
					class="md:absolute mt-1 md:mt-0 self-end right-0 bottom-0 hover:text-[#333] underline"
					>{showResult ? 'sembunyikan' : 'tampilkan'} hasil</button
				>
			</div>
		</form>
	</section>

	{#if !showResult}
		<section></section>
	{:else}
		<section in:fade={{ delay: 200 }}>
			<h2 bind:this={hasilPollingHeading} class="text-center text-3xl font-bold mb-8 mt-6">
				Hasil polling
			</h2>

			<div
				class="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-80% md:w-40ch min-h-64 px-8 py-6"
			>
				<ChartHasilPolling data={data.hasil} />
			</div>

			<div class="flex flex-col md:flex-row gap-2 mt-6">
				<button
					on:click={() => invalidateAll()}
					class="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
				>
					Refresh
				</button>
				<a href="/voting" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
					Lihat polling lain
				</a>
				<button
					on:click={doShare}
					class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
				>
					Bagikan
				</button>
			</div>
		</section>
	{/if}
</div>

<style scoped>
	section {
		--at-apply: flex flex-col items-center pb-4 'md:pb-8';
	}
</style>
