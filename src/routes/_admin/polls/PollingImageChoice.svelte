<script lang="ts">
	export let src: string;
	export let id: string;
	export let text: string;
</script>

<div class="flex flex-col items-center space-y-1">
	<span>Pilihan {id}</span>
	<img class="w-72" {src} alt="{id} preview" />
	<input
		bind:value={text}
		class="w-72 border px-1"
		type="text"
		name="{id}_image_text"
		id="{id}_image_text"
		placeholder="..."
		required
	/>
</div>
