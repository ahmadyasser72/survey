import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { POCKETHOST_URL, POCKETHOST_USER, POCKETHOST_PASS } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	const pb = new PocketBase(POCKETHOST_URL);
	await pb.admins.authWithPassword(POCKETHOST_USER, POCKETHOST_PASS);

	event.locals.pb = pb;
	event.locals.collection = {
		polling: pb.collection('polling'),
		hasil_polling: pb.collection('hasil_polling')
	};

	const response = await resolve(event);
	return response;
};
