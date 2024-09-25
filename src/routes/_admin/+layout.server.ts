import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ request, setHeaders, locals }) => {
	const auth = request.headers.get('Authorization');
	if (auth !== null) {
		const decoded = atob(auth.split(' ')[1]);
		const [username, password] = decoded.split(':');
		try {
			await locals.pb.collection('users').authWithPassword(username, password);

			return { value: { username, password } };
		} catch (e) {
			// invalid auth
		}
	}

	setHeaders({ 'WWW-Authenticate': 'Basic realm="_admin"' });
	error(401);
};
