import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export async function getBookedDateApi(accessToken: string) {
  const config: AxiosRequestConfig = {
    method: "get",
    url: "http://localhost:8081/user/v1/get-all-booked-date",
    headers: {
      Authorization: accessToken,
      "Api-Key": "8f7e47c84a1db6be39e78b6d8f93d6c5e110dc25abba8babdb3603bd4ff2d767",
    },
  };

  try {
    const response: AxiosResponse = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
