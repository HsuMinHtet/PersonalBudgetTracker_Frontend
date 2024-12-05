import React, { useEffect, useState } from "react";
import { Table } from "../../components/common";
import dashboardImg from "../../assets/img/dashboard-img.svg";
import { Trash } from "iconsax-react";
import { ADMIN_ENDPOINTS } from "../../config/apiConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import NodataImg from "../../assets/img/nodata-img.svg";
import Swal from "sweetalert2";

function admindashboard() {
  const { role, userId } = useSelector((state) => state.auth);
  const token = sessionStorage.getItem("token");
  const [accountHolderList, setAccountHolderList] = useState([]);
  const [formState, setFormState] = useState({
    accountHolderId: null,
    name: "",
    email: "",
    phone: "",
    state: "",
    country: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = ["No", "Name", "Email", "Phone", "State", "Country"];

  // Fetch data from API
  const fetchData = async () => {
    if (!token || !userId) {
      console.error("Missing token or userId!");
      return;
    }
    if (role !== "ADMIN" || userId != 1) {
      console.error("Access denied: Only ADMIN has permission for this page!");
      return;
    }

    try {
      const response = await axios.get(ADMIN_ENDPOINTS.GET_ALL_ACCOUNT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccountHolderList(response.data);
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

  // Handle Delete Action
  const handleDelete = async (row) => {
    // Show confirmation alert
    const result = await Swal.fire({
      title: "Confirm!",
      text: "Are you sure you want to delete this account-holder?",
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
        await axios.delete(ADMIN_ENDPOINTS.DEL_ACCOUNT_ID(row.Id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          title: "Success!",
          text: "Account Holder was deleted successfully!!",
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
        // const errorMessage = error.response?.data?.message;
        const errorMessage = error.response.data;
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

  const actions = [{ icon: <Trash />, type: "delete", onClick: handleDelete }];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
        <div>
          <h1 className="font-black text-2xl">Track Your Finances with Ease</h1>
          <p className="py-4 mb-4">
            Welcome Budget Tracker ADMIN! Here, you can seamlessly review the
            list of ACCOUNT_HOLDER and you can delete the AccountHolder, who are
            not active over a year or there have no any transactions. Take
            control of your user list!
          </p>
        </div>
        <img src={dashboardImg} alt="Categories" className="h-60 w-60 p-6" />
      </div>

      <div className="flex items-center justify-between flex-row max-w-screen-lg px-4">
        <h1 className="font-medium text-xl">
          Budget Tracker Account Holder List
        </h1>
      </div>

      <div className="flex items-center justify-center flex-row max-w-screen-lg px-4">
        <Table
          columns={columns}
          data={accountHolderList.map((accounHolder, index) => ({
            No: index + 1,
            Id: accounHolder.id,
            Name: accounHolder.name,
            Email: accounHolder.email,
            Phone: accounHolder.phone,
            State: accounHolder.addressResponseDTO.state,
            Country: accounHolder.addressResponseDTO.country,
          }))}
          actions={actions}
          tailwindClass="bg-cardBg dark:bg-darkCardBg"
          variant="primary"
          nodataImg={NodataImg}
          emptyMessage="Oooops! There is no data. You can add one!"
        />
      </div>
    </div>
  );
}

export default admindashboard;
