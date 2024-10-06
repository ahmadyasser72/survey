<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import PollingResultChart from './polling-result-chart.svelte';

	import type { ComponentProps } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import LoadingButton from '$lib/components/loading-button.svelte';

	export let open: boolean;
	export let data: {
		polling: ComponentProps<PollingResultChart>['data'];
		share: ShareData;
	};

	$: total = Object.values(data.polling).reduce((acc, value) => acc + value);

	let loading = false;
	const refresh = async () => {
		loading = true;
		await invalidateAll();
		loading = false;
	};
</script>

<Drawer.Root bind:open>
	<Drawer.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Tampilkan hasil</Button>
	</Drawer.Trigger>
	<Drawer.Content>
		<div class="mx-auto w-full max-w-sm">
			<Drawer.Header>
				<Drawer.Title>Hasil polling ({total} suara)</Drawer.Title>
			</Drawer.Header>

			<div class="p-4 pb-0">
				<PollingResultChart data={data.polling} />
			</div>

			<Drawer.Footer>
				<div class="grid grid-cols-2 gap-1">
					<LoadingButton on:click={() => refresh()} {loading}>Refresh</LoadingButton>
					<Button on:click={() => navigator.share({ ...data.share, url: document.URL })}
						>Bagikan</Button
					>
					<Button href="/polling">Lihat polling lain</Button>

					<Drawer.Close asChild let:builder>
						<Button builders={[builder]} variant="outline">Tutup</Button>
					</Drawer.Close>
				</div>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
