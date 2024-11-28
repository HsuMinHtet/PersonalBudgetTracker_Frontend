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
  //edit
  const token = sessionStorage.getItem("token");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  //add
  const [categoryNameAdd, setCategoryNameAdd] = useState("");
  const [descriptionAdd, setDescriptionAdd] = useState("");

  const columns = ["No", "CategoryName", "Description"];

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

  //update
  const handleEdit = async (row) => {
    setCategoryName(row.CategoryName);
    setDescription(row.Description);
    setCategoryId(row.ID);
    openModal();
  };

  const editCategory = async (event) => {
    event.preventDefault();
    const updateCategory = {
      name: categoryName,
      description,
    };
    const updateUrl = CATEGORY_ENDPOINTS.PUT_CAT_ID(categoryId);
    console.log("update API URL:", updateUrl);
    try {
      await axios.put(updateUrl, updateCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Category updated successfully!");
      closeModal();
      fetchData();
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category. Please try again.");
    }
  };

  //delete
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

  //addCategory
  const addCategory = async (event) => {
    event.preventDefault();
    const addCategory = {
      name: categoryNameAdd,
      description: descriptionAdd,
      accountHolder_id: userId,
    };
    const postUrl = CATEGORY_ENDPOINTS.POST_CAT;
    console.log("POST_API URL:", postUrl);
    try {
      await axios.post(postUrl, addCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Category added successfully!");
      closeModalAdd();
      fetchData();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add new category. Please try again.");
    }
  };

  // Modal State Edit
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const actions = [
    { icon: <Edit />, type: "edit", onClick: handleEdit },
    { icon: <Trash />, type: "delete", onClick: handleDelete },
  ];

  // Modal State Add
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const openModalAdd = () => {
    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setCategoryNameAdd("");
    setDescriptionAdd("");
    setIsModalOpenAdd(false);
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
          onClick={openModalAdd}
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
            CategoryName: category.name,
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
        <h1 className="font-black text-2xl mb-12">Edit Category</h1>
        <form onSubmit={editCategory}>
          <InputText
            type="text"
            labelFor="categoryName"
            labelName="Category Name"
            inputId="categoryName"
            name="Category Name"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          <InputText
            type="text"
            labelFor="description"
            labelName="Description"
            inputId="description"
            name="description Name"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <Button
            type="submit"
            text="Edit"
            variant="primary"
            tailwindClass="w-full mt-12"
          />
        </form>
      </Modal>
      <Modal
        isOpen={isModalOpenAdd}
        onClose={closeModalAdd}
        tailwindClass="bg-cardBg dark:bg-darkCardBg p-16"
      >
        <h1 className="font-black text-2xl mb-12">Add Category</h1>
        <form onSubmit={addCategory}>
          <InputText
            type="text"
            labelFor="categoryNameAdd"
            labelName="Category Name"
            inputId="categoryNameAdd"
            name="Category Name"
            placeholder="Enter category name"
            value={categoryNameAdd}
            onChange={(e) => {
              setCategoryNameAdd(e.target.value);
            }}
          />
          <InputText
            type="text"
            labelFor="descriptionAdd"
            labelName="Description"
            inputId="descriptionAdd"
            name="description Name"
            placeholder="Enter Description"
            value={descriptionAdd}
            onChange={(e) => {
              setDescriptionAdd(e.target.value);
            }}
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

export default Category;
