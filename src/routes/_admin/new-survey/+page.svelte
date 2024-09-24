<script lang="ts">
	import SurveyImageInput from '$lib/components/SurveyImageInput.svelte';

	let images: string[] = [];
	let imageInput: HTMLInputElement;
	const addImage = () => {
		const image = imageInput.files?.[0];
		if (image !== undefined) {
			images.push(URL.createObjectURL(image));
			images = images;
		}

		imageInput.value = '';
	};
</script>

<div>
	<div class="pt-4 pb-6 border-b">
		<h1 class="text-center">Survey baru</h1>
	</div>
	<form class="flex flex-col items-center my-8" method="post">
		<div class="flex flex-col space-y-4 border rounded-lg px-8 py-6">
			<div class="flex flex-col">
				<label for="nama">Nama survey</label>
				<input class="border rounded-sm mt-1 px-1" type="text" name="nama" id="nama" required />
			</div>
			{#each images as image, idx}
				<SurveyImageInput inputId={(idx + 1).toString()} src={image} />
			{/each}
			<div>
				<label
					class="flex items-center justify-center space-x-1 border-2 border-dashed font-semibold h-16 cursor-pointer"
					for="gambar"
				>
					<span class="text-4xl -translate-y-1">+</span>
					<span>Upload gambar</span>
				</label>
				<input
					bind:this={imageInput}
					on:change={addImage}
					disabled={images.length >= 3}
					class="opacity-0 h-0"
					type="file"
					name="gambar"
					id="gambar"
					accept="image/*"
				/>
			</div>
		</div>
	</form>
</div>
