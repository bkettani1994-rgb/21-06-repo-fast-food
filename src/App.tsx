import { Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { OrderProvider } from "./context/OrderContext";

function App() {
  return (
    <NotificationProvider>
      <OrderProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </CartProvider>
      </OrderProvider>
    </NotificationProvider>
  );
}

export default App;
