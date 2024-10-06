<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';

	export let active: boolean;
	export let route: string;
	export let title: string;
	export let banner: string | undefined;
	export let description: string;
	export let time_limit_date: Date | undefined;
	export let time_limit_relative: string | undefined;

	let rowSpan: number;
	$: {
		rowSpan = 4;
		if (banner !== undefined) rowSpan += 6;
		if (time_limit_date !== undefined) rowSpan += 1;
	}
</script>

<a style="grid-row: span {rowSpan}" href="/polling/{route}">
	<Card.Root class="h-full">
		<div class="h-full flex flex-col justify-center">
			<Card.Header>
				{#if banner !== undefined}
					<img src={banner} alt="Banner polling {title}" class="object-cover h-64 mb-2" />
				{/if}

				<Card.Title class="underline">{title}</Card.Title>
			</Card.Header>

			<Card.Content>{description}</Card.Content>

			{#if time_limit_date !== undefined}
				<Separator class="mb-4" />

				<Card.Footer>
					<p class="text-sm leading-none text-end text-muted-foreground pt-1 md:pt-0">
						{#if active}
							Polling akan ditutup <span
								class="underline underline-dotted"
								title={time_limit_date.toISOString()}>{time_limit_relative}</span
							>
						{:else}
							<span class="text-red-7 font-semibold">Polling sudah ditutup</span>
						{/if}
					</p>
				</Card.Footer>
			{/if}
		</div>
	</Card.Root>
</a>
