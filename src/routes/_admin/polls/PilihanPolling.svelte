<script context="module" lang="ts">
	export interface Choice {
		src?: string;
		file?: File;
		text?: string;
	}
</script>

<script lang="ts">
	import EditableImage from './EditableImage.svelte';

	import { createEventDispatcher } from 'svelte';

	export let idx: number;
	export let text: Choice['text'];
	export let src: Choice['src'];
	export let file: Choice['file'];
	export let allowEditingImage: boolean;

	const dispatch = createEventDispatcher<{ delete: undefined }>();
</script>

<div class="flex flex-col items-center space-y-1">
	<span>Pilihan {idx}</span>

	<EditableImage id="tmp_{idx}_image" {allowEditingImage} bind:file bind:src />

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
