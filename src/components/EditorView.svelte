<script lang="ts">
	import katex from 'katex';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Monaco from '../components/Monaco.svelte';
	import LatexCode from './LatexCode.svelte';
	import LatexInline from './LatexInline.svelte';

	let local: Storage | null = null;
	export let key: string;

	onMount(() => {
		local = localStorage;
		value = local?.getItem(`${key}_value`) ?? '';
	});

	const renderer = new marked.Renderer();
	const codeToHtml = renderer.code.bind(renderer);
	renderer.code = (code, language, isEscaped) => {
		if (language === 'latex') {
			return katex.renderToString(code, { throwOnError: false, fleqn: true });
		}
		return codeToHtml(code, language, isEscaped);
	};
	let value = '';
	let oldKey = key;
	$: if (key !== oldKey) {
		oldKey = key;
		value = local?.getItem(`${key}_value`) ?? '';
	}

	$: source = marked.lexer(value, {
		renderer,
		smartLists: true,
		gfm: true
	});

	$: if (value) {
		local?.setItem(`${key}_value`, value);
	}
</script>

<div class="flex w-full h-full">
	<Monaco class="w-full border-r-gray-100 border-r-2 print:hidden" bind:value {key} />
	<div class="w-full p-5 overflow-y-scroll print:absolute print:overflow-hidden">
		<article class="prose">
			<SvelteMarkdown {source} renderers={{ code: LatexCode, codespan: LatexInline }} />
		</article>
	</div>
</div>
