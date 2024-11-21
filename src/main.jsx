import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux"; // To get state from Redux
import Header from "./components/layout/header/header.jsx";
import Footer from "./components/layout/footer/footer.jsx";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Reset from "./pages/reset/reset.jsx";
import Category from "./pages/category/category.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import AdminDashboard from "./pages/admindashboard/admindashboard.jsx"; // Example admin dashboard
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

/**
 * ProtectedRoute Component for Auth and Role Checks
 */
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth); // Replace `auth` with your Redux slice name

  // Check if the user is logged in
  if (!isLoggedIn) return <Navigate to="/login" />;

  // Check if the user role is authorized for the route
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Render the component if all checks pass
  return element;
};

createRoot(document.getElementById("budgetApp")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <main className="h-85v bg-bgColor dark:bg-darkBgColor text-textColor dark:text-darkTextColor px-4 flex justify-center">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<Reset />} />

              {/* Protected Routes */}
              <Route
                path="/category"
                element={
                  <ProtectedRoute
                    element={<Category />}
                    allowedRoles={["ACCOUNT_HOLDER"]}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    element={<Dashboard />}
                    allowedRoles={["ACCOUNT_HOLDER"]}
                  />
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute
                    element={<AdminDashboard />}
                    allowedRoles={["ADMIN"]}
                  />
                }
              />
            </Routes>
          </main>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
);
