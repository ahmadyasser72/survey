import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({
	locals: {
		collection: { polling, jumlah_hasil_polling }
	}
}) => {
	return polling
		.getFullList()
		.then((value) =>
			Promise.all(
				value.map(async ({ id, nama, nama_route, batas_waktu }) => ({
					total: await jumlah_hasil_polling.getOne(id).then(({ total }) => total),
					id,
					nama,
					route: nama_route,
					batas_waktu: batas_waktu === '' ? undefined : new Date(batas_waktu),
					active: batas_waktu === '' || Date.parse(batas_waktu) > Date.now()
				}))
			)
		)
		.then((values) => ({ values }));
};
