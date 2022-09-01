<script>
	import 'highlight.js/styles/nord.css';
	import 'katex/contrib/mhchem';
	import 'katex/dist/katex.min.css';
	import { onMount } from 'svelte';
	import '../app.css';

	// @ts-expect-error no types for this
	onMount(() => import('katex/contrib/copy-tex'));
</script>

<slot />
