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
        <div className="inline-block mx-3">
          <div className="flex items-center" onClick={toggleDropdown}>
            <span>Hello,</span>
            <Link
              to="/profile" // Adjust this to the appropriate route for the user profile
              className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
            >
              {userEmail || "User Name"}
            </Link>
            <ArrowDown2
              size="24"
              className="text-textColor dark:text-darkTextColor"
              title="Dropdown Menu"
            />
          </div>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-md z-50">
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
              <button
                onClick={handleLogout} // Replace with your logout function
                className="m-2 color-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default menu;
