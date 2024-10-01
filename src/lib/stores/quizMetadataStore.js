import { writable } from 'svelte/store';

// Create a writable store for quiz data (used in the layout) - no defaults set
export const quizMetadata = writable();
