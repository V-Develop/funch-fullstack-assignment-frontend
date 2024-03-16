import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RegisterRequest } from "@/model/auth";

export async function registerApi(request: RegisterRequest) {
  const config: AxiosRequestConfig = {
    method: "post",
    url: "http://localhost:8080/auth/v1/register",
    data: request,
  };

  try {
    const response: AxiosResponse = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
