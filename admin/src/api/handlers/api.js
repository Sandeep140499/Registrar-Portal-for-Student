import axios from "axios";
import config from "../../config";

const createAPI = (contentType) => {
  const apiHeader = {
    "Content-Type": contentType,
  };
  const api = axios.create({
    baseURL: config.apiUrl,
    headers: apiHeader,
  });
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        401 === error?.response?.status ||
        403 === error?.response?.status ||
        400 === error?.response?.status
      ) {
        console.log(error?.response.data, "error");
      }
      throw error?.response?.data;
    }
  );
  return api;
};

export const api = createAPI("application/json");
