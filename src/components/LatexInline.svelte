<script lang="ts">
	import katex from 'katex';
	export let raw: string;
	$: value = raw.replaceAll(/`$/g, '').replaceAll(/^`/g, '');
</script>

{#if value.at(0) === '\\'}
	{@html katex.renderToString(value, { throwOnError: false, fleqn: true })}
{:else}
	<code>{value}</code>
{/if}
