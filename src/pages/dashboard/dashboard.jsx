import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  Table,
  InputText,
  CardSelect,
  Modal,
} from "../../components/common";
import { useNavigate } from "react-router-dom";
import dashboardImg from "../../assets/img/dashboard-img.svg";
import { Edit, Trash } from "iconsax-react";
import { TRANSACTION_ENDPOINTS } from "../../config/apiConfig";
import axios from "axios";
import { useSelector } from "react-redux";

function Dashboard() {
  const { userId } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState([]);
  const [formState, setFormState] = useState({
    amount: "",
    description: "",
    transactionDate: "",
    type: "",
    categoryId: null,
    transactionId: null,
  });
  const [addformState, setAddFormState] = useState({
    amount: "",
    description: "",
    transactionDate: "",
    type: "",
    categoryId: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const columns = [
    "No",
    "TransactionDate",
    "Type",
    "Amount",
    "Categories",
    "Description",
  ];

  // Navigate to Categories
  const addCategory = () => {
    navigate("/category");
  };

  // Fetch data from API
  const fetchData = async () => {
    if (!token || !userId) {
      console.error("Missing token or userId!");
      return;
    }

    try {
      const response = await axios.get(TRANSACTION_ENDPOINTS.GET_ALL_TRAN, {
        headers: {
          Authorization: `Bearer ${token}`,
          accountHolder_id: userId,
        },
      });
      setTransactionList(response.data);
    } catch (error) {
      console.error(
        "Error fetching Transactions:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, token]);

  // Handle Edit Action
  const handleEdit = (row) => {
    setFormState({
      amount: row.Amount,
      description: row.Description,
      transactionDate: row.TransactionDate,
      type: row.Type,
      categoryId: row.CategoryId,
      transactionId: row.ID,
    });
    setIsModalOpen(true);
  };

  const editTransaction = async (event) => {
    event.preventDefault();
    const {
      amount,
      description,
      transactionDate,
      type,
      categoryId,
      transactionId,
    } = formState;
    try {
      await axios.put(
        TRANSACTION_ENDPOINTS.PUT_TRAN_ID(transactionId),
        { amount, transactionDate, categoryId, type, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Transaction updated successfully!");
      closeModal();
      fetchData();
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction. Please try again.");
    }
  };

  // Handle Delete Action
  const handleDelete = async (row) => {
    try {
      await axios.delete(TRANSACTION_ENDPOINTS.DEL_TRAN_ID(row.ID), {
        headers: {
          Authorization: `Bearer ${token}`,
          accountHolder_id: userId,
        },
      });
      alert("Transaction deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  // Handle Add Action
  const addTransaction = async (event) => {
    event.preventDefault();
    const { amount, description, transactionDate, type, categoryId } =
      addformState;
    try {
      await axios.post(
        TRANSACTION_ENDPOINTS.POST_TRAN,
        {
          amount,
          transactionDate,
          description,
          type,
          accountHolderId: userId,
          categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Transaction added successfully!");
      closeModalAdd();
      fetchData();
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleAddInputChange = (field, value) => {
    setAddFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModalAdd = () => {
    setAddFormState("");
    setIsModalOpenAdd(false);
  };

  const actions = [
    { icon: <Edit />, type: "edit", onClick: handleEdit },
    { icon: <Trash />, type: "delete", onClick: handleDelete },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
        <div>
          <h1 className="font-black text-2xl">Track Your Finances with Ease</h1>
          <p className="py-4 mb-4">
            Welcome to your Budget Tracker Dashboard! Manage your financial
            transitions seamlessly.
          </p>
        </div>
        <img src={dashboardImg} alt="Categories" className="h-60 w-60 p-6" />
      </div>

      <div className="flex items-center justify-between flex-row max-w-screen-lg px-4">
        <h1 className="font-medium text-xl">Transitions</h1>
        <div className="flex items-center justify-between flex-row max-w-screen-lg px-4">
          <Button
            text="Categories"
            onClick={addCategory}
            variant="primary"
            tailwindClass="w-full"
          />
          <Button
            text="Add Transition"
            onClick={() => setIsModalOpenAdd(true)}
            variant="primary"
            tailwindClass="w-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-center flex-row max-w-screen-lg px-4">
        <Table
          columns={columns}
          data={transactionList.map((transaction, index) => ({
            No: index + 1,
            ID: transaction.id,
            TransactionDate: transaction.transactionDate,
            Type: transaction.type,
            Amount: transaction.amount,
            Categories: transaction.categoryResponseDTO.name,
            CategoryId: transaction.categoryResponseDTO.id,
            Description: transaction.description,
          }))}
          actions={actions}
          tailwindClass="bg-cardBg dark:bg-darkCardBg"
          variant="primary"
        />
      </div>
      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        tailwindClass="bg-cardBg dark:bg-darkCardBg p-16"
      >
        <h1 className="font-black text-2xl mb-12">Edit Transition</h1>
        <form onSubmit={editTransaction}>
          <p className="text-textColor dark:text-darkTextColor">
            Select Transition Type
          </p>
          {/* <CardSelect
            name="Select Transition Type"
            onChange={(value) => handleSelection(value)}
          /> */}
          <CardSelect
            name="Select Transition Type"
            defaultValue={formState.type || "income"} // Default to "income" if type is not set
            onChange={(value) => handleInputChange("type", value)}
          />
          <InputText
            type="number"
            labelFor="amount"
            labelName="Transition Amount"
            inputId="amount"
            name="Transition Amount"
            placeholder="Enter amount"
            value={formState.amount}
            onChange={(e) => handleInputChange("amount", e.target.value)}
          />
          <InputText
            type="text"
            labelFor="category"
            labelName="Category"
            inputId="category"
            name="Category"
            placeholder="Enter Category"
            value={formState.categoryId}
            onChange={(e) => handleInputChange("category", e.target.value)}
          />
          <InputText
            type="text"
            labelFor="description"
            labelName="Description"
            inputId="description"
            name="Description"
            placeholder="Enter Description"
            value={formState.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          {/* <InputText
            type="date"
            labelFor="transactionDate"
            labelName="Transaction Date"
            inputId="transactionDate"
            name="Transaction Date"
            placeholder="Enter Transaction Date"
            value={formState.transactionDate}
            onChange={(e) => handleInputChange("description", e.target.value)}
          /> */}
          <ReactDatePicker
            selected={
              formState.transactionDate
                ? new Date(formState.transactionDate + "T00:00:00")
                : null
            }
            onChange={(date) =>
              handleInputChange(
                "transactionDate",
                date ? date.toISOString().split("T")[0] : ""
              )
            }
            dateFormat="yyyy-MM-dd"
            placeholderText="Enter Transaction Date"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <Button
            type="submit"
            text="Edit"
            variant="primary"
            tailwindClass="w-full mt-12"
          />
        </form>
      </Modal>

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpenAdd}
        onClose={closeModalAdd}
        tailwindClass="bg-cardBg dark:bg-darkCardBg p-16"
      >
        <h1 className="font-black text-2xl mb-12">Add Transition</h1>
        <form onSubmit={addTransaction}>
          <p className="text-textColor dark:text-darkTextColor">
            Select Transition Type
          </p>
          <CardSelect
            name="Select Transition Type"
            value={addformState.type}
            onChange={(value) =>
              setAddFormState((prev) => ({ ...prev, type: value }))
            }
          />
          <InputText
            type="number"
            labelFor="amount"
            labelName="Transition Amount"
            inputId="amount"
            placeholder="Enter amount"
            value={addformState.amount || ""}
            onChange={(e) =>
              setAddFormState((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
          <InputText
            type="text"
            labelFor="category"
            labelName="Category"
            inputId="category"
            placeholder="Enter Category"
            value={addformState.categoryId || ""}
            onChange={(e) =>
              setAddFormState((prev) => ({
                ...prev,
                categoryId: e.target.value,
              }))
            }
          />
          <InputText
            type="text"
            labelFor="description"
            labelName="Description"
            inputId="description"
            placeholder="Enter Description"
            value={addformState.description || ""}
            onChange={(e) =>
              setAddFormState((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <ReactDatePicker
            selected={
              addformState.transactionDate
                ? new Date(addformState.transactionDate + "T00:00:00")
                : null
            }
            onChange={(date) =>
              setAddFormState((prev) => ({
                ...prev,
                transactionDate: date ? date.toISOString().split("T")[0] : "",
              }))
            }
            dateFormat="yyyy-MM-dd"
            placeholderText="Enter Transaction Date"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Button
            type="submit"
            text="Add"
            variant="primary"
            tailwindClass="w-full mt-12"
          />
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;
