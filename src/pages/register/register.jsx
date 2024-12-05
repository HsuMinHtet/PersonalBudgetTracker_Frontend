import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputText, InputPassword } from "../../components/common";
import registerImg from "../../assets/img/register-img.svg";
import { AUTH_ENDPOINTS } from "../../config/apiConfig";
import axios from "axios";
import Swal from "sweetalert2";

function register() {
  const navigate = useNavigate();
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

  const handleRegister = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    validation(
      name,
      userEmail,
      userPhone,
      userPassword,
      city,
      street,
      homeNumber,
      postalCode,
      state,
      country
    );
  };

  const validation = (
    name,
    userEmail,
    userPhone,
    userPassword,
    city,
    street,
    homeNumber,
    postalCode,
    state,
    country
  ) => {
    // Basic validation for empty fields
    if (
      !name ||
      !userEmail ||
      !userPhone ||
      !userPassword ||
      !city ||
      !street ||
      !homeNumber ||
      !postalCode ||
      !state ||
      !country
    ) {
      alert("All fields are mandatory to register your account.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/; // Adjust regex based on your country/format
    if (!phoneRegex.test(userPhone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordMinLength = 8;
    const passwordMaxLength = 12;

    if (userPassword.length < passwordMinLength) {
      alert(`Password must be at least ${passwordMinLength} characters long.`);
      return;
    }

    if (userPassword.length > passwordMaxLength) {
      alert(`Password must not exceed ${passwordMaxLength} characters.`);
      return;
    }

    if (!passwordRegex.test(userPassword)) {
      alert(
        `Password must be between ${passwordMinLength}-${passwordMaxLength} characters, 
    and include at least one uppercase letter, one lowercase letter, one number, 
    and one special character (@$!%*?&).`
      );
      return;
    }

    // Postal code validation
    const postalCodeRegex = /^\d{5}(-\d{4})?$/; // US ZIP code format, adjust as needed
    if (!postalCodeRegex.test(postalCode)) {
      alert("Please enter a valid postal code.");
      return;
    }

    // Additional validations (optional)
    if (name.trim().length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }

    registerAccount(
      name,
      userEmail,
      userPhone,
      userPassword,
      city,
      street,
      homeNumber,
      postalCode,
      state,
      country
    );
  };

  const registerAccount = (
    name,
    email,
    phone,
    password,
    city,
    street,
    number,
    postalCode,
    state,
    country
  ) => {
    console.log(AUTH_ENDPOINTS.REGISTER);
    const role = "ACCOUNT_HOLDER";
    axios
      .post(AUTH_ENDPOINTS.REGISTER, {
        name,
        phone,
        password,
        email,
        role,
        addressRequestDTO: {
          city,
          street,
          number,
          postalCode,
          country,
          state,
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Your Profile are created successfully!",
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
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 500) {
          Swal.fire({
            title: "Error! EMAIL ALREADY IN USE!",
            text: "Failed to register your profile. Please try again.",
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
      });
  };

  return (
    <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
      <img
        src={registerImg}
        alt="Budget App Home Page Illustration"
        className="h-96 w-96 p-6 mr-6"
      />
      <div className="bg-cardBg dark:bg-darkCardBg p-12">
        <h1 className="font-black text-2xl mb-12 px-3">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="flex items-center justify-center flex-row">
            <InputText
              type="text"
              labelFor="name"
              labelName="Name"
              inputId="name"
              inputName="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <InputText
              type="email"
              labelFor="userEmail"
              labelName="Email"
              inputId="userEmail"
              name="Email"
              placeholder="Enter Email"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center flex-row">
            <InputText
              type="text"
              labelFor="userPhone"
              labelName="Phone"
              inputId="userPhone"
              name="Phone"
              placeholder="Enter Phone"
              value={userPhone}
              onChange={(e) => {
                setUserPhone(e.target.value);
              }}
            />
            <InputPassword
              type="password"
              labelFor="userPassword"
              labelName="Password"
              inputId="userPassword"
              name="Password"
              placeholder="Enter Password"
              value={userPassword}
              onChange={(e) => {
                setUserPassword(e.target.value);
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
            text="Register"
            variant="primary"
            tailwindClass="w-full mt-12"
          />
        </form>
      </div>
    </div>
  );
}

export default register;
