import React from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.page";
import Catalog from "./pages/Catalog.page";
import Footer from "./components/Footer";
import Login from "./pages/Login.page";
import Signup from "./pages/Signup.page";
import { UserProvider } from "./contexts/user.context";
import PrivateRoute from "./pages/PrivateRoute.page";
import Logout from "./pages/Logout.page";
import Order from "./pages/Order.page";
export default function App() {
  
  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((users) => console.log(users));
  }, []);

  return (
    <div className="bg-orange-100">
      <BrowserRouter>
        <UserProvider>
        <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/catalog" element={<Catalog />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Signup />} />
            <Route exact path="/order" element={<Order/>}/>
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<Logout />} />
            </Route>
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
