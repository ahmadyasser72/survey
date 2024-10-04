import { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { formatBatasWaktu, isPollActive } from '$lib';
import { NO_IMAGE_FILENAME } from '$lib/constants';

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		const record = await getPoll(locals, params.id);
		const {
			id: pollId,
			nama,
			pertanyaan,
			daftar_pilihan,
			daftar_gambar_pilihan,
			batas_waktu
		} = record;
		const hasil = await getPollResult(locals, pollId);
		const active = isPollActive(record);

		return {
			active,
			hasil,
			nama,
			pertanyaan,
			pilihan: Object.fromEntries(
				daftar_gambar_pilihan.map((value, idx) => [
					daftar_pilihan[idx],
					value.startsWith(NO_IMAGE_FILENAME) ? undefined : locals.pb.files.getUrl(record, value)
				])
			),
			...formatBatasWaktu(batas_waktu)
		};
	} catch (err) {
		if (err instanceof ClientResponseError && err.status === 404) {
			error(404);
		}

		throw err;
	}
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const formData = await request.formData();
		const { id: pollId, daftar_pilihan } = await getPoll(locals, params.id);
		formData.append('polling', pollId);

		await locals.collection.hasil_polling.create(formData);
		return { pilihan: daftar_pilihan[Number(formData.get('index_pilihan'))] };
	}
};

const getPoll = ({ collection: { polling } }: App.Locals, route: string) =>
	polling.getFirstListItem(`nama_route="${route}"`);

const getPollResult = async (
	{ collection: { polling, hasil_polling } }: App.Locals,
	id: string
) => {
	const { daftar_pilihan } = await polling.getOne(id);
	const records = await hasil_polling.getFullList({
		filter: `polling="${id}"`
	});

	const voteArray = Array.from({ length: daftar_pilihan.length }, () => 0);
	for (const { index_pilihan } of records) {
		voteArray[index_pilihan] += 1;
	}

	return Object.fromEntries(daftar_pilihan.map((value, idx) => [value, voteArray[idx]]));
};
