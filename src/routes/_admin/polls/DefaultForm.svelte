<script lang="ts">
	import PollingImageChoice from './PollingImageChoice.svelte';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getProgressBar } from '$lib/stores';
	import type { Poll } from '$lib/types';

	export let mode: 'create' | 'update';
	export let prefilled: Poll & { id?: string } = {
		nama: '',
		nama_route: '',
		pertanyaan: '',
		batas_waktu: '',
		daftar_pilihan: [],
		daftar_gambar_pilihan: []
	};

	const fixDateTime = (date: Date) =>
		date.toLocaleString('sv-SE').replace(' ', 'T').split(':').slice(0, 2).join(':');

	let images: File[] = [];
	let imageSrcs: string[] = prefilled.daftar_gambar_pilihan;
	let choices: string[] = prefilled.daftar_pilihan;
	let imageInput: HTMLInputElement;
	const addChoice = () => {
		const files = imageInput.files ?? undefined;
		if (files !== undefined) {
			for (const image of files) {
				choices.push('');
				images.push(image);
				imageSrcs.push(URL.createObjectURL(image));
				imageSrcs = imageSrcs;
			}
		}

		imageInput.value = '';
	};

	let loading = false;
	const handleSubmit: SubmitFunction<Record<'message', string>> = async ({ formData, cancel }) => {
		const progressbar = getProgressBar();

		if (choices.length === 0) {
			alert('Daftar pilihan masih kosong!');
			cancel();
		} else {
			loading = true;
			progressbar.start();
		}

		formData.append('daftar_pilihan', JSON.stringify(choices));
		if (mode === 'create')
			for (const image of images) formData.append('daftar_gambar_pilihan', image);

		const batasWaktu = formData.get('batas_waktu');
		if (typeof batasWaktu === 'string' && batasWaktu !== '')
			formData.set('batas_waktu', new Date(batasWaktu).toISOString());

		return ({ result, update }) => {
			if (result.type === 'success') {
				update({ reset: mode === 'create' });
				if (mode === 'create') {
					images.length = imageSrcs.length = choices.length = 0;
				}

				alert(result.data?.message);
			} else if (result.type === 'failure') {
				alert(result.data?.message);
			}

			loading = false;
			progressbar.complete();
		};
	};
</script>

<div>
	<h1 class="text-center text-3xl font-bold mb-8 pt-6">Polling baru</h1>
	<form
		class="flex flex-col items-center my-8"
		method="post"
		use:enhance={handleSubmit}
		enctype="multipart/form-data"
	>
		{#if mode === 'update'}
			<input type="hidden" name="id" value={prefilled.id} />
		{/if}
		<div class="flex flex-col space-y-4 border rounded-lg px-8 py-6">
			<div class="flex flex-col">
				<label for="nama">Nama Polling</label>
				<input
					class="border rounded-sm mt-1 px-1"
					type="text"
					name="nama"
					id="nama"
					required
					value={prefilled.nama}
				/>
			</div>
			<div class="flex flex-col">
				<label for="nama_route">Custom link</label>
				<div class="flex items-center mt-1">
					<span class="border h-8 rounded-l-sm px-1 min-w-30% text-center">/polling/</span>
					<input
						class="border h-8 rounded-r-sm px-1 w-75%"
						type="text"
						name="nama_route"
						id="nama_route"
						value={prefilled.nama_route}
						required
					/>
				</div>
			</div>
			<div class="flex flex-col">
				<label for="batas_waktu">Batas waktu (optional)</label>
				<input
					class="border rounded-sm mt-1 px-2 py-1"
					type="datetime-local"
					min={fixDateTime(new Date())}
					value={fixDateTime(new Date(prefilled.batas_waktu))}
					name="batas_waktu"
					id="batas_waktu"
				/>
			</div>
			<div class="flex flex-col">
				<label for="pertanyaan">Pertanyaan</label>
				<textarea class="border rounded-sm mt-1 px-1" name="pertanyaan" id="pertanyaan" required
					>{prefilled.pertanyaan}</textarea
				>
			</div>
			{#each imageSrcs as src, idx}
				<PollingImageChoice id={(idx + 1).toString()} {src} bind:text={choices[idx]} />
			{/each}
			{#if mode === 'create'}
				<div>
					<label
						class="flex items-center justify-center space-x-1 border-2 border-dashed font-semibold h-16 cursor-pointer"
						for="gambar"
					>
						<span class="text-4xl -translate-y-1">+</span>
						<span>Tambah pilihan</span>
					</label>
					<input
						bind:this={imageInput}
						on:change={addChoice}
						disabled={imageSrcs.length >= 3}
						class="opacity-0 h-0"
						type="file"
						name="gambar"
						id="gambar"
						accept="image/*"
						multiple
					/>
				</div>
			{/if}
			<button disabled={loading} type="submit" class="g-button disabled:loading">Submit</button>
		</div>
	</form>
</div>
