import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Purchases from "./pages/Puchases"; // Perbaikan nama file
import History from "./pages/History";
import { PrivateRoute } from "./privateroute";

function App() {
  // Komponen untuk menyembunyikan Navbar dan Footer
  const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbar = ["/", "/Login", "/login"];
    const hideFooter = ["/", "/Login", "/login"];

    return (
      <>
        {!hideNavbar.includes(location.pathname) && <Navbar />}
        {children}
        {!hideFooter.includes(location.pathname) && <Footer />}
      </>
    );
  };

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            {/* Rute login */}
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />

            {/* Rute lain dengan PrivateRoute */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/history" element={<History />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
