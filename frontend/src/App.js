import React from "react";
import {Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
function App() {
  return (
    <>
        <Header/>
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/login" element={<LoginScreen />}/>
              <Route path="/product/:id" element={<ProductScreen />}/>
              <Route path="/cart/:id" element={<CartScreen />}/>
              <Route path="/" element={<HomeScreen />}/>
            </Routes>
          </Container>
          
        </main>
        <Footer/>
      
    </>
  );
}

export default App;
