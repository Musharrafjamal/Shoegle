import Collection from "./pages/Collection"
import { Routes, Route} from "react-router-dom"
import MainHome from "./pages/MainHome";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Product";
import Test from "./pages/Test";
import CheckOut from "./pages/CheckOut";
import OrderPlaced from "./pages/OrderPlaced"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;