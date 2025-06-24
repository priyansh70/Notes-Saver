const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Something went wrong");
  }

  return data;
};

// Authentication API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: getAuthHeaders(),
      credentials: "include",
    });
    return handleResponse(response);
  },
};

// Notes API calls
export const notesAPI = {
  getAllNotes: async () => {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  createNote: async (noteData) => {
    const response = await fetch(`${API_BASE_URL}/createNote`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    return handleResponse(response);
  },

  updateNote: async (noteId, noteData) => {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    return handleResponse(response);
  },

  deleteNote: async (noteId) => {
    const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};
