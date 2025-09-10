import React, { useState } from "react";
import { createExpense } from "../../services/ExpenseService";
import { toast } from "react-toastify";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rs: 0,
    paymentMethod: "Cash",
    hidden: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Expense Submitted:", formData);

    // server call..

    try {
      const responseData = await createExpense(formData);
      toast.success("Expense created successfully...");
      setFormData({
        title: "",
        description: "",
        rs: 0,
        paymentMethod: "Cash",
        hidden: false,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in creating expense");
    }

    // alert("Expense Added ✅");
  };

  return (
    <div className="max-w-lg mx-auto mt-1 bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter expense title"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter expense description"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            name="rs"
            value={formData.rs}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Cash">💵 Cash</option>
            <option value="Card">💳 Card</option>
            <option value="UPI">📱 UPI</option>
            <option value="Bank Transfer">🏦 Bank Transfer</option>
          </select>
        </div>

        {/* Hidden Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hidden"
            checked={formData.hidden}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Mark as Hidden</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
