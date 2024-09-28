<script lang="ts">
	import PollingImageInput from './PollingImageInput.svelte';

	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';

	let images: File[] = [];
	let base64Images: string[] = [];
	let imageTexts: string[] = [];
	let imageInput: HTMLInputElement;
	const addImage = () => {
		const files = imageInput.files ?? undefined;
		if (files !== undefined) {
			for (const image of files) {
				imageTexts.push('');
				images.push(image);
				base64Images.push(URL.createObjectURL(image));
				base64Images = base64Images;
			}
		}

		imageInput.value = '';
	};

	const handleSubmit: SubmitFunction = async ({ formData }) => {
		formData.append('daftar_pilihan', JSON.stringify(imageTexts));
		for (const image of images) formData.append('daftar_gambar_pilihan', image);

		return ({ result, update }) => {
			if (result.type === 'success') {
				update();
				images = base64Images = imageTexts = [];
				alert('Polling berhasil dibuat!');
			} else if (result.type === 'failure') {
				alert(result.data?.message);
			}
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
		<div class="flex flex-col space-y-4 border rounded-lg px-8 py-6">
			<div class="flex flex-col">
				<label for="nama">Nama Polling</label>
				<input class="border rounded-sm mt-1 px-1" type="text" name="nama" id="nama" required />
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
					/>
				</div>
			</div>
			<div class="flex flex-col">
				<label for="pertanyaan">Pertanyaan</label>
				<textarea class="border rounded-sm mt-1 px-1" name="pertanyaan" id="pertanyaan" required
				></textarea>
			</div>
			{#each base64Images as image, idx}
				<PollingImageInput
					inputId={(idx + 1).toString()}
					src={image}
					bind:inputText={imageTexts[idx]}
				/>
			{/each}
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
					on:change={addImage}
					disabled={base64Images.length >= 3}
					class="opacity-0 h-0"
					type="file"
					name="gambar"
					id="gambar"
					accept="image/*"
					multiple
				/>
			</div>
			<button type="submit" class="g-button">Submit</button>
		</div>
	</form>
</div>
