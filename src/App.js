import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/HomePage";
import RegistrationForm from "./component/RegistrationPage";
import Login from "./component/LoginPage";
import Logout from "./component/LogoutPage";
import { AuthProvider } from "./AuthContext";
import Layout from "./Layout";

// import "./App.css";
import "./styles.css"
import CategoryItems from "./component/CategoryItems";
import ItemDetailPage from './component/ItemDetailPage';
import AboutPage from "./component/AboutPage";
import CreateItemPage from "./component/CreateItemPage";
import HumbergerMenu from "./component/HumbergerMenu";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/create" element={<CreateItemPage />} />
            <Route path="/category-items/:categoryId" element={<CategoryItems />} /> {/* Add this route */}
            <Route path="/item-details/:itemId" element={<ItemDetailPage />} /> {/* Add this route */}
            <Route path="/humberger" element={<HumbergerMenu />} /> {/* Add this route */}
            
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

