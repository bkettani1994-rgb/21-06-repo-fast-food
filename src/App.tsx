import { Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { DesignSkills } from "./pages/DesignSkills";
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
            <Route path="/design-skills" element={<DesignSkills />} />
          </Routes>
        </CartProvider>
      </OrderProvider>
    </NotificationProvider>
  );
}

export default App;
