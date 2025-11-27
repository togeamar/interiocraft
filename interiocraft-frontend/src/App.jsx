import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import BudgetEstimator from "./components/BudgetEstimator";

function App() {
  console.log("App render – router active"); // debug

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/budget-estimator" element={<BudgetEstimator />} />
    </Routes>
  );
}

export default App;

