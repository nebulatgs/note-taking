import { writable } from 'svelte/store';

export const id = writable(0);
if (typeof window !== 'undefined') {
    id.update(() => {
        const localId = JSON.parse(localStorage.getItem('id') ?? '0') as number;
        return localId;
    });

    id.subscribe((id) => {
        localStorage.setItem('id', JSON.stringify(id));
    });
}