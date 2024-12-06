import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  InputText,
  InputTextarea,
  CardSelect,
  Modal,
  DatePicker,
  DropDown,
} from "../../components/common";
import dashboardImg from "../../assets/img/dashboard-img.svg";
import { Edit, Trash } from "iconsax-react";
import {
  TRANSACTION_ENDPOINTS,
  CATEGORY_ENDPOINTS,
} from "../../config/apiConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function Dashboard() {
  const { userId } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem("token");
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
  const [categoryList, setCategoryList] = useState([]); //for dropdown option
  const [selectedId, setSelectedId] = useState(null); // State to store selected ID
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
  // Fetch data from API
  const fetchOption = async () => {
    // Check for missing token or userId
    if (!token || !userId) {
      console.error("Missing token or userId!");
      return;
    }

    try {
      const response = await axios.get(CATEGORY_ENDPOINTS.GET_ALL_CAT, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
          accountHolder_id: userId, // Include userId in headers (if required by the API)
        },
      });
      const formattedOptions = response.data.map((item) => ({
        label: item.name,
        value: item.id,
      }));

      setCategoryList(formattedOptions);
    } catch (error) {
      console.error("Error fetching dropdown options:", error.message);
    }
  };

  // Handle dropdown change
  const handleDropdownChange = (event) => {
    const selectedOption = options.find(
      (option) => option.label === event.target.value
    );
    setSelectedId(selectedOption.value); // Save the selected ID
    console.log("Selected ID:", selectedOption.value);
  };

  useEffect(() => {
    fetchData();
    fetchOption();
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

  // const handleDropdownChange = (option) => {
  //   setSelectedOption(option);
  //   console.log("Selected option:", option);
  // };

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
    if (!validation(amount, transactionDate, type, categoryId)) {
      return;
    }
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
      Swal.fire({
        title: "Success!",
        text: "Transaction updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-cardBg dark:bg-darkCardBg",
          header: "text-xl font-bold text-gray-700 dark:text-darkTextColor",
          title: "text-2xl font-semibold text-gray-800 dark:text-darkTextColor",
          content: "text-gray-600 dark:text-darkTextColor",
        },
      });
      closeModal();
      fetchData();
    } catch (error) {
      console.error("Error updating transaction:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update transaction. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-cardBg dark:bg-darkCardBg",
          header: "text-xl font-bold text-gray-700 dark:text-darkTextColor",
          title: "text-2xl font-semibold text-gray-800 dark:text-darkTextColor",
          content: "text-gray-600 dark:text-darkTextColor",
        },
      });
    }
  };

  const handleDelete = async (row) => {
    // Show confirmation alert
    const result = await Swal.fire({
      title: "Confirm!",
      text: "Are you sure you want to delete this transaction?",
      icon: "warning", // Use 'warning' icon for confirmation
      showCancelButton: true, // Show Cancel button
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        popup: "bg-cardBg dark:bg-darkCardBg",
        header: "text-xl font-bold text-gray-700 dark:text-darkTextColor",
        title: "text-2xl font-semibold text-gray-800 dark:text-darkTextColor",
        content: "text-gray-600 dark:text-darkTextColor",
        confirmButton: "bg-red-500 hover:bg-red-600 text-white", // Customize Confirm button style
        cancelButton: "bg-gray-300 hover:bg-gray-400 text-black", // Customize Cancel button style
      },
    });

    // Check if the user confirmed
    if (result.isConfirmed) {
      try {
        // Make API call to delete transaction
        await axios.delete(TRANSACTION_ENDPOINTS.DEL_TRAN_ID(row.ID), {
          headers: {
            Authorization: `Bearer ${token}`,
            accountHolder_id: userId,
          },
        });

        // Show success message
        await Swal.fire({
          title: "Deleted!",
          text: "Transaction deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            popup: "bg-cardBg dark:bg-darkCardBg",
            header: "text-xl font-bold text-gray-700 dark:text-darkTextColor",
            title:
              "text-2xl font-semibold text-gray-800 dark:text-darkTextColor",
            content: "text-gray-600 dark:text-darkTextColor",
          },
        });

        // Refresh data after deletion
        fetchData();
      } catch (error) {
        console.error("Error deleting transaction:", error);

        // Show error message
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete transaction. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            popup: "bg-cardBg dark:bg-darkCardBg",
            header: "text-xl font-bold text-gray-700 dark:text-darkTextColor",
            title:
              "text-2xl font-semibold text-gray-800 dark:text-darkTextColor",
            content: "text-gray-600 dark:text-darkTextColor",
          },
        });
      }
    } else {
      // User canceled, optionally log or handle the cancel action
      console.log("Delete action canceled by user.");
    }
  };

  // Handle Add Action
  const addTransaction = async (event) => {
    event.preventDefault();
    const { amount, description, transactionDate, type, categoryId } =
      addformState;
    if (!validation(amount, transactionDate, type, categoryId)) {
      return;
    }
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
      Swal.fire({
        title: "Success!",
        text: "Transaction added successfully!",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-cardBg dark:bg-darkCardBg",
          header: "text-xl font-bold text-gray-700 dark:text-darkTextColor",
          title: "text-2xl font-semibold text-gray-800 dark:text-darkTextColor",
          content: "text-gray-600 dark:text-darkTextColor",
        },
      });
      closeModalAdd();
      fetchData();
    } catch (error) {
      console.error("Error adding transaction:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add transaction. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-cardBg dark:bg-darkCardBg",
          header: "text-xl font-bold text-gray-700 dark:text-darkTextColor",
          title: "text-2xl font-semibold text-gray-800 dark:text-darkTextColor",
          content: "text-gray-600 dark:text-darkTextColor",
        },
      });
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

  //validation for Add and Edit
  const validation = (
    amount,
    transactionDate,
    type,
    categoryId
    //transactionId (only for edit)
  ) => {
    if (!amount || !transactionDate || !type || !categoryId) {
      alert("All fields are mandatory to register.");
      return false;
    }
    const numericAmount = parseFloat(amount); // Convert amount to a number

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Amount must be a number greater than zero.");
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-row xs:flex-col sm:flex-col max-w-screen-lg p-4 xs:py-12 sm:py-12">
        <div className="xs:w-full sm:w-full">
          <h1 className="font-black text-2xl">Track Your Finances with Ease</h1>
          <p className="py-4 mb-4">
            Welcome to your Budget Tracker Dashboard! Here, you can seamlessly
            manage your financial transactions. View all your income and
            expenses at a glance with the detailed data table. Use the ‘Add
            Transaction button to quickly record your financial
            activities—whether you're adding an income source or tracking an
            expense. The interactive modal makes it simple to categorize and
            document every transaction. Take control of your finances today!
          </p>
        </div>
        <img src={dashboardImg} alt="Categories" className="h-60 w-60 p-6 xs:hidden sm:hidden" />
      </div>

      <div className="flex items-center justify-between flex-row max-w-screen-lg pl-4 pr-0">
        <h1 className="font-medium text-xl">Transactions</h1>
        <Button
          text="Add Transaction"
          onClick={() => setIsModalOpenAdd(true)}
          variant="primary"
          tailwindClass="w-full"
        />
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
        <h1 className="font-black text-2xl mb-12">Edit Transaction</h1>
        <form
          onSubmit={editTransaction}
          className="flex flex-row items-baseline"
        >
          <div className="flex flex-col">
            <p className="text-textColor dark:text-darkTextColor">
              Select Transaction Type
            </p>
            <CardSelect
              name="Select Transaction Type"
              defaultValue={formState.type || "income"} // Default to "income" if type is not set
              onChange={(value) => handleInputChange("type", value)}
            />
          </div>
          <div className="flex flex-col">
            <InputText
              type="number"
              labelFor="amount"
              labelName="Transaction Amount"
              inputId="amount"
              name="Transaction Amount"
              placeholder="Enter amount"
              value={formState.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
            />
            <DropDown
              labelFor="category"
              labelName="Category"
              inputId="category"
              placeholder="Select Category"
              variant="primary"
              ClassName="dropDownMain"
              options={categoryList}
              selectedValue={formState.categoryId}
              onChange={(e) => {
                setSelectedId(e);
                handleInputChange("categoryId", selectedId);
              }}
            />
            <DatePicker
              labelFor="transactionDate"
              labelName="Transaction Date"
              inputId="transactionDate"
              name="Transaction Date"
              selected={
                formState.transactionDate
                  ? new Date(formState.transactionDate)
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
              className="bg-cardBg dark:bg-darkCardBg w-full p-2"
              calendarClassName="bg-cardBg dark:bg-darkCardBg text-gray-800 rounded-lg shadow-lg z-50"
              wrapperClassName="bg-cardBg dark:bg-darkCardBg relative"
              popperClassName="bg-cardBg dark:bg-darkCardBg z-50"
            />
          </div>
          <div className="flex flex-col">
            <InputTextarea
              type="textarea"
              labelFor="description"
              labelName="Description"
              inputId="description"
              name="Description"
              placeholder="Enter Description"
              value={formState.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            <Button
              type="submit"
              text="Update"
              variant="primary"
              tailwindClass="w-full mt-6"
            />
          </div>
        </form>
      </Modal>

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpenAdd}
        onClose={closeModalAdd}
        tailwindClass="bg-cardBg dark:bg-darkCardBg p-16"
      >
        <h1 className="font-black text-2xl mb-12">Add Transaction</h1>
        <form
          onSubmit={addTransaction}
          className="flex flex-row items-baseline"
        >
          <div className="flex flex-col">
            <p className="text-textColor dark:text-darkTextColor">
              Transaction Type
            </p>
            <CardSelect
              name="Select Transaction Type"
              value={addformState.type}
              onChange={(value) =>
                setAddFormState((prev) => ({ ...prev, type: value }))
              }
            />
          </div>
          <div className="flex flex-col">
            <InputText
              type="number"
              labelFor="amount"
              labelName="Transaction Amount"
              inputId="amount"
              placeholder="Enter amount"
              value={addformState.amount || ""}
              onChange={(e) =>
                setAddFormState((prev) => ({ ...prev, amount: e.target.value }))
              }
            />
            <DropDown
              labelFor="category"
              labelName="Category"
              inputId="category"
              placeholder="Select Category"
              variant="primary"
              ClassName="dropDownMain"
              options={categoryList}
              selectedValue={formState.categoryId}
              onChange={(e) => {
                setSelectedId(e); // Update selectedId state
                setAddFormState((prev) => ({
                  ...prev,
                  categoryId: e, // Directly use e instead of selectedId
                }));
              }}
            />

            <DatePicker
              labelFor="transactionDate"
              labelName="Transaction Date"
              inputId="transactionDate"
              name="Transaction Date"
              selected={
                addformState.transactionDate
                  ? new Date(addformState.transactionDate)
                  : null
              }
              onChange={(date) =>
                handleAddInputChange(
                  "transactionDate",
                  date ? date.toISOString().split("T")[0] : ""
                )
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Enter Transaction Date"
              className="bg-cardBg dark:bg-darkCardBg w-full p-2"
              calendarClassName="bg-cardBg dark:bg-darkCardBg text-gray-800 rounded-lg shadow-lg z-50"
              wrapperClassName="bg-cardBg dark:bg-darkCardBg relative"
              popperClassName="bg-cardBg dark:bg-darkCardBg z-50"
            />
          </div>
          <div className="flex flex-col">
            <InputTextarea
              type="textarea"
              labelFor="description"
              labelName="Description"
              inputId="description"
              name="Description"
              placeholder="Enter Description"
              value={addformState.description || ""}
              onChange={(e) =>
                setAddFormState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <Button
              type="submit"
              text="Add"
              variant="primary"
              tailwindClass="w-full mt-6"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;
