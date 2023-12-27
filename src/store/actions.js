// src/store/actions.js

import store from "./index";
import { fetchDataFromAPI } from "../services/apiService"; // Hypothetical API service

// Action to initiate data fetching
export const fetchDataAction = async () => {
  store.updateState({ loading: true, shouldFetchData: true });

  try {
    const data = await fetchDataFromAPI();
    store.updateState({ data, loading: false, shouldFetchData: false });
  } catch (error) {
    store.updateState({ error, loading: false });
  }
};

// More actions can be defined as needed
