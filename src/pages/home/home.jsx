import Link from "../../components/common/Link";
import homeImg from "../../assets/img/home.svg";

function home() {
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
          Track your spending, manage your budget, and save smarter with our
          intuitive budget tracker app. Whether you're planning for the month or
          aiming for long-term goals, our app empowers you to stay on top of
          your finances effortlessly. Start today and watch your savings grow!
        </p>
        <Link
          href="/login"
          text="Get Started"
          tailwindClass="bg-primary hover:bg-transparent text-textColor hover:text-primary border-solid border-2 border-primary font-medium p-4 rounded"
        />
      </div>
    </div>
  );
}

export default home;
