import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({
	locals: {
		collection: { polling }
	}
}) => {
	return polling.getFullList().then((value) => ({
		list: value.map(({ id, nama, nama_route, batas_waktu }) => ({
			id,
			nama,
			route: nama_route,
			batas_waktu: batas_waktu === '' ? undefined : new Date(batas_waktu),
			active: batas_waktu === '' || Date.parse(batas_waktu) > Date.now()
		}))
	}));
};
