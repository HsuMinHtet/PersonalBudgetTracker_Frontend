import changepasswordImg from "../../assets/img/changepassword-img.svg";
import { Avatar, InputPassword, Button } from "../../components/common";
import ProfileMenu from "../../components/layout/profileMenu/profileMenu.jsx";
import { ACCOUNT_HOLDER_ENDPOINTS } from "../../config/apiConfig";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ChangePassword() {
  const { userId } = useSelector((state) => state.auth);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    e.preventDefault(); // Prevent the default form submission
    passwordValidation(verifyPassword, newPassword);
  };

  const passwordValidation = (verifyPassword, newPassword) => {
    if (!newPassword || !verifyPassword) {
      alert("Please enter both passwords.");
      return false; // Return `false` if validation fails
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
    const passwordMinLength = 8;
    const passwordMaxLength = 12;

    if (newPassword.length < passwordMinLength) {
      alert(`Password must be at least ${passwordMinLength} characters long.`);
      return false;
    }

    if (newPassword.length > passwordMaxLength) {
      alert(`Password must not exceed ${passwordMaxLength} characters.`);
      return false;
    }

    if (!passwordRegex.test(newPassword)) {
      alert(
        `Password must be between ${passwordMinLength}-${passwordMaxLength} characters, 
        and include at least one uppercase letter, one lowercase letter, one number, 
        and one special character (@$!%*?&).`
      );
      return false;
    }

    if (newPassword !== verifyPassword) {
      alert(`Verify Password must not be the same as the new password.`);
      return false;
    }

    passwordChange(newPassword);
  };

  const passwordChange = (password) => {
    const apiUrl = ACCOUNT_HOLDER_ENDPOINTS.PATCH_PROFILE(userId);
    console.log("API URL:", apiUrl);
    axios
      .patch(
        apiUrl, // URL
        { password }, // Data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Your Password was changed successfully!",
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
        dispatch(logout());
        sessionStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error response:", error.response); // Log detailed error response
        Swal.fire({
          title: "Error!",
          text: "An error occurred while changing the password.",
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
        <img
          src={changepasswordImg}
          alt="Change Password"
          className="h-60 w-60 p-6"
        />
      </div>

      <div className="flex flex-column">
        <div className="flex flex-col border-solid border-r-2 border-borderColor dark:border-darkBorderColor px-4">
          <Avatar
            name="Hsu Min Htet"
            tailwindClass="border-solid border-2 border-borderColor dark:border-darkBorderColor mb-10"
          />

          <ProfileMenu />
        </div>

        <div className="flex flex-col px-4 w-full">
          <div className="flex flex-row mb-12 items-center justify-between">
            <h2 className="text-2xl font-bold">Change Password</h2>
          </div>
          <form onSubmit={handlePasswordChange}>
            <div className="flex flex-col mb-4 w-max">
              <InputPassword
                type="password"
                labelFor="newPassword"
                labelName="New Password"
                inputId="newPassword"
                inputName="New Password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />

              <InputPassword
                type="password"
                labelFor="verifyPassword"
                labelName="Verify Password"
                inputId="verifyPassword"
                inputName="Verify Password"
                placeholder="Enter Verify Password"
                value={verifyPassword}
                onChange={(e) => {
                  setVerifyPassword(e.target.value);
                }}
              />

              <Button
                type="submit"
                text="Change Password"
                variant="primary"
                tailwindClass="inline-block mt-12 w-full"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
