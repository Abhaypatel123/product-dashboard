import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Favorites from './pages/Favorites';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
