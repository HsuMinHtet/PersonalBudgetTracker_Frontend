import { Link, useNavigate } from "react-router-dom";
import { ArrowDown2 } from "iconsax-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../../features/auth/authSlice";

function menu() {
  const { role } = useSelector((state) => state.auth);
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
    setIsDropdownOpen(false);
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
          <nav>
            {role === "ACCOUNT_HOLDER" && ( // Show links only if role is ADMIN
              <>
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
              </>
            )}
          </nav>
          <div className="flex items-center ml-16" onClick={toggleDropdown}>
            <span>Hello,</span>
            <div className="inline mx-1 cursor-pointer">
              {userEmail || "User Name"}
            </div>
            <ArrowDown2
              size="20"
              className="text-textColor dark:text-darkTextColor hover:cursor-pointer pt-1"
              title="Dropdown Menu"
            />
          </div>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="flex flex-col absolute right-2 rounded-md shadow-md mt-8 p-2 z-50 bg-cardBg dark:bg-darkCardBg w-48">
              <nav>
                {role === "ACCOUNT_HOLDER" && ( // Show links only if role is ACCOUNT_HOLDER
                  <>
                    <Link
                      to="/profile"
                      className="block m-2 text-sm text-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown
                    >
                      Profile
                    </Link>
                    <Link
                      to="/changepassword"
                      className="block m-2 text-sm text-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown
                    >
                      Change Password
                    </Link>
                    <Link
                      to="/edit-profile"
                      className="block m-2 text-sm text-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown
                    >
                      Edit Profile
                    </Link>
                  </>
                )}
              </nav>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation
                  handleLogout(); // Trigger logout
                }}
                className="block m-2 text-sm text-textColor hover:text-primaryTextColor hover:dark:text-darkPrimaryTextColor"
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
