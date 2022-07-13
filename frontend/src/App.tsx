import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { baseUrl, userKey } from "./utils/connection";

import "bootstrap/dist/css/bootstrap.min.css";

import Logo from "./components/template/Logo";
import Footer from "./components/template/Footer";
import Nav from "./components/template/Nav";

import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import Communications from "./components/communications/Communications";
import CreateComunication from "./components/communications/CreateComunication";

import "./App.css";

const PLRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Home />} />
      <Route path="/comunications" element={<Communications />} />
      <Route path="/create-comunication" element={<CreateComunication />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

const App: React.FC = () => {
  const [validatingToken, setValidatingToken] = useState<boolean>(true);

  const validateToken = async () => {
    const json = localStorage.getItem(userKey);
    if (!json) return;

    const userData = JSON.parse(json);

    const res = await axios.post(`${baseUrl}/validateToken`, userData);

    if (res.data) {
      setValidatingToken(false);
    } else {
      localStorage.removeItem(userKey);
      setValidatingToken(true);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <BrowserRouter>
      {validatingToken ? (
        <Auth />
      ) : (
        <div className="app">
          <Logo />
          <Nav />
          <PLRoutes />
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
