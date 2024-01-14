import Collection from "./pages/Collection"
import { Routes, Route} from "react-router-dom"
import MainHome from "./pages/MainHome";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </>
  );
};

export default App;