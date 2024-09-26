import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Voting } from '$lib/types';

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		const record = await locals.pb
			.collection('voting')
			.getFirstListItem<Voting>(`nama_route="${params.id}"`);
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
