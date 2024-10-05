export interface Poll {
	nama: string;
	nama_route: string;
	pertanyaan: string;
	gambar_banner: string;
	daftar_pilihan: string[];
	daftar_gambar_pilihan: string[];
	batas_waktu: string;
}

export interface PollResult {
	index_pilihan: number;
}

export interface PollResultCount {
	total: number;
}
