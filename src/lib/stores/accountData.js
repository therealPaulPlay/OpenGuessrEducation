import { writable } from 'svelte/store';

export let isAuthenticated = writable(false);