import React, { useEffect, useState } from "react";
import { getExpenses } from "../../services/ExpenseService";
import { toast } from "react-toastify";
import { MdInfo } from "react-icons/md";
import ExpenseView from "../../components/user/ExpenseView";

function ViewExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (searchKeyword.trim() == "") {
      setExpenses([...allExpenses]);
      return;
    }

    if (searchKeyword.trim() != "" && searchKeyword.trim().length > 2) {
      const searchedElements = allExpenses.filter((exp) =>
        exp.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      if (searchedElements.length <= 0) {
        return;
      }

      setExpenses(searchedElements);
      return;
    }
  }, [searchKeyword]);

  useEffect(() => {
    //loadExpese
    async function loadExpense() {
      try {
        const exp = await getExpenses();
        console.log(exp);
        setExpenses(exp);
        setAllExpenses(exp);
      } catch (error) {
        toast.error("Error in loading expenses");
        console.log(error);
      }
    }

    loadExpense();
  }, []);

  return (
    <div>
      {expenses.length > 0 && (
        <div>
          <div>
            <div className="flex gap-3 flex-wrap">
              <input
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                }}
                value={searchKeyword}
                type="text"
                id="voice-search"
                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block flex-1 ps-10 p-2.5  "
                placeholder="Search your expense here "
                required
              />
              <h1 className="text-3xl text-end w-fit font-semibold">
                {expenses.length} Items
              </h1>
            </div>

            <div className="flex flex-wrap mt-8 gap-4">
              {expenses.map((expense, index) => (
                <ExpenseView key={index} expense={expense} />
              ))}
            </div>
          </div>
        </div>
      )}
      {expenses.length <= 0 && (
        <div className="flex flex-col justify-center mt-10 items-center gap-2">
          <MdInfo className="text-red-400" size={38} />
          <h1 className="text-center text-3xl font-semibold">
            No expense available
          </h1>
        </div>
      )}
    </div>
  );
}

export default ViewExpenses;
