import React from "react";
import { BsPencil, BsPencilSquare } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { FcDeleteRow } from "react-icons/fc";
import { MdDelete, MdPersonPinCircle } from "react-icons/md";
import { PiPencil, PiPencilCircleThin } from "react-icons/pi";
import { deleteExpense } from "../../services/ExpenseService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ExpenseView({ removeExpense, expense }) {
  const formattedDate = new Date(expense.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    });

    // console.log(result);
    if (result.isConfirmed) {
      try {
        const data = await deleteExpense(expense._id);
        console.log(data);
        removeExpense(expense._id);
        toast.success(data.message);
      } catch (error) {
        toast.error("Error in deleting expense!!");
        console.log(error);
      }
    }

    // const re = confirm("are you sure?");
    // alert(re);
    // if (re) {
    //   try {
    //     const data = await deleteExpense(expense._id);
    //     console.log(data);
    //     removeExpense(expense._id);
    //     toast.success(data.message);
    //   } catch (error) {
    //     toast.error("Error in deleting expense!!");
    //     console.log(error);
    //   }
    // }

    // alert("delete" + expense._id);
    // try {
    //   const data = await deleteExpense(expense._id);
    //   console.log(data);
    //   removeExpense(expense._id);
    //   toast.success(data.message);
    // } catch (error) {
    //   toast.error("Error in deleting expense!!");
    //   console.log(error);
    // }
    // alert("Expense delete");
  }

  return (
    <div className=" dark:bg-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 hover:cursor-pointer relative w-[calc(33%-16px)] mx-auto bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center gap-4 hover:shadow-xl transition">
      {/* Image/Icon */}
      <img
        src="https://img.icons8.com/color/96/money-bag.png"
        alt="expense icon"
        className="w-16 h-16 rounded-xl object-cover"
      />

      {/* Expense Content */}
      <div className="flex-1  w-full">
        {/* Title and Amount */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {expense.title}
          </h2>
          <span className="text-xl font-bold text-green-600">
            ₹{expense.rs}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1">{expense.description}</p>

        {/* Payment and Date */}
        <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
            💵 {expense.paymentMethod}
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="flex gap-2 absolute right-3 top-3">
        <MdDelete
          onClick={handleDelete}
          className=" cursor-pointer p-2 w-7 h-7 bg-gray-300  rounded-full"
          size={20}
        />
        <BsPencilSquare
          className=" cursor-pointer p-2 w-7 h-7 bg-gray-300  rounded-full"
          size={20}
        />
      </div>
    </div>
  );
}

export default ExpenseView;
