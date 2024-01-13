import Home from "./pages/Home";
import Featured from "./pages/Featured";
import BestSeller from "./pages/BestSeller";
import Collection from "./pages/Collection"

const App = () => {
  return (
    <>
      <section id="home">
        <Home />
      </section>
      <section id="featured">
        <Featured />
      </section>
      <section id="best-seller">
        <BestSeller />
      </section>
      <section id="collection">
        <Collection />
      </section>
    </>
  );
};

export default App;