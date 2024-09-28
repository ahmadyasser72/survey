import type { Poll } from '$lib/types';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ locals }) => {
	const records = await locals.pb.collection('polling').getFullList<Poll>();
	return {
		value: records.map(({ nama, nama_route, pertanyaan }) => ({
			title: nama,
			description: pertanyaan,
			route: nama_route
		}))
	};
};
