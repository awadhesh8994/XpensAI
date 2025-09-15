import axios from "axios";
import { serverBaseURL } from "../config/config";

export const loginUser = async (loginData) => {
  const response = await axios.post(`${serverBaseURL}/auth/login`, loginData, {
    headers: {
      Authorization: "123456",
    },
  });

  return response.data;
};
