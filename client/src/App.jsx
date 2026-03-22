import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import BookingConfirmed from "./pages/BookingConfirmed.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyBookings from "./pages/MyBookings.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:slug" element={<DestinationDetails />} />
        <Route path="/booking/:slug" element={<BookingForm />} />
        <Route path="/success" element={<BookingConfirmed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;