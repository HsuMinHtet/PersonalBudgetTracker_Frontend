import { useState } from "react";
import Button from "../../components/common/Button";
import InputText from "../../components/common/InputText";
import InputPassword from "../../components/common/Password";
import Link from "../../components/common/Link";
import loginImg from "../../assets/img/login-img.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // State to store username and password input values
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    authenticate(email, password);
  };

  const authenticate = (email, password) => {
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("emailName", email);
        // Dispatch setUser action
        dispatch(
          setUser({
            email: email,
            id: response.data.id,
            role: response.data.role,
            isLoggedIn: true,
          })
        );
        navigate("/register");
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid email or password!");
      });
  };

  return (
    <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
      <img
        src={loginImg}
        alt="Budget App Home Page Illustration"
        className="h-96 w-96 p-6 mr-6"
      />
      <div className="bg-cardBg dark:bg-darkCardBg p-12">
        <h1 className="font-black text-2xl mb-12">Login</h1>

        {/* Show error message if any */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <InputText
            type="text"
            labelFor="email"
            labelName="User Name(Email)"
            inputId="email"
            inputName="User Name"
            placeholder="Enter User Name (Email)"
            value={email} // Bind the username input to state
            onChange={(e) => {
              setUsername(e.target.value);
            }} // Handle change in username }}
          />
          <InputPassword
            type="password"
            labelFor="userPassword"
            labelName="Password"
            inputId="userPassword"
            inputName="Password"
            placeholder="Enter Password"
            value={password} // Bind the password input to state
            onChange={(e) => {
              setPassword(e.target.value);
            }} // Handle change in password
          />
          <Link
            href="/reset"
            text="Forgot Password?"
            tailwindClass="text-xs ml-4"
          />
          <Button
            type="submit" // The button is of type 'submit' to trigger form submission
            text="Login"
            variant="primary"
            tailwindClass="w-full mt-12"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
