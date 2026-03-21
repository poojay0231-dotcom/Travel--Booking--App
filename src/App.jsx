import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import DestinationDetails from "./pages/DestinationDetails/DestinationDetails";
import BookingForm from "./pages/BookingForm/BookingForm";
import Payment from "./pages/Payment/Payment";
import BookingConfirmed from "./pages/BookingConfirmed/BookingConfirmed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination" element={<DestinationDetails />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<BookingConfirmed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;