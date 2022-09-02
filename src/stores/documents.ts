import { writable } from 'svelte/store';
import type { LatexDocument } from '../interfaces/LatexDocument';

export const documents = writable<LatexDocument[]>([]);
if (typeof window !== 'undefined') {
	documents.update(() => {
		const localDocs = JSON.parse(localStorage.getItem('docstore') ?? '[]') as LatexDocument[];
		if (!localDocs.length) {
			localDocs.push({
				key: 'unnamed',
				name: 'Unnamed Document',
				content: ''
			});
		}

		return localDocs;
	});

	documents.subscribe((docs) => {
		const oldDocs = localStorage.getItem('documents');
		const migrated = localStorage.getItem('migrated');

		if (oldDocs !== null && !migrated) {
			const docArray = JSON.parse(oldDocs) as LatexDocument[];
			docArray.forEach((docMeta) => {
				docMeta.content = localStorage.getItem(`${docMeta.key}_value`) ?? '';
			});

			localStorage.setItem('migrated', 'true');
			documents.set(docArray);
		}

		localStorage.setItem('docstore', JSON.stringify(docs));
	});
}