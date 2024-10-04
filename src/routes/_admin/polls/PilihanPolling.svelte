<script context="module" lang="ts">
	export interface Choice {
		src?: string;
		file?: File;
		text?: string;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	export let idx: number;
	export let text: Choice['text'];
	export let src: Choice['src'];
	export let file: Choice['file'];
	export let allowEditingImage: boolean;

	const handleImageInputChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		file = currentTarget.files?.[0];
		if (file instanceof File) src = URL.createObjectURL(file);
	};

	const dispatch = createEventDispatcher<{ delete: undefined }>();
</script>

<div class="flex flex-col items-center space-y-1">
	<span>Pilihan {idx}</span>

	<div class="relative w-72 {src !== undefined ? 'h-64' : 'h-32'}">
		<img
			data-test={src}
			class="w-full h-full object-cover"
			src={src ?? 'https://placehold.co/100?text=no+image'}
			alt="{idx} image preview"
		/>

		<div
			class:pointer-events-none={!allowEditingImage}
			class="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center backdrop-blur-none hover:backdrop-blur opacity-0 hover:opacity-100 transition-200"
		>
			<label
				class="bg-black/80 text-white flex items-center justify-center space-x-1 font-semibold cursor-pointer px-4 py-2"
				for="tmp_{idx}_image"
			>
				{#if src !== undefined}
					<span>Ubah gambar</span>
				{:else}
					<span class="text-4xl -translate-y-1">+</span>
					<span>Tambah gambar </span>
				{/if}

				<input
					on:change={handleImageInputChange}
					class="h-0 w-0 opacity-0"
					type="file"
					name="tmp_{idx}_image"
					id="tmp_{idx}_image"
					accept="image/*"
				/>
			</label>
		</div>
	</div>

	<div class="flex w-full">
		<input
			bind:value={text}
			class="border flex-1 px-1"
			type="text"
			name="tmp_{idx}_image_text"
			id="tmp_{idx}_image_text"
			placeholder="..."
			required
		/>

		{#if allowEditingImage}
			<button
				on:click|preventDefault={() => dispatch('delete')}
				class="flex-1 bg-red/80 text-white flex items-center justify-center space-x-1 font-semibold cursor-pointer px-4 py-2"
			>
				Hapus
			</button>
		{/if}
	</div>
</div>
