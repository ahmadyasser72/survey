import type { PageServerLoad } from './$types';
import { formatBatasWaktu, isPollActive } from '$lib';

export const load: PageServerLoad = async ({ locals }) => {
	const records = await locals.collection.polling.getFullList();
	return {
		values: records.map((record) => {
			const { nama, nama_route, pertanyaan, gambar_banner, batas_waktu } = record;

			const active = isPollActive({ batas_waktu });
			const { batas_waktu_date: time_limit_date, batas_waktu_relative: time_limit_relative } =
				formatBatasWaktu(batas_waktu);

			return {
				active,
				banner: gambar_banner === '' ? undefined : locals.pb.files.getUrl(record, gambar_banner),
				title: nama,
				description: pertanyaan,
				route: nama_route,
				time_limit_date,
				time_limit_relative
			};
		})
	};
};
