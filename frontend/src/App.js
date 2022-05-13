import { BrowserRouter,Routes,Route } from "react-router-dom";
import Menu from "./components/Menu";
import ProductDetails from "./components/ProductDetails";
import ProductPage from "./components/ProductPage";
import Cartpage from "./components/Cartpage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Menu></Menu>
        <Routes>
          <Route path="/" element={<ProductPage/>}></Route>
          <Route path="/products/:slug" element={<ProductDetails/>}></Route>
          <Route path="/cartpage" element={<Cartpage/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
