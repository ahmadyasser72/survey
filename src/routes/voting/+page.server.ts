import type { Voting } from '$lib/types';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	const records = await locals.pb.collection('voting').getFullList<Voting>();
	return {
		value: records.map(({ nama, nama_route, pertanyaan }) => ({
			nama,
			route: nama_route,
			pertanyaan
		}))
	};
};
