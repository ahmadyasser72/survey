export interface Poll {
	nama: string;
	nama_route: string;
	pertanyaan: string;
	daftar_pilihan: string[];
	daftar_gambar_pilihan: string[];
	batas_waktu: string;
}

export interface PollResult {
	index_pilihan: number;
}
