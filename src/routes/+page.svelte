<script lang="ts">
	import EditorView from '../components/EditorView.svelte';
	import { documents } from '../stores/documents';
	import { id } from '../stores/id';

	$: active = $documents[$id];

	$: documents.update((docs) => {
		docs[$id] = active;
		return docs;
	});

	const newDocument = () => {
		documents.update(
			(docs) => (
				docs.push({
					key: crypto.randomUUID(),
					name: 'Unnamed Document',
					content: ''
				}),
				docs
			)
		);
		id.set($documents.length - 1);
	};
	const activateDocument = (index: number) => {
		return () => id.set(index);
	};

	const deleteDocument = () => {
		documents.update((docs) => (docs.splice($id, 1), docs));
		if (!$documents.length) {
			newDocument();
		}
		if ($id >= $documents.length) {
			id.set($documents.length - 1);
		}
	};
</script>

<svelte:head>
	<title>{active?.name ?? 'Latex'}</title>
</svelte:head>

<div class="w-full h-full flex">
	{#if active}
		<div class="w-1/3 bg-gray-50 border-r-gray-200 border-r-2 flex flex-col print:hidden">
			<div class="p-3 bg-gray-50 border-b-gray-200 border-b-2 flex justify-between">
				<h1 class="text-2xl font-montserrat font-bold">
					<input type="text" class="bg-transparent outline-none" bind:value={active.name} />
				</h1>
				<button class="flex h-0" on:click={deleteDocument}>
					<div
						class="transition-colors hover:bg-gray-300 bg-gray-200 relative w-8 h-8 rounded-sm text-xl text-red-500 leading-[30px] text-center"
					>
						&#x2715;
					</div>
				</button>
			</div>
			<div class="flex justify-between gap-8 p-3">
				<ul class="text-gray-700 flex-1 font-inter font-medium text-sm">
					{#each $documents as doc, i}
						<li on:click={activateDocument(i)}>
							<div
								class="{doc.key === active.key
									? 'bg-gray-200'
									: ''} p-1 pl-3 hover:bg-gray-200 transition-colors rounded-sm cursor-pointer"
							>
								{doc.name}
							</div>
						</li>
					{/each}
				</ul>
				<button class="flex h-0" on:click={newDocument}>
					<div
						class="transition-colors hover:bg-gray-300 bg-gray-200 relative w-6 h-6 rounded-sm text-xl text-gray-600 leading-[20px] text-center"
					>
						+
					</div>
				</button>
			</div>
			<!-- <div
				class="p-3 h-16 bg-gray-50 border-t-gray-200 border-t-2 flex gap-3 justify-center items-center"
			>
				<div
					class="h-full flex-1 bg-gray-100 border-gray-200 border-2 rounded-md grid place-items-center text-gray-700"
				/>
			</div> -->
		</div>
		<EditorView />
	{/if}
</div>
