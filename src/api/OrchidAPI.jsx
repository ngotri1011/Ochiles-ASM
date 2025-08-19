import axios from "axios";

const BASE_URL = import.meta.env.VITE_ORCHID_API_BASE_URL;
export const category_url = import.meta.env.VITE_CATEGORY_URL;
// Axios methods
export const OrchidAPI = {
  getAll: () => axios.get(BASE_URL),
  delete: (id) => axios.delete(`${BASE_URL}/${id}`),
  post: (data) => axios.post(BASE_URL, data),
  put: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  getById: (id) => axios.get(`${BASE_URL}/${id}`)
};

// Fetch API URL (for backward compatibility)
export const Orchid_URL = BASE_URL;

// Fetch API methods
export const OrchidFetchAPI = {
  getAll: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  post: async (data) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  put: async (id, data) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  getById: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
};