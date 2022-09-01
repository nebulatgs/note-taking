<script lang="ts">
	import hl from 'highlight.js';
	import katex from 'katex';
	export let text: string;
	export let lang: string;
</script>

{#if lang === 'latex' || lang === 'l'}
	{@html katex.renderToString(text, { throwOnError: false, fleqn: true })}
{:else if lang === 'lb'}
	<pre><code>{@html katex.renderToString(text, { throwOnError: false, fleqn: true })}</code></pre>
{:else}
	<pre><code class="language-{lang}"
			>{@html hl.highlightAuto(text, lang ? [lang] : undefined).value}</code
		></pre>
{/if}
