import { writable } from "svelte/store";

export const isAuthenticated = writable(false);
export const username = writable("Guest");
export const supporterLevel = writable(0);
export const experience = writable(0);

// UI
export const signupPopupOpen = writable(false);
