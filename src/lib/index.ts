import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

import type { Poll } from './types';

export const isPollActive = ({ batas_waktu }: Pick<Poll, 'batas_waktu'>) =>
	batas_waktu === '' || Date.parse(batas_waktu) > Date.now();

export const formatBatasWaktu = (batas_waktu: string) => {
	if (batas_waktu === '') return {};

	const batas_waktu_date = new Date(batas_waktu);
	const batas_waktu_relative = formatDistanceToNow(batas_waktu, { addSuffix: true, locale: id });

	return { batas_waktu_date, batas_waktu_relative };
};
