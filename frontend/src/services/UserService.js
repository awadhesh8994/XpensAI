import axios from "axios";
import { serverBaseURL } from "../config/config";

// function create user:
export const createUser = async (userObject) => {
  const response = await axios.post(`${serverBaseURL}/users`, userObject, {
    headers: {
      Authorization: "123456",
    },
  });
  return response.data;
};
