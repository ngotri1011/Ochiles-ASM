import axios from "axios";

const BASE_URL = "https://67cc1caf3395520e6af72e9c.mockapi.io/fer202/v1/Assignment";

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