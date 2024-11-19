import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/header/header.jsx';
import Footer from './components/layout/footer/footer.jsx';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import './main.css';

const applyDefaultTheme = () => {
  const savedMode = localStorage.getItem('darkMode');

  if (savedMode) {
    if (savedMode === 'enabled') {
      document.documentElement.classList.add('dark');
    }
  } else {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    }
  }
};

applyDefaultTheme();

createRoot(document.getElementById('budgetApp')).render(
  <StrictMode>
    
    <Router>
      
      <Header />

      <main className='h-85v bg-bgColor dark:bg-darkBgColor text-textColor dark:text-darkTextColor px-4 flex justify-center'>

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </main>

      <Footer />

    </Router>

  </StrictMode>,
)
