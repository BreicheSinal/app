import axios, { Method } from "axios";

axios.defaults.baseURL = "http://localhost/";

export interface ApiRequest {
  route: string;
  method?: Method;
  body?: Record<string, unknown>;
}

export const requestApi = async ({
  route,
  method = "GET",
  body,
}: ApiRequest) => {
  try {
    const response = await axios.request({
      url: `${route}`,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    });

    return response.data;
  } catch (error) {
    console.log("======== Error =========");
    console.log(error);
    console.log("======== // =========");

    throw error;
  }
};
