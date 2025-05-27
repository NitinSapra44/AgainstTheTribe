import Layout from "../layout";
import "./App.css";
import UserState from "../userContext.jsx";
import Navbar from "./components/navbar";
import IndexPage from "./Pages/IndexPage";
import NotFoundPage from "./Pages/NotFoundPage";
import LoginForm from "./Pages/LoginPage";
import ProtectedRoute from "../protectedRoute.jsx";
import ProductForm from "./Pages/ProductsAddPage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import EditProductForm from "./Pages/SingleProductPage.jsx";
import Users from "./Pages/UsersPage.jsx";
import Ordersbyuser from "./Pages/Ordersbyuser.jsx";
import OrdersPage from "./Pages/OrdersPage.jsx";
import Orderidpage from "./Pages/OrderwithIdpage.jsx"
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <UserState>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route
              path={"/users"}
              element={
                <ProtectedRoute>
                  <Users/>
                </ProtectedRoute>
              }
            />
            <Route path={"/user/:id"} element={ <ProtectedRoute>
                 <Ordersbyuser/>
                </ProtectedRoute>}/>
            <Route
              path={"/products"}
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/product/add"}
              element={
                <ProtectedRoute>
                  <ProductForm />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/product/:id"}
              element={
                <ProtectedRoute>
                  <EditProductForm />
                </ProtectedRoute>
              }
            />
            <Route path={"/orders"} element={
                <ProtectedRoute>
                 <OrdersPage/>
                </ProtectedRoute>
              }
            />
             <Route path={"/order/:id"} element={
                <ProtectedRoute>
                 <Orderidpage/>
                </ProtectedRoute>
              }
            />
            <Route path={"/login"} element={<LoginForm />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </UserState>
    </>
  );
}

export default App;
