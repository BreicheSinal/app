/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse, Method } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestApi = async (
  url: string,
  method: Method = "GET",
  data?: object
) => {
  try {
    const response: AxiosResponse = await api.request({
      url,
      method,
      data, 
    });
    return response.data;
  } catch (error: any) {
    console.error("API Request Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default api;
