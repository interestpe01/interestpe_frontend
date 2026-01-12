import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
// import Header from "./Component/Header";
// import Footer from "./Component/Footer";
import LoanCalculator from "./Component/LoanCalculator";
import { KhatabookSection } from "./Component/KhatabookSection";
import { ApplicationForm } from "./Component/ApplicationForm";
import { StatusTracker } from "./Component/StatusTracker";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/loancalculator" element={<LoanCalculator />} />
          <Route path="/khatabook" element={<KhatabookSection />} />
          <Route path="/applicationform" element={<ApplicationForm />} />
          <Route path="/statustracker" element={<StatusTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
