import { writable } from 'svelte/store';

// Create a writable store for quiz data (used in the layout)
export const quizMetadata = writable({
  title: 'Default',
  tags: [],
  region: '',
  zoom: 1
});
