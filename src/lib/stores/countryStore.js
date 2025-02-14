import { writable } from 'svelte/store';

function createCountryStore() {
   const { subscribe, update } = writable({
      countryCodes: null,
      favoriteCountries: [],
   });

   async function fetchCountryCodes() {
      try {
         const codes = await fetch("/json/countryCodes.json");
         const jsonCodes = await codes.json();
         update((state) => ({
            ...state,
            countryCodes: jsonCodes,
         }));
      } catch (error) {
         console.error(
            "Error fetching and processing country code json:",
            error,
         );
      }
   }

   async function fetchFavorites() {
      try {
         const favorites = await fetch(
            "/json/country-data/favorite-countries.json",
         );
         const parsedFavorites = await favorites.json();
         update((state) => ({
            ...state,
            favoriteCountries: parsedFavorites?.favorites || [],
         }));
      } catch (error) {
         console.error(
            "Error fetching and processing country code json:",
            error,
         );
      }
   }

   return {
      subscribe,
      fetchCountryCodes,
      fetchFavorites,
   };
}

export const countryStore = createCountryStore();