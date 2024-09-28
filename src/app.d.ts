import type { Poll, PollResult } from '$lib/types';
import type PocketBase, { RecordService, RecordModel } from 'pocketbase';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
			collection: {
				polling: RecordService<RecordModel & Poll>;
				hasil_polling: RecordService<RecordModel & PollResult>;
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
