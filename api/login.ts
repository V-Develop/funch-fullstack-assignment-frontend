import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { LoginRequest } from "@/model/auth";

export async function loginApi(request: LoginRequest) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:8080/auth/v1/login",
    data: request,
  };

  try {
    const response: AxiosResponse = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
