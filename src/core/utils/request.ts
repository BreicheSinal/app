/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse, Method } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

export const requestApi = async (
  url: string,
  method: Method = "GET",
  data?: any
) => {
  try {
    const token = localStorage.getItem("authToken");

    const config = {
      url,
      method,
      data,
      headers: {
        "Content-Type":
          data instanceof FormData ? "multipart/form-data" : "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    if (data instanceof FormData) {
      delete api.defaults.headers["Content-Type"];
    }

    const response: AxiosResponse = await api.request(config);
    return response.data;
  } catch (error: any) {
    console.error("API Request Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
