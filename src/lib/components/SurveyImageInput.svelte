<script lang="ts">
	export let src: string;
	export let inputId: string;
</script>

<div class="flex flex-col items-center space-y-1">
	<span>Pilihan {inputId}</span>
	<img class="w-72" {src} alt="{inputId} preview" />
	<input
		class="w-72 border px-1"
		type="text"
		name="{inputId}_image_name"
		id={inputId}
		placeholder="..."
		required
	/>
</div>
