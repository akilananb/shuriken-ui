// src/store/effects.js

import store from "./index";
import { fetchDataFromAPI } from "../services/apiService"; // Hypothetical API service

// Effect for fetching data when a specific condition in the state is true
export const fetchDataEffect = () => {
  const subscription = store.subscribe(async (state) => {
    if (state.shouldFetchData) {
      try {
        const data = await fetchDataFromAPI();
        store.updateState({ data, shouldFetchData: false, loading: false });
      } catch (error) {
        store.updateState({ error, loading: false });
      }
    }
  });

  return subscription; // Return the subscription for cleanup
};

// You can define more effects based on your application's needs
