export interface Poll {
	nama: string;
	nama_route: string;
	pertanyaan: string;
	daftar_pilihan: string[];
	daftar_gambar_pilihan: string[];
}

export interface PollResult {
	index_pilihan: number;
}
