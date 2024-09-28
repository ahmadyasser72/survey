<script lang="ts">
	export let route: string;
	export let title: string;
	export let description: string;
</script>

<a
	href="/polling/{route}"
	class="flex gap-4 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start"
>
	<div class="relative w-32 h-32 flex-shrink-0">
		<img
			class="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
			loading="lazy"
			src="/img/pilihan.png"
			alt=""
		/>
	</div>

	<div class="flex flex-col gap-2 py-2">
		<p class="text-xl font-bold">{title}</p>
		<p class="text-gray-500">{description}</p>
	</div>
</a>
