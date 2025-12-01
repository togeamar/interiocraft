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
import ConsultationRequests from "./components/ConsultationRequests";
import { CustomerDashboard } from "./components/Pages/CustomerDashboard";  // <-- ADD THIS

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
          <Route path="register" element={<Register />} />
          <Route path="budget-estimator" element={<BudgetEstimator />} />
          <Route path="consultation" element={<Consultation />} />

          <Route path="dashboard" element={<CustomerDashboard />} /> 
          {/* <-- ADD THIS */}
        </Route>

        <Route path="/consultations" element={<ConsultationRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
