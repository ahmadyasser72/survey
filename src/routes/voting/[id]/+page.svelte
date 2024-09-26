<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { onMount, tick } from 'svelte';
	import type { PageData, SubmitFunction } from './$types';
	import ChartHasilPolling from './ChartHasilPolling.svelte';
	import { invalidateAll } from '$app/navigation';

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

<div class="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
	<h1 class="text-center text-3xl font-bold mb-8">{data.nama}</h1>

	<div class="bg-white rounded-lg shadow-lg min-w-60ch p-4 mb-8">
		<p>{data.pertanyaan}</p>
	</div>

	<form
		class="flex flex-col items-center min-w-40%"
		method="POST"
		enctype="multipart/form-data"
		use:enhance={handleSubmit}
	>
		<div class="flex flex-wrap justify-center gap-6">
			{#each Object.entries(data.pilihan) as [pilihan, linkGambar], idx}
				<label for="option{idx}" class="card-option relative cursor-pointer">
					<input
						type="radio"
						id="option{idx}"
						name="index_pilihan"
						value={idx}
						class="hidden peer"
					/>
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
		<div class="relative mt-6 w-full flex justify-center">
			<button type="submit" class="bg-blue-500! text-white px-6 py-3 rounded-lg hover:bg-blue-700!">
				Vote
			</button>
			<button
				on:click|preventDefault={() => toggleShowResult()}
				class="absolute right-0 bottom-0 hover:text-[#333] underline"
				>{showResult ? 'sembunyikan' : 'tampilkan'} hasil</button
			>
		</div>
	</form>
</div>

{#if showResult}
	<div class="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
		<h2 bind:this={hasilPollingHeading} class="text-center text-3xl font-bold mb-8">
			Hasil polling
		</h2>

		<ChartHasilPolling data={data.hasil} />

		<div class="min-w-40% p-4">
			<div class="flex space-x-2">
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
		</div>
	</div>
{/if}
