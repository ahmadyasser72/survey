import PocketBase, { ClientResponseError, type RecordModel } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Voting } from '$lib/types';

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		const record = await getVotingRecord(locals.pb, params.id);
		const { nama, pertanyaan, daftar_pilihan, daftar_gambar_pilihan } = record;

		return {
			nama,
			pertanyaan,
			pilihan: Object.fromEntries(
				daftar_pilihan.map((value, idx) => [
					value,
					locals.pb.files.getUrl(record, daftar_gambar_pilihan[idx])
				])
			)
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
		const { id: votingId, daftar_pilihan } = await getVotingRecord(locals.pb, params.id);
		formData.append('voting', votingId);

		await locals.pb.collection('hasil_voting').create(formData);
		return { pilihan: daftar_pilihan[Number(formData.get('index_pilihan'))] };
	}
};

const getVotingRecord = (pb: PocketBase, route: string) =>
	pb.collection('voting').getFirstListItem<RecordModel & Voting>(`nama_route="${route}"`);
