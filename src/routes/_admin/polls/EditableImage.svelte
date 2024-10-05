<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	export let id: string;
	export let src: string | undefined = undefined;
	export let file: File | undefined = undefined;
	export let allowEditingImage: boolean;

	$: noImage = src === undefined || src === '';

	const handleImageInputChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
		file = currentTarget.files?.[0];
		if (file instanceof File) src = URL.createObjectURL(file);
	};
</script>

<div class="relative w-72 {noImage ? 'h-32' : 'h-64'}">
	<img
		class="w-full h-full object-cover"
		src={noImage ? 'https://placehold.co/100?text=no+image' : src}
		alt="{id} image preview"
	/>
	<div
		class:pointer-events-none={!allowEditingImage}
		class="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center backdrop-blur-none hover:backdrop-blur opacity-0 hover:opacity-100 transition-200"
	>
		<label
			class="bg-black/80 text-white flex items-center justify-center space-x-1 font-semibold cursor-pointer px-4 py-2"
			for={id}
		>
			{#if noImage}
				<span class="text-4xl -translate-y-1">+</span>
				<span>Tambah gambar </span>
			{:else}
				<span>Ubah gambar</span>
			{/if}

			<input
				on:change={handleImageInputChange}
				class="h-0 w-0 opacity-0"
				type="file"
				name={id}
				{id}
				accept="image/*"
			/>
		</label>
	</div>
</div>
