import { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const namaRoute = formData.get('nama_route') as string;
		try {
			await locals.pb.collection('voting').getFirstListItem(`nama_route="${namaRoute}"`);
		} catch (error) {
			if (error instanceof ClientResponseError && error.status === 404) {
				await locals.pb.collection('voting').create(formData);
				return;
			}

			throw error;
		}

		return fail(400, { message: `Voting dengan custom link "${namaRoute}" sudah ada!` });
	}
} satisfies Actions;
