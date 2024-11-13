// A .svelte.js file is the same as a js file, except that Svelte Runes can be used.

// $state holds the reactive title value
export const titleState = $state({
  mainTitle: '',    // e.g., "Driving Side"
  homeTitle: 'Geography Quizzes & Guides | OpenGuessr Education',
  suffix: ' | OpenGuessr Education - Learn Geography!', // Static suffix
});

// A utility function to set the title dynamically
export function setTitle(mainTitle) {
  titleState.mainTitle = mainTitle;

  if (mainTitle) {
    document.title = mainTitle + titleState.suffix;
  } else {
    document.title = titleState.homeTitle;
  }
}

// Optional function for manual updates, like dynamic suffix changes
export function updateSuffix(newSuffix) {
  titleState.suffix = newSuffix;
  document.title = titleState.mainTitle + newSuffix;
}
