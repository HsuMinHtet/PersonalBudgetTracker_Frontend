import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  InputText,
  CardSelect,
  Modal,
} from "../../components/common";
import categoryImg from "../../assets/img/category-img.svg";
import { Edit, Trash } from "iconsax-react";
import { CATEGORY_ENDPOINTS } from "../../config/apiConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Category() {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const [categoryList, setCategoryList] = useState([]);
  const token = sessionStorage.getItem("token");

  const columns = ["No", "Category Name", "Description"];

  // Fetch data from API
  const fetchData = async () => {
    if (!token) {
      console.error("Token is missing! Please log in.");
      return;
    }
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }

    const apiUrl = CATEGORY_ENDPOINTS.GET_ALL_CAT;
    console.log("API URL:", apiUrl);

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          accountHolder_id: userId,
        },
      });
      setCategoryList(response.data);
      console.log("Fetched Categories:", response.data);
    } catch (error) {
      console.error(
        "Error fetching Categories:",
        error.response?.data || error.message
      );
    }
  };
  //initial fetch
  useEffect(() => {
    fetchData();
  }, [userId, token]);

  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
    // Add navigation or modal logic for editing
  };

  const handleDelete = async (row) => {
    const deleteUrl = CATEGORY_ENDPOINTS.DEL_CAT_ID(row.ID);
    console.log("API URL:", deleteUrl);
    try {
      await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          accountHolder_id: userId,
        },
      });
      alert("Category deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  const actions = [
    { icon: <Edit />, type: "edit", onClick: handleEdit },
    { icon: <Trash />, type: "delete", onClick: handleDelete },
  ];

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
        <div>
          <h1 className="font-black text-2xl">Customize Your Categories</h1>
          <p className="py-4 mb-4">
            This is your hub for managing transaction categories! Easily add new
            categories with the Add Category button to tailor your budget
            tracker to your unique needs. Group your income and expenses into
            meaningful categories, making it simple to review and analyze your
            financial habits. Stay in control of your budget by keeping your
            categories organized and up-to-date!
          </p>
        </div>
        <img src={categoryImg} alt="Categories" className="h-60 w-60 p-6" />
      </div>

      <div className="flex items-center justify-between flex-row max-w-screen-lg pl-4 pr-0">
        <h1 className="font-medium text-xl">Categories</h1>
        <Button
          text="Add Category"
          onClick={openModal}
          variant="primary"
          tailwindClass="w-full"
        />
      </div>

      <div className="flex items-center justify-center flex-row max-w-screen-lg px-4">
        <Table
          columns={columns}
          data={categoryList.map((category, index) => ({
            No: index + 1,
            ID: category.id,
            "Category Name": category.name,
            Description: category.description,
          }))}
          actions={actions}
          tailwindClass="bg-cardBg dark:bg-darkCardBg"
          variant="primary"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        tailwindClass="bg-cardBg dark:bg-darkCardBg p-16"
      >
        <h1 className="font-black text-2xl mb-12">Add Category</h1>

        <p className="text-textColor dark:text-darkTextColor">
          Select Category Type
        </p>
        <CardSelect
          name="Select Category Type"
          onChange={(value) => console.log("Selected:", value)}
        />

        <InputText
          type="text"
          labelFor="categoryName"
          labelName="Category Name"
          inputId="categoryName"
          name="Category Name"
          placeholder="Enter category name"
        />

        <Button text="Add " variant="primary" tailwindClass="w-full mt-12" />
      </Modal>
    </div>
  );
}

export default Category;
