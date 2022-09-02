<script lang="ts">
	import type monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import { documents } from '../stores/documents';
	import { id } from '../stores/id';
	// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let divEl: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;
	let klass = '';

	let value = writable('');

	id.subscribe((id) => {
		editor?.setValue($documents[id].content);
		value.set($documents[id].content);
	});

	value.subscribe((value) => {
		documents.update((docs) => ((docs[$id].content = value), docs));
	});

	export { klass as class };

	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				// if (label === 'json') {
				// 	return new jsonWorker();
				// }
				// if (label === 'css' || label === 'scss' || label === 'less') {
				// 	return new cssWorker();
				// }
				// if (label === 'html' || label === 'handlebars' || label === 'razor') {
				// 	return new htmlWorker();
				// }
				// if (label === 'typescript' || label === 'javascript') {
				// 	return new tsWorker();
				// }
				return new editorWorker();
			}
		};

		Monaco = await import('monaco-editor');
		editor = Monaco.editor.create(divEl, {
			value: $value,
			language: 'txt',
			hideCursorInOverviewRuler: true,
			overviewRulerBorder: false,
			wordWrap: 'on',
			minimap: {
				enabled: false
			}
		});
		editor.onDidChangeModelContent(() =>
			value.set(editor.getValue({ lineEnding: '\n', preserveBOM: true }))
		);

		return () => {
			editor.dispose();
		};
	});
</script>

<div bind:this={divEl} class={klass} />
