import { defineConfig, presetUno, transformerDirectives } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';

export default defineConfig({
	extractors: [extractorSvelte()],
	presets: [presetUno()],
	transformers: [transformerDirectives()],
	shortcuts: {
		'g-button': 'px-4 py-2 rounded-lg border bg-[#222] text-white font-semibold'
	}
});
