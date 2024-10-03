import type { Poll } from './types';

export const isPollActive = ({ batas_waktu }: Pick<Poll, 'batas_waktu'>) =>
	batas_waktu === '' || Date.parse(batas_waktu) > Date.now();
