<script lang="ts">
	import ChartHasilPolling from './ChartHasilPolling.svelte';
	import PilihanPolling from './PilihanPolling.svelte';

	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getProgressBar } from '$lib/stores';
	import type { PageData, SubmitFunction } from './$types';

	import { onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	export let data: PageData;

	let topHeading: HTMLHeadingElement, hasilPollingHeading: HTMLHeadingElement;
	let showResult = !data.active;
	const toggleShowResult = async (value = !showResult) => {
		showResult = value;
		await tick();
		(showResult ? hasilPollingHeading : topHeading).scrollIntoView({ behavior: 'smooth' });
	};

	let voteKey: string;
	onMount(() => {
		const url = new URL(document.URL);
		voteKey = `vote-${url.pathname.split('/').at(-1)}`;

		if (!data.active) tick().then(() => hasilPollingHeading.scrollIntoView({ behavior: 'smooth' }));
	});

	let loading = false;
	const handleSubmit: SubmitFunction = async ({ cancel, formData }) => {
		const progressbar = getProgressBar();

		if (localStorage.getItem(voteKey) === '1') {
			alert('Anda sudah pernah vote disini!');
			cancel();
		} else if (formData.get('index_pilihan') == null) {
			alert('Anda belum memilih pilihan!');
			cancel();
		} else {
			loading = true;
			progressbar.start();
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

			loading = false;
			progressbar.complete();
		};
	};

	let loadingRefresh = false;
	const refreshHasilPolling = async () => {
		const progressbar = getProgressBar();
		loadingRefresh = true;
		progressbar.start();
		await invalidateAll();
		progressbar.complete();
		loadingRefresh = false;
	};

	const sharePolling = () =>
		navigator.share({ title: `(polling) ${data.nama}`, text: data.pertanyaan, url: document.URL });
</script>

<div class="flex flex-col lg:flex-row bg-gray-100">
	<section
		class="flex-grow-2! transition-transform-500"
		class:lg:translate-x-0={showResult}
		class:lg:translate-x-25%={!showResult}
	>
		<h1 bind:this={topHeading}>{data.nama}</h1>

		<div class="bg-white rounded-lg shadow-lg w-80% md:w-136 p-4 mb-8">
			<p>{data.pertanyaan}</p>
		</div>

		<form
			class="flex flex-col items-center w-80% md:min-w-60ch"
			method="POST"
			enctype="multipart/form-data"
			use:enhance={handleSubmit}
		>
			<div class:pointer-events-none={!data.active} class="flex flex-wrap justify-center gap-6">
				{#each Object.entries(data.pilihan) as [text, imageSource], idx}
					<PilihanPolling id={idx.toString()} {imageSource} {text} />
				{/each}
			</div>
			<div class="relative mt-6 w-full md:w-60ch flex flex-col justify-center">
				{#if data.active}
					<div class="flex justify-center">
						<button
							disabled={loading}
							class="disabled:loading bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-700"
						>
							Vote
						</button>
					</div>
				{/if}
				<button
					on:click|preventDefault={() => toggleShowResult()}
					class="md:absolute mt-1 md:mt-0 right-0 bottom-0 hover:text-[#333] underline"
					>{showResult ? 'sembunyikan' : 'tampilkan'} hasil</button
				>
			</div>
		</form>
	</section>

	{#if !showResult}
		<section></section>
	{:else}
		<section class="-lg:translate-x-20%" in:fade={{ delay: 200 }}>
			<h2 bind:this={hasilPollingHeading}>Hasil polling</h2>

			<div
				class="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-80% md:w-40ch px-8 py-6"
			>
				<ChartHasilPolling data={data.hasil} />
			</div>

			<div class="flex flex-col md:flex-row gap-2 mt-6">
				<button
					disabled={loadingRefresh}
					on:click={refreshHasilPolling}
					class="disabled:loading bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 disabled:bg-cyan-700"
				>
					Refresh
				</button>
				<a href="/polling" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
					Lihat polling lain
				</a>
				<button
					on:click={sharePolling}
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
		--at-apply: flex-1 flex flex-col items-center pb-4 'md:pb-8';
	}

	section > h1,
	h2 {
		--at-apply: text-center text-3xl font-bold mb-8 pt-6;
	}
</style>
