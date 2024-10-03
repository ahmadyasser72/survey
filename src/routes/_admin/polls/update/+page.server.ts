import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	url,
	locals: {
		pb,
		collection: { polling }
	}
}) => {
	const id = url.searchParams.get('id');
	if (id == null) error(404);

	const record = await polling.getOne(id);
	const { nama, nama_route, pertanyaan, batas_waktu, daftar_pilihan, daftar_gambar_pilihan } =
		record;

	return {
		id,
		nama,
		nama_route,
		pertanyaan,
		batas_waktu,
		daftar_pilihan,
		daftar_gambar_pilihan: daftar_gambar_pilihan.map((value) => pb.files.getUrl(record, value))
	};
};

export const actions: Actions = {
	default: async ({ fetch, request }) => {
		const response = await fetch('/_admin/polls/api?mode=update', {
			method: 'POST',
			body: request.body,
			headers: request.headers
		});

		if (response.ok) {
			return (await response.json()) as { message: string };
		}

		error(500, await response.text());
	}
};
