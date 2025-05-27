import "./App.css";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/IndexPage.jsx";
import AllMenPage from "./pages/AllMenPage.jsx";
import MenTopwear from "./pages/menTopwear.jsx";
import MenBottomWear from "./pages/menBottomwear.jsx"
import AllWomenPage from "./pages/AllWomenPage.jsx"
import WomenTopwear from "./pages/womenTopwear.jsx"
import WomenBottomWear from "./pages/womenBottomwear.jsx"
import SingleProductPage from "./pages/SingleProductPage.jsx"
import { Routes, Route } from "react-router-dom";
import UserState from "../userContext.jsx";
import Layout from "../layout.jsx";
import AboutUs from "./pages/AboutUs.jsx";  
import ShippingandReturn from "./pages/Shipping&ReturnPolicy.jsx"
import Termsofservice from "./pages/termsofservice.jsx"
import Privacypolicy from "./pages/privacyPolicy.jsx";
import CartPage from "./pages/CartPage.jsx"
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/OrdersPage.jsx";
import SingleOrderSummary from "./pages/SingleOrderSummaryPage.jsx";

function App() {
  return (
    <>
    <UserState>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/product/:id"
            element={<SingleProductPage/>}
          />
          <Route path="/men" element={<AllMenPage />} />
          <Route path="/men/topwear" element={<MenTopwear />} />
          <Route path="/men/bottomwear" element={<MenBottomWear />} />
           <Route path="/women" element={<AllWomenPage />} />
          <Route path="/women/topwear" element={<WomenTopwear />} />
          <Route path="/women/bottomwear" element={<WomenBottomWear />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/policy/shippingandreturnpolicy" element={<ShippingandReturn />} />
          <Route path="/policy/termsofservice" element={<Termsofservice />} />
          <Route path="/policy/privacypolicy" element={<Privacypolicy />} />
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/order/:id" element={<SingleOrderSummary/>}/>
          <Route
            path="*"
            element={
              <h1 className="text-4xl text-center font-bold">Page Not Found</h1>
            }
          />
        </Route>
      </Routes>
      </UserState>
    </>
  );
}

export default App;
