<script lang="ts">
	export let active: boolean;
	export let route: string;
	export let title: string;
	export let description: string;
	export let time_limit_date: Date | undefined;
	export let time_limit_relative: string | undefined;
</script>

<a href="/polling/{route}" class="bg-white border border-gray-8 rounded-xl">
	<div class="flex flex-col gap-1 divide-y divide-dashed divide-gray-6 py-2 children:px-2">
		<p class="text-xl text-gray-9 font-bold pb-2">{title}</p>
		<p class="text-lg text-gray-9">{description}</p>
		{#if time_limit_date !== undefined}
			<p class="text-end text-gray-7">
				{#if active}
					Polling akan ditutup <span
						class="underline underline-dotted text-gray-9"
						title={time_limit_date.toISOString()}>{time_limit_relative}</span
					>
				{:else}
					<span class="text-red-7 font-semibold">Polling sudah ditutup</span>
				{/if}
			</p>
		{/if}
	</div>
</a>
