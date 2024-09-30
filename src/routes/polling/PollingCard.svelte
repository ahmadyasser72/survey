<script lang="ts">
	export let route: string;
	export let title: string;
	export let description: string;
</script>

<a
	href="/polling/{route}"
	class="flex gap-4 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start px-4"
>
	<div class="flex flex-col gap-2 py-2" style="background-image: /img/bgcard.svg;">
		<p class="text-xl font-bold">{title}</p>
		<p class="text-gray-500">{description}</p>
	</div>
</a>
