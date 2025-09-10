import { serverBaseURL } from "../config/config";
import axios from "axios";

export const getExpenses = async () => {
  const response = await axios.get(`${serverBaseURL}/expenses`, {
    headers: {
      Authorization: "123456",
    },
  });

  return response.data;
};

//creating expense

export const createExpense = async (expenseData) => {
  const response = await axios.post(`${serverBaseURL}/expenses`, expenseData, {
    headers: {
      Authorization: "123456",
    },
  });

  return response.data;
};
