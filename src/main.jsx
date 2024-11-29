import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/layout/header/header.jsx";
import Footer from "./components/layout/footer/footer.jsx";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Reset from "./pages/reset/reset.jsx";
import Category from "./pages/category/category.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Profile from "./pages/profile/profile.jsx";
import EditProfile from "./pages/profile/editProfile.jsx";
import ChangePassword from "./pages/changepassword/changepassword.jsx";
import AnimatedCursor from "react-animated-cursor";
import "./main.css";

const applyDefaultTheme = () => {
  const savedMode = localStorage.getItem("darkMode");

  if (savedMode) {
    if (savedMode === "enabled") {
      document.documentElement.classList.add("dark");
    }
  } else {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    }
  }
};

applyDefaultTheme();

createRoot(document.getElementById("budgetApp")).render(
  <StrictMode>
    <AnimatedCursor
      innerSize={8}
      outerSize={35}
      innerScale={1}
      outerScale={2}
      outerAlpha={0}
      hasBlendMode={true}
      innerStyle={{
        backgroundColor: "var(--cursor-color)",
      }}
      outerStyle={{
        border: "3px solid var(--cursor-color)",
      }}
      clickables={[
        "a",
        'input[type="text"]',
        'input[type="password"]',
        'input[type="textarea"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        "label[for]",
        "select",
        "textarea",
        "button",
        ".link",
        {
          target: ".custom",
          options: {
            innerSize: 12,
            outerSize: 12,
            color: "255, 255, 255",
            outerAlpha: 0.3,
            innerScale: 0.7,
            outerScale: 5,
          },
        },
      ]}
    />

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />

          <main className="h-85v bg-bgColor dark:bg-darkBgColor text-textColor dark:text-darkTextColor px-4 flex justify-center">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/category" element={<Category />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/changepassword" element={<ChangePassword />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
);
