<script lang="ts">
	import EditableImage from './EditableImage.svelte';
	import PilihanPolling, { type Choice } from './PilihanPolling.svelte';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getProgressBar } from '$lib/stores';
	import type { Poll } from '$lib/types';
	import { NO_IMAGE_INPUT_PLACEHOLDER } from '$lib/constants';

	export let mode: 'create' | 'update';
	export let prefilled: Poll & { id?: string } = {
		nama: '',
		nama_route: '',
		pertanyaan: '',
		gambar_banner: '',
		batas_waktu: '',
		daftar_pilihan: [],
		daftar_gambar_pilihan: []
	};

	let choices: Choice[] = prefilled.daftar_pilihan.map((text, idx) => ({
		src: prefilled.daftar_gambar_pilihan[idx],
		text
	}));

	const formatDateTime = (date: Date) =>
		date.toLocaleString('sv-SE').replace(' ', 'T').split(':').slice(0, 2).join(':');

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

		for (const name of formData.keys()) {
			if (name.startsWith('tmp')) formData.delete(name);
		}

		formData.append('daftar_pilihan', JSON.stringify(choices.map(({ text }) => text)));
		if (mode === 'create') {
			for (const { file } of choices)
				formData.append('daftar_gambar_pilihan', file ?? NO_IMAGE_INPUT_PLACEHOLDER);
		}

		const batasWaktu = formData.get('batas_waktu');
		if (typeof batasWaktu === 'string' && batasWaktu !== '')
			formData.set('batas_waktu', new Date(batasWaktu).toISOString());

		return ({ result, update }) => {
			if (result.type === 'success') {
				update({ reset: mode === 'create' });
				if (mode === 'create') {
					choices = [];
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

		<div class="flex flex-col items-center border rounded-lg px-5.5 py-6 mb-2">
			<span>Gambar banner</span>
			<EditableImage id="gambar_banner" allowEditingImage={true} src={prefilled.gambar_banner} />
		</div>

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
					min={formatDateTime(new Date())}
					value={formatDateTime(new Date(prefilled.batas_waktu))}
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

			{#each choices as _, idx}
				<PilihanPolling
					on:delete={() => (choices = [...choices.slice(0, idx), ...choices.slice(idx + 1)])}
					idx={idx + 1}
					bind:src={choices[idx].src}
					bind:text={choices[idx].text}
					bind:file={choices[idx].file}
					allowEditingImage={mode === 'create'}
				/>
			{/each}

			{#if mode === 'create'}
				<button
					on:click|preventDefault={() => (choices = [...choices, {}])}
					class="flex items-center justify-center space-x-1 border-2 border-dashed font-semibold h-16 cursor-pointer"
				>
					<span class="text-4xl -translate-y-1">+</span>
					<span>Tambah pilihan</span>
				</button>
			{/if}

			<button disabled={loading} type="submit" class="g-button disabled:loading"
				>{mode === 'create' ? 'Buat' : 'Update'} polling</button
			>
		</div>
	</form>
</div>
