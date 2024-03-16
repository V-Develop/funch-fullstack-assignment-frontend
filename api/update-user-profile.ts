import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { UpdateUserProfile } from "@/model/user";

export async function updateUserProfileApi(
  accessToken: string,
  request: UpdateUserProfile
) {
  const config: AxiosRequestConfig = {
    method: "put",
    url: "http://localhost:8081/user/v1/update-user-profile",
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
