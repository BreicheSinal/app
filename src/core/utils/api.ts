import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const postRequest = async (url: string, data: object) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error: any) {
    console.error("API POST Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default api;
