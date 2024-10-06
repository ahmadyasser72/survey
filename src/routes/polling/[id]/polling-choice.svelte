<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	export let id: string;
	export let text: string;
	export let src: string | undefined;
</script>

<label for="option_{id}" class="relative cursor-pointer w-full md:w-64">
	<input type="radio" id="option_{id}" name="index_pilihan" value={id} class="hidden peer" />
	<Card.Root
		class="transition-transform duration-300 transform peer-checked:scale-105 peer-checked:border-4 peer-checked:border-blue-500"
	>
		{#if src !== undefined}
			<Card.Header>
				<img {src} alt="Gambar {text}" class="w-full h-40 object-cover rounded-md mb-4" />
			</Card.Header>
		{/if}

		<Card.Content>
			<h2 class="text-center text-2xl font-bold text-gray-800">{text}</h2>
		</Card.Content>
	</Card.Root>
</label>
