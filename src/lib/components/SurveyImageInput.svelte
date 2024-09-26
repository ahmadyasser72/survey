<script lang="ts">
	export let src: string;
	export let inputId: string;
	export let inputText: string;
</script>

<div class="flex flex-col items-center space-y-1">
	<span>Pilihan {inputId}</span>
	<img class="w-72" {src} alt="{inputId} preview" />
	<input
		bind:value={inputText}
		class="w-72 border px-1"
		type="text"
		name="{inputId}_image_text"
		id="{inputId}_image_text"
		placeholder="..."
		required
	/>
</div>
