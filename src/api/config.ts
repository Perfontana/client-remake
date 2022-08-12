import axios from "axios";
import { auth } from "../store/auth";

const API_PATH = "/api/v1";

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export const isErrorResponse = (response: any): response is ErrorResponse => {
  return !!response.error;
};

axios.interceptors.request.use((config) => {
  if (!config.headers) return config;

  config.baseURL = API_PATH;

  config.headers.Authorization = auth.token;

  return config;
});

axios.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response && error.response.data) {
      return error.response;
    }

    return {
      data: { error: error.name, message: error.message, statusCode: 0 },
    };
  }
);
