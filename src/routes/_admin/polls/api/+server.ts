import { ClientResponseError } from 'pocketbase';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { NO_IMAGE_FILENAME, NO_IMAGE_INPUT_PLACEHOLDER } from '$lib/constants';

export const POST: RequestHandler = async ({ request, url, locals }) => {
	const formData = await request.formData();

	const placeholderImage = await fetch('https://placehold.co/1')
		.then((response) => response.blob())
		.then((blob) => new File([blob], NO_IMAGE_FILENAME));
	const images = formData.getAll('daftar_gambar_pilihan');
	formData.delete('daftar_gambar_pilihan');
	for (const maybeImage of images)
		formData.append(
			'daftar_gambar_pilihan',
			maybeImage === NO_IMAGE_INPUT_PLACEHOLDER ? placeholderImage : maybeImage
		);

	const mode = url.searchParams.get('mode');
	switch (mode) {
		case 'create':
			return create(formData, locals);

		case 'update':
			return update(formData, locals);

		default:
			error(404);
	}
};

export const GET: RequestHandler = async ({ url, locals }) => {
	if (url.searchParams.get('mode') === 'delete') {
		const id = url.searchParams.get('id');
		if (typeof id !== 'string') error(500);

		await locals.collection.polling.delete(id);
		return json({ message: 'Polling berhasil dihapus!' });
	}

	error(404);
};

const create = async (formData: FormData, { collection: { polling } }: App.Locals) => {
	const namaRoute = formData.get('nama_route') as string;
	try {
		await polling.getFirstListItem(`nama_route="${namaRoute}"`);
	} catch (error) {
		if (error instanceof ClientResponseError && error.status === 404) {
			await polling.create(formData);
			return json({ message: 'Polling berhasil dibuat!' });
		}

		throw error;
	}

	return json({ message: `Polling dengan custom link "${namaRoute}" sudah ada!` }, { status: 400 });
};

const update = async (formData: FormData, { collection: { polling } }: App.Locals) => {
	const id = formData.get('id') as string;
	await polling.update(id, formData);
	return json({ message: 'Polling berhasil diupdate!' });
};
