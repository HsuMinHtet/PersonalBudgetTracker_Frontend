import { Button } from "../../components/common";
import InputText from "../../components/common/InputText";
import resetImg from "../../assets/img/reset-img.svg";

function register() {
  const navigate = useNavigate();
  const [email] = useState("");
  const handleReset = (e) => {
    e.preventDefault(); // Prevent the default form submission
    resetPassword(email);
  };
  const resetPassword = (email) => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }
    console.log("<<<<<I am here for testing>>>>>>");
    axios
      .post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
        email,
      })
      .then((response) => {
        alert("Password reset link sent to your email.");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid email!");
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
            name="email"
            placeholder="Enter Email"
          />
          <Button text="Reset" variant="primary" tailwindClass="w-full mt-12" />
        </form>
      </div>
    </div>
  );
}

export default register;
