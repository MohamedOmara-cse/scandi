import React from "react";
import Navbar from "./components/Layout/Navbar.jsx";
import ProductList from "./components/MainContent/productList.jsx";
import AddProduct from "./components/MainContent/addProduct.jsx";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  if (location.pathname === "/") {
    console.log(location.pathname);
  }
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
