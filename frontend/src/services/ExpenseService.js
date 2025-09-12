import { serverBaseURL } from "../config/config";
import axios from "axios";

// get all expenses + filters
export const getExpenses = async (minPrice = "", maxPrice = "") => {
  const response = await axios.get(
    `${serverBaseURL}/expenses?minPrice=${minPrice}&maxPrice=${maxPrice}`,
    {
      headers: {
        Authorization: "123456",
      },
    }
  );

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

//delete expense
export const deleteExpense = async (expenseId) => {
  const response = await axios.delete(
    `${serverBaseURL}/expenses/${expenseId}`,
    {
      headers: {
        Authorization: "123456",
      },
    }
  );
  return response.data;
};
