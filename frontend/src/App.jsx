import Collection from "./pages/Collection"
import { Routes, Route} from "react-router-dom"
import MainHome from "./pages/MainHome";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Product";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;