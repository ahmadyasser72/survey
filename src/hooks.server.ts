import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('https://surv.pockethost.io');

	const response = await resolve(event);
	return response;
};
