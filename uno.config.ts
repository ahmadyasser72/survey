import { defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';

import presetAnimations from 'unocss-preset-animations';
import { presetShadcn } from 'unocss-preset-shadcn';

export default defineConfig({
	extractors: [extractorSvelte()],
	presets: [presetUno(), presetAnimations(), presetShadcn({})],
	content: {
		pipeline: {
			include: [
				// the default
				/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
				// include js/ts files
				'(components|src)/**/*.{js,ts}'
			]
		}
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
	shortcuts: {
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
