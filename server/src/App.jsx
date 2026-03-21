import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DestinationDetails from "./pages/DestinationDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:slug" element={<DestinationDetails />} />
      </Routes>
    </Router>
  );
}

export default App;