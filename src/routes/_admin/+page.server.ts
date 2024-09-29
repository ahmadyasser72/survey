import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({
	locals: {
		collection: { polling }
	}
}) => {
	return polling.getFullList().then((value) => ({
		list: value.map(({ nama, nama_route, batas_waktu }) => ({
			nama,
			route: nama_route,
			batas_waktu: batas_waktu === '' ? undefined : new Date(batas_waktu),
			active: batas_waktu === '' || Date.parse(batas_waktu) > Date.now()
		}))
	}));
};
