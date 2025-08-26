import api from '../lib/api.js';

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export const signupUser = async (firstName, lastName, email, password) => {
  try {
    const response = await api.post('/auth/signup', { firstName, lastName, email, password });
    return response.data
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}