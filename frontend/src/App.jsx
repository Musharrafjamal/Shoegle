import Collection from "./pages/Collection"
import { Routes, Route} from "react-router-dom"
import MainHome from "./pages/MainHome";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </>
  );
};

export default App;