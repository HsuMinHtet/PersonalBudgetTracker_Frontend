import React, { useEffect, useState } from "react";
import profileImg from "../../assets/img/profile-img.svg";
import { Avatar, Link } from "../../components/common";
import ProfileMenu from "../../components/layout/profileMenu/profileMenu.jsx";
import { Edit } from "iconsax-react";
import { ACCOUNT_HOLDER_ENDPOINTS } from "../../config/apiConfig";
import axios from "axios";
import { useSelector } from "react-redux";

function Profile() {
  const { userId } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    addressResponseDTO: {
      number: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const token = sessionStorage.getItem("token");

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("Token is missing! Please log in.");
        return;
      }
      if (!userId) {
        console.error("User ID is missing!");
        return;
      }

      const apiUrl = ACCOUNT_HOLDER_ENDPOINTS.GET_PROFILE(userId);
      console.log("API URL:", apiUrl);

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
      }
    };
    fetchData();
  }, [userId, token]);

  return (
    <div className="flex flex-col max-w-screen-lg px-4">
      <div className="flex items-center justify-center flex-column">
        <div>
          <h1 className="font-black text-2xl">
            Your Personal Hub: Manage & Secure Your Profile
          </h1>
          <p className="py-4 mb-4">
            The Profile Page in the Budget Tracker app is your personal space
            for managing account information. Here, you can view the details you
            provided during registration, such as your name and email, and
            update them as needed. This page also allows you to securely change
            your password to keep your account safe. Designed with simplicity
            and convenience in mind, the Profile Page ensures that managing your
            personal information is easy and hassle-free, giving you more time
            to focus on tracking your finances effectively.
          </p>
        </div>
        <img src={profileImg} alt="Categories" className="h-60 w-60 p-6" />
      </div>

      <div className="flex flex-column">
        <div className="flex flex-col border-solid border-r-2 border-borderColor dark:border-darkBorderColor px-4">
          <Avatar
            name={profile.name}
            tailwindClass="border-solid border-2 text-textColor dark:text-darkTextColor border-borderColor dark:border-darkBorderColor mb-10"
          />

          <ProfileMenu />
        </div>

        <div className="flex flex-col px-4 w-full">
          <div className="flex flex-row mb-12 items-center justify-between">
            <h2 className="text-2xl font-bold">Personal Info</h2>
            <span className="cursor-pointer color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor">
              <Edit className="inline-block mr-1" />
              <Link
                href="/edit-profile"
                text="Edit Profile"
                className="inline-block text-sm r-0"
              ></Link>
            </span>
          </div>
          <div className="flex flex-row mb-4">
            <label className="block min-w-48">User Name</label>
            <p>{profile.name}</p>
          </div>

          <div className="flex flex-row mb-4">
            <label className="block min-w-48">Email</label>
            <p>{profile.email}</p>
          </div>

          <div className="flex flex-row mb-4">
            <label className="block min-w-48">Phone</label>
            <p>{profile.phone}</p>
          </div>

          <div className="flex flex-row mb-4">
            <label className="block min-w-48">Address</label>
            <p>
              {profile.addressResponseDTO.number}{" "}
              {profile.addressResponseDTO.street}
              <br />
              {profile.addressResponseDTO.city},{" "}
              {profile.addressResponseDTO.state}{" "}
              {profile.addressResponseDTO.postalCode}
              <br />
              {profile.addressResponseDTO.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
