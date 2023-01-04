import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import DefaultLayout from "./components/containers/default";
import Home from "./components/home";
import AddProduct from "./components/product/addProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="addProduct" element={<AddProduct />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
