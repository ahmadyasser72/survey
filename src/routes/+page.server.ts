import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const records = await locals.collection.polling.getFullList({sort:"-created"});
	return {
		value: records.map(({ nama, nama_route, pertanyaan }) => ({
			title: nama,
			description: pertanyaan,
			route: nama_route
		})).slice(0,3)
	};
};
