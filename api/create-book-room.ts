import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CreateBookRoom } from "@/model/user";

export async function createBookRoomApi(
  accessToken: string,
  request: CreateBookRoom
) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:8081/user/v1/create-book-room",
    headers: {
      Authorization: accessToken,
      "Api-Key":
        "8f7e47c84a1db6be39e78b6d8f93d6c5e110dc25abba8babdb3603bd4ff2d767",
    },
    data: request,
  };

  try {
    const response: AxiosResponse = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
