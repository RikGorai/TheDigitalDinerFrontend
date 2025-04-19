import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ItemDetail from './pages/ItemDetail';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from './pages/Orders';
import AddMenuItem from './pages/AddMenuItem';
import OrderConfirmation from './pages/OrderConfirmation'; // Import the OrderConfirmation page
import RemoveMenuItem from './pages/RemoveMenuItem'; // Import the RemoveMenuItem page
import Nav from './components/Nav';
import FooterCart from './components/FooterCart'; // Ensure FooterCart is imported
import useAuthStore from './store/authStore';

export default function App() {
  const { token, user } = useAuthStore();
  return (
    <div className="min-h-screen relative flex flex-col">
      <Nav />
      <div className="flex-grow pb-16"> {/* Added pb-16 to add padding for FooterCart */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={token ? <Orders /> : <Login />} />
          <Route path="/add-menu-item" element={user?.role === 'admin' ? <AddMenuItem /> : <Login />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} /> {/* Add route */}
          <Route path="/remove-menu-item" element={user?.role === 'admin' ? <RemoveMenuItem /> : <Login />} />
        </Routes>
      </div>
      <FooterCart /> {/* Ensure FooterCart is rendered */}
    </div>
  );
}
