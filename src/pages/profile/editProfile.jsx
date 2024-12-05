import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputText, InputPassword } from "../../components/common";
import registerImg from "../../assets/img/register-img.svg";
import { ACCOUNT_HOLDER_ENDPOINTS } from "../../config/apiConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function EditProfile() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { userId, role } = useSelector((state) => state.auth);

  // State for form inputs
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token || !userId) {
        console.error("Missing token or userId!");
        return;
      }
      try {
        const response = await axios.get(
          ACCOUNT_HOLDER_ENDPOINTS.GET_PROFILE(userId),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Prepopulate form fields
        setName(response.data.name || "");
        setUserEmail(response.data.email || "");
        setUserPhone(response.data.phone || "");
        setUserPassword("Default@1234");
        setCity(response.data.addressResponseDTO?.city || "");
        setStreet(response.data.addressResponseDTO?.street || "");
        setHomeNumber(response.data.addressResponseDTO?.number || "");
        setPostalCode(response.data.addressResponseDTO?.postalCode || "");
        setState(response.data.addressResponseDTO?.state || "");
        setCountry(response.data.addressResponseDTO?.country || "");
      } catch (error) {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
      }
    };
    fetchProfile();
  }, [userId, token]);

  // Handle form submission
  const handleRegister = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (
      !validation(
        name,
        userPhone,
        city,
        street,
        homeNumber,
        postalCode,
        state,
        country
      )
    ) {
      return;
    }

    const updatedProfile = {
      name,
      email: userEmail,
      phone: userPhone,
      password: userPassword,
      role: role,
      addressRequestDTO: {
        city,
        street,
        number: homeNumber,
        postalCode,
        state,
        country,
      },
    };

    try {
      const response = await axios.put(
        ACCOUNT_HOLDER_ENDPOINTS.UPDATE_PROFILE(userId),
        updatedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully!",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-cardBg dark:bg-darkCardBg",
          header: "text-xl font-bold text-gray-700 dark:text-darkTextColor",
          title: "text-2xl font-semibold text-gray-800 dark:text-darkTextColor",
          content: "text-gray-600 dark:text-darkTextColor",
        },
      });
      navigate("/profile");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      await Swal.fire({
        title: "Error!",
        text: "Failed to update profile. Please try again.",
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

  const validation = (
    name,
    phone,
    city,
    street,
    number,
    postalCode,
    state,
    country
  ) => {
    if (
      !name ||
      !phone ||
      !city ||
      !street ||
      !number ||
      !postalCode ||
      !state ||
      !country
    ) {
      alert("All fields are mandatory to register your account.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!/^\d{5}(-\d{4})?$/.test(postalCode)) {
      alert("Invalid postal code format.");
      return false;
    }

    return true;
  };

  return (
    <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
      <img
        src={registerImg}
        alt="Budget App Home Page Illustration"
        className="h-96 w-96 p-6 mr-6"
      />
      <div className="bg-cardBg dark:bg-darkCardBg p-12">
        <h1 className="font-black text-2xl mb-12 px-3">Edit Profile</h1>
        <form onSubmit={handleRegister}>
          <div className="flex items-center justify-center flex-row">
            <InputText
              type="text"
              labelFor="name"
              labelName="Name"
              inputId="name"
              inputName="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <InputText
              type="text"
              labelFor="userPhone"
              labelName="Phone"
              inputId="userPhone"
              inputName="userPhone"
              placeholder="Enter Phone"
              value={userPhone}
              onChange={(e) => {
                setUserPhone(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center flex-row">
            <InputText
              type="text"
              labelFor="city"
              labelName="City"
              inputId="city"
              inputName="city"
              placeholder="Enter Your City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <InputText
              type="text"
              labelFor="street"
              labelName="Street"
              inputId="street"
              inputName="street"
              placeholder="Enter Your Street"
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center flex-row">
            <InputText
              type="text"
              labelFor="homeNumber"
              labelName="Home Number"
              inputId="homeNumber"
              inputName="homeNumber"
              placeholder="Enter Your Home Number"
              value={homeNumber}
              onChange={(e) => {
                setHomeNumber(e.target.value);
              }}
            />
            <InputText
              type="number"
              labelFor="postalCode"
              labelName="Postal Code"
              inputId="postalCode"
              inputName="postalCode"
              placeholder="Enter Your Postal Code"
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center flex-row">
            <InputText
              type="text"
              labelFor="state"
              labelName="State"
              inputId="state"
              inputName="state"
              placeholder="Enter Your State"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            />
            <InputText
              type="text"
              labelFor="country"
              labelName="Country"
              inputId="country"
              inputName="country"
              placeholder="Enter Your Country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
          </div>
          <Button
            type="submit"
            text="Edit"
            variant="primary"
            tailwindClass="w-full mt-12"
          />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
