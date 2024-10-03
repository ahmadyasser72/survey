import type { ProgressBar } from '@prgm/sveltekit-progress-bar';
import { get, writable } from 'svelte/store';

const progressbar = writable<ProgressBar>();
export const getProgressBar = () => get(progressbar);
export const setProgressBar = (progressbar_: ProgressBar) => progressbar.set(progressbar_);
