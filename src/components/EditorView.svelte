<script lang="ts">
	import katex from 'katex';
	import { marked } from 'marked';
	import SvelteMarkdown from 'svelte-markdown';
	import Monaco from '../components/Monaco.svelte';
	import { documents } from '../stores/documents';
	import { id } from '../stores/id';
	import LatexCode from './LatexCode.svelte';
	import LatexInline from './LatexInline.svelte';

	const renderer = new marked.Renderer();
	const codeToHtml = renderer.code.bind(renderer);
	renderer.code = (code, language, isEscaped) => {
		if (language === 'latex') {
			return katex.renderToString(code, { throwOnError: false, fleqn: true });
		}
		return codeToHtml(code, language, isEscaped);
	};

	$: source = marked.lexer($documents[$id].content, {
		renderer,
		smartLists: true,
		gfm: true
	});
</script>

<div class="flex w-full h-full">
	<Monaco class="w-full border-r-gray-100 border-r-2 print:hidden" />
	<div class="w-full p-5 overflow-y-scroll print:absolute print:overflow-hidden">
		<article class="prose">
			<SvelteMarkdown {source} renderers={{ code: LatexCode, codespan: LatexInline }} />
		</article>
	</div>
</div>
