import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layouts/Layout";
import { Home } from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import { Services } from "./components/Pages/Services";
import { Contact } from "./components/Pages/Contact";
import { Login } from "./components/Pages/Login";
import { Register } from "./components/Pages/Register";
import BudgetEstimator from "./components/Pages/BudgetEstimator";
import { Consultation } from "./components/Pages/Consultation";
import AdminDashboard from "./components/Pages/AdminDashboard";
import CustomerDashboard from "./components/Pages/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="budget-estimator" element={<BudgetEstimator />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="customer-dashboard" element={<CustomerDashboard />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;