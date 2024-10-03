import { defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';

export default defineConfig({
	extractors: [extractorSvelte()],
	presets: [presetUno()],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	shortcuts: {
		'g-button': 'px-4 py-2 rounded-lg border bg-[#222]! text-white! font-semibold',
		loading:
			"text-opacity-0! relative before-(content-[''] absolute-center border-l-2 border-r-2 border-dotted rounded-full w-6 h-6 animate-spin)"
	},
	rules: [
		[
			'absolute-center',
			{
				position: 'absolute',
				top: '50%',
				left: '50%',
				translate: '-50% -50%'
			}
		]
	]
});
