import type { PageServerLoad } from './$types';
import { formatBatasWaktu, isPollActive } from '$lib';

export const load: PageServerLoad = async ({ locals }) => {
	const records = await locals.collection.polling.getFullList();
	return {
		values: records.map(({ nama, nama_route, pertanyaan, batas_waktu }) => {
			const active = isPollActive({ batas_waktu });
			const { batas_waktu_date: time_limit_date, batas_waktu_relative: time_limit_relative } =
				formatBatasWaktu(batas_waktu);

			return {
				active,
				title: nama,
				description: pertanyaan,
				route: nama_route,
				time_limit_date,
				time_limit_relative
			};
		})
	};
};
