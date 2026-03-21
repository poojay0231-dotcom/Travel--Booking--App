import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import BookingConfirmed from "./pages/BookingConfirmed.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:slug" element={<DestinationDetails />} />
        <Route path="/booking/:slug" element={<BookingForm />} />
        <Route path="/success" element={<BookingConfirmed />} />
      </Routes>
    </Router>
  );
}

export default App;