<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { Toaster } from '$lib/components/ui/sonner';

	import PollingResultDrawer from './polling-result-drawer.svelte';
	import PollingChoice from './polling-choice.svelte';
	import LoadingButton from '$lib/components/loading-button.svelte';
	import MetaHeadTags from '$lib/components/meta-head-tags.svelte';

	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData, SubmitFunction } from './$types';

	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	export let data: PageData;

	let showResult = !data.active;
	let voteKey: string;
	onMount(() => {
		const url = new URL(document.URL);
		voteKey = `vote-${url.pathname.split('/').at(-1)}`;
	});

	let loading = false;
	const handleSubmit: SubmitFunction = async ({ cancel, formData }) => {
		if (localStorage.getItem(voteKey) === '1') {
			toast.error('Anda sudah pernah vote disini :(');
			cancel();
			return;
		} else if (formData.get('index_pilihan') == null) {
			toast.error('Anda belum memilih apapun!');
			cancel();
			return;
		}

		loading = true;
		const submitToast = toast.loading('Menunggu respon dari server...', {
			duration: Number.POSITIVE_INFINITY
		});
		return async ({ result, update }) => {
			if (result.type !== 'success') {
				toast.error(`Error: ${result.status}`, { id: submitToast });
			} else {
				await applyAction(result);
				await invalidateAll();
				localStorage.setItem(voteKey, '1');

				toast.success(`Voting untuk "${result.data!.pilihan}" berhasil!`, { id: submitToast });
				await update({ invalidateAll: false });
				showResult = true;
			}

			loading = false;
			setTimeout(() => toast.dismiss(submitToast), 3000);
		};
	};
</script>

<MetaHeadTags
	meta={{
		title: `Pilihanku - Polling ${data.nama}`,
		description: data.pertanyaan,
		image: data.banner_thumbnail
	}}
/>

<div class="flex flex-col items-center pb-4 md:pb-8">
	<h1 class="text-center text-3xl font-bold mb-8 pt-6">{data.nama}</h1>

	<Card.Root class="w-80% md:w-136 mb-8">
		{#if data.banner !== undefined}
			<Card.Header>
				<img
					src={data.banner}
					alt="Banner polling {data.nama}"
					class="h-64 object-cover rounded-md"
				/>
			</Card.Header>
		{/if}

		<Card.Content>
			{data.pertanyaan}
		</Card.Content>

		<Card.Footer>
			<div class="w-full flex flex-col items-center">
				{#if data.batas_waktu_date !== undefined}
					<p class="text-sm">
						{#if data.active}
							Batas waktu polling: <span
								title={data.batas_waktu_relative}
								class="font-semibold underline underline-dotted"
								>{data.batas_waktu_date.toISOString().replace('T', ' ').split('.')[0]}</span
							>
						{:else}
							<span class="text-xl text-red-5 font-bold">Polling ini sudah ditutup</span>
						{/if}
					</p>

					<Separator class="my-2" />
				{/if}

				<PollingResultDrawer
					bind:open={showResult}
					data={{
						polling: data.hasil,
						share: { title: `(polling) ${data.nama}`, text: data.pertanyaan }
					}}
				/>
			</div>
		</Card.Footer>
	</Card.Root>

	<form
		class="flex flex-col items-center w-80% md:(w-full min-w-60ch)"
		method="POST"
		enctype="multipart/form-data"
		use:enhance={handleSubmit}
	>
		<div class:pointer-events-none={!data.active} class="flex flex-wrap justify-center gap-6">
			{#each Object.entries(data.pilihan) as [text, src], idx}
				<PollingChoice id={idx.toString()} {src} {text} />
			{/each}
		</div>
		{#if data.active}
			<LoadingButton {loading} type="submit" class="mt-8 mx-auto w-24 font-semibold">
				Vote
			</LoadingButton>
		{/if}
	</form>

	<Toaster richColors theme="light" />
</div>
