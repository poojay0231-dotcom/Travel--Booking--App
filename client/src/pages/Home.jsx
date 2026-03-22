import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, clearToken } from "../utils/auth";

function Home() {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  // Fetch destinations
  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Error fetching destinations:", err));
  }, []);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="px-6 py-4 bg-white shadow-sm flex items-center justify-between">
        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          YatraBuzz
        </h1>

        {isLoggedIn() ? (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/my-bookings")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              My Bookings
            </button>
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="px-6 py-10">
        <h2 className="text-4xl font-bold mb-2">
          Explore Dream Destinations
        </h2>
        <p className="text-gray-600 mb-8">
          Book curated travel experiences with real backend data.
        </p>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Image */}
              <img
                src={dest.heroImage}
                alt={dest.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{dest.title}</h3>
                <p className="text-gray-500">{dest.location}</p>
                <p className="text-sm mt-2">{dest.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-indigo-600 font-bold">
                    ₹{dest.pricePerPerson}
                  </span>
                  <button
                    onClick={() =>
                      navigate(`/booking/${dest.slug}`)
                    }
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;