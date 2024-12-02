import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowDown2 } from "iconsax-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

function menu() {
  const { userEmail, isLoggedIn } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav>
      {!isLoggedIn ? (
        <>
          <Link
            to="/login"
            className="mx-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="mx-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
          >
            Register
          </Link>
        </>
      ) : (
          <div className="flex flex-row mx-3">
            <Link
              to="/Dashboard"
              className="mx-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
            >
              Dashboard
            </Link>
            <Link
              to="/Category"
              className="mx-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
            >
              Category
            </Link>
            <div className="flex items-center ml-16" onClick={toggleDropdown}>
              <span>Hello,</span>
              <div className="inline mx-1 cursor-pointer">{userEmail || "User Name"}</div>
              <ArrowDown2
                size="20"
                className="text-textColor dark:text-darkTextColor hover:cursor-pointer pt-1"
                title="Dropdown Menu"
              />
            </div>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
              <div className="flex flex-col absolute right-2 rounded-md drop-shadow-md mt-8 p-2 z-5 bg-cardBg dark:bg-darkCardBg">
              <Link
                to="/profile"
                className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
              >
                Profile
              </Link>
              <Link
                to="/changepassword"
                className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
              >
                Change Password
              </Link>
              <Link
                to="/edit-profile"
                className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
              >
                Edit Profile
              </Link>
              {/* <button
                onClick={handleLogout} // Replace with your logout function
                className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
              >
                Logout
              </button> */}
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    handleLogout(); // Trigger logout
                  }}
                  className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
                >
                  Logout
                </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default menu;
