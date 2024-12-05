import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common";
import InputText from "../../components/common/InputText";
import resetImg from "../../assets/img/reset-img.svg";
import { AUTH_ENDPOINTS } from "../../config/apiConfig";
import axios from "axios";
import Swal from "sweetalert2";

function Reset() {
  const navigate = useNavigate();
  const [email, setUsername] = useState("");

  const handleReset = (e) => {
    e.preventDefault(); // Prevent the default form submission
    resetPassword(email);
  };
  const resetPassword = (email) => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    console.log(AUTH_ENDPOINTS.FORGOT_PASSWORD);
    axios
      .post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email })
      .then((response) => {
        console.log("Response:", response.data); // Log response data
        Swal.fire({
          title: "Success!",
          text: "Password reset link sent to your email.!",
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
        console.error("Error response:", error.response); // Log detailed error response
        Swal.fire({
          title: "Error! EMAIL ALREADY IN USE!",
          text: "Invalid email!",
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
      });
  };
  return (
    <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
      <img
        src={resetImg}
        alt="Budget App Home Page Illustration"
        className="h-96 w-96 p-6 mr-6"
      />
      <div className="bg-cardBg dark:bg-darkCardBg p-12">
        <h1 className="font-black text-2xl mb-12 px-3">Reset Password</h1>
        <form onSubmit={handleReset}>
          <InputText
            type="email"
            labelFor="userEmail"
            labelName="Email"
            inputId="email"
            inputName="email"
            placeholder="Enter Email"
            value={email} // Bind the username input to state
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Button
            type="submit"
            text="Reset"
            variant="primary"
            tailwindClass="w-full mt-12"
          />
        </form>
      </div>
    </div>
  );
}

export default Reset;
