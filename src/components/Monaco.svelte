<script lang="ts">
	import type monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	import { onMount } from 'svelte';

	let divEl: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;
	let klass = '';
	export let key: string;
	let oldKey = key;
	$: if (key !== oldKey) {
		oldKey = key;
		editor?.setValue(value);
	}
	export let value: string = '';
	$: if (!value) {
		editor?.setValue(value);
	}
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
			value,
			language: 'txt',
			hideCursorInOverviewRuler: true,
			overviewRulerBorder: false,
			wordWrap: 'on',
			minimap: {
				enabled: false
			}
		});
		editor.onDidChangeModelContent(
			() => (value = editor.getValue({ lineEnding: '\n', preserveBOM: true }))
		);

		return () => {
			editor.dispose();
		};
	});
</script>

<div bind:this={divEl} class={klass} />
