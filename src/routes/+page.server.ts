import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		return { result: JSON.stringify(Object.fromEntries(form.entries())) };
	}
} satisfies Actions;
