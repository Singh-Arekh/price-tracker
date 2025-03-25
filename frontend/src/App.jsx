import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar';
import Home from './components/Home';

const App = () => {
  return (
    
    <Router>
      <Routes>        
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App