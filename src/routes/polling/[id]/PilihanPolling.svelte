<script lang="ts">
	export let id: string;
	export let text: string;
	export let imageSource: string;
</script>

<label for="option_{id}" class="card-option relative cursor-pointer w-full md:w-64 min-h-64">
	<input type="radio" id="option_{id}" name="index_pilihan" value={id} class="hidden peer" />
	<div
		class="bg-white rounded-lg shadow-lg overflow-hidden px-8 py-6 transition-transform duration-300 transform peer-checked:scale-105 peer-checked:border-4 peer-checked:border-blue-500 mb-2 peer-checked:mb-0"
	>
		<img src={imageSource} alt="Gambar {text}" class="w-full h-40 object-cover rounded-md mb-4" />
		<h2 class="text-center text-2xl font-bold text-gray-800">{text}</h2>
	</div>
</label>
