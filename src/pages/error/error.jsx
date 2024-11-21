import homeImg from "../../assets/img/home.svg";
import Button from "../../components/common/Button";

function error() {
  return (
    <div className="flex items-center justify-center flex-row max-w-screen-lg p-4">
      <img
        src={homeImg}
        alt="Budget App Home Page Illustration"
        className="h-96 w-96 p-6 mr-6"
      />
      <div>
        <h1 className="font-black text-2xl">
          Take Control of Your Finances with Ease
        </h1>
        <p className="py-4 mb-4">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default error;
