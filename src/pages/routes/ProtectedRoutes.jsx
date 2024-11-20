import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../../features/hooks/useAuth";
import Header from "../../components/layout/header/header.jsx";
import Footer from "../../components/layout/footer/footer.jsx";
import Home from "../../pages/home/home.jsx";
import Login from "../../pages/login/login.jsx";
import Register from "../../pages/register/register.jsx";
import "../../main.css";

const ProtectedRoutes = () => {
  const { role, isLoggedIn } = useAuth();

  const viewAccountHolderPageAccess = isLoggedIn && role === "ACCOUNT_HOLDER";
  const viewAdminPageAccess = isLoggedIn && role === "ADMIN";

  const RootComponent = () => {
    if (!isLoggedIn) return <Home />; // Assuming you have a different homepage for unauthorized users
    switch (role) {
      case "ACCOUNT_HOLDER":
        return <AccountHolderDashboard />;
      case "ADMIN":
        return <AdminDashoard />;
      default:
        return <Home />;
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <main className="h-85v bg-bgColor dark:bg-darkBgColor text-textColor dark:text-darkTextColor px-4 flex justify-center">
        <Routes>
          <Route path="/" element={<RootComponent />} />
          <Route
            zpath="/"
            element={!isLoggedIn ? <LoginPage /> : <Navigate to="/home" />}
          />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default ProtectedRoutes;
