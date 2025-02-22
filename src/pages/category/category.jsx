import React, { useEffect, useState } from "react";
import { Button, Table, InputText, Modal } from "../../components/common";
import categoryImg from "../../assets/img/category-img.svg";
import { Edit, Trash } from "iconsax-react";
import { CATEGORY_ENDPOINTS } from "../../config/apiConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function Category() {
  const { userId } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem("token");

  const [categoryList, setCategoryList] = useState([]);
  const [formState, setFormState] = useState({
    categoryName: "",
    description: "",
    categoryId: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const columns = ["No", "CategoryName", "Description"];

  // Fetch data from API
  const fetchData = async () => {
    if (!token || !userId) {
      console.error("Missing token or userId!");
      return;
    }

    try {
      const response = await axios.get(CATEGORY_ENDPOINTS.GET_ALL_CAT, {
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

  useEffect(() => {
    fetchData();
  }, [userId, token]);

  // Handle Edit Action
  const handleEdit = (row) => {
    setFormState({
      categoryName: row.CategoryName,
      description: row.Description,
      categoryId: row.ID,
    });
    setIsModalOpen(true);
  };

  const editCategory = async (event) => {
    event.preventDefault();
    const { categoryName, description, categoryId } = formState;
    if (!validation(categoryName)) {
      return;
    }
    try {
      await axios.put(
        CATEGORY_ENDPOINTS.PUT_CAT_ID(categoryId),
        { name: categoryName, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Category updated successfully!",
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
      console.error("Error updating category:", error);
      // Show error message
      await Swal.fire({
        title: "Error!",
        text: "Failed to update category. Please try again.",
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

  // Handle Delete Action
  const handleDelete = async (row) => {
    // Show confirmation alert
    const result = await Swal.fire({
      title: "Confirm!",
      text: "Are you sure you want to delete this category?",
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
        await axios.delete(CATEGORY_ENDPOINTS.DEL_CAT_ID(row.ID), {
          headers: {
            Authorization: `Bearer ${token}`,
            accountHolder_id: userId,
          },
        });
        Swal.fire({
          title: "Success!",
          text: "Category deleted successfully",
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
        fetchData();
      } catch (error) {
        const errorMessage = error.response?.data;
        // Show error message
        await Swal.fire({
          title: "Error!",
          text: `${errorMessage} Please try again.`,
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

  // Handle Add Category
  const addCategory = async (event) => {
    event.preventDefault();
    const { categoryName, description } = formState;
    if (!validation(categoryName)) {
      return;
    }
    try {
      await axios.post(
        CATEGORY_ENDPOINTS.POST_CAT,
        {
          name: categoryName,
          description,
          accountHolder_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Category added successfully!",
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
      console.error("Error adding category:", error);
      // Show error message
      await Swal.fire({
        title: "Error!",
        text: "Failed to add new Category. Please try again.",
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

  const actions = [
    { icon: <Edit />, type: "edit", onClick: handleEdit },
    { icon: <Trash />, type: "delete", onClick: handleDelete },
  ];

  const closeModal = () => {
    setFormState({ categoryName: "", description: "", categoryId: null });
    setIsModalOpen(false);
  };

  const closeModalAdd = () => {
    setFormState({ categoryName: "", description: "" });
    setIsModalOpenAdd(false);
  };

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  //validation for Add and Edit
  const validation = (categoryName) => {
    if (!categoryName) {
      alert("Category Name is mandatory to register.");
      return false;
    }
    return true;
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
          onClick={() => setIsModalOpenAdd(true)}
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
            placeholder="Enter category name"
            value={formState.categoryName}
            onChange={(e) => handleInputChange("categoryName", e.target.value)}
          />
          <InputText
            type="text"
            labelFor="description"
            labelName="Description"
            inputId="description"
            placeholder="Enter Description"
            value={formState.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <Button
            type="submit"
            text="Update"
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
            placeholder="Enter category name"
            value={formState.categoryName}
            onChange={(e) => handleInputChange("categoryName", e.target.value)}
          />
          <InputText
            type="text"
            labelFor="descriptionAdd"
            labelName="Description"
            inputId="descriptionAdd"
            placeholder="Enter Description"
            value={formState.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
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
