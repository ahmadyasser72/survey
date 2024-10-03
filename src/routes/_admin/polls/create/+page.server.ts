import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ fetch, request }) => {
		const response = await fetch('/_admin/polls/api?mode=create', {
			method: 'POST',
			body: request.body,
			headers: request.headers
		});

		switch (response.status) {
			case 200:
			case 400:
				return (await response.json()) as { message: string };

			default:
				error(500, await response.text());
		}
	}
};
