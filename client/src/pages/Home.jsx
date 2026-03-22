import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function Home() {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const navigate = useNavigate();
  const { user, isAuthenticated, logout, loading } = useAuth();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/destinations`)
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Error fetching destinations:", err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const uniqueLocations = useMemo(() => {
    const locations = destinations.map((dest) => dest.location).filter(Boolean);
    return ["all", ...new Set(locations)];
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    const query = searchTerm.trim().toLowerCase();

    if (query) {
      result = result.filter((dest) => {
        const titleMatch = dest.title?.toLowerCase().includes(query);
        const locationMatch = dest.location?.toLowerCase().includes(query);
        return titleMatch || locationMatch;
      });
    }

    if (selectedLocation !== "all") {
      result = result.filter((dest) => dest.location === selectedLocation);
    }

    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
    } else if (sortBy === "duration-low-high") {
      result.sort((a, b) => a.durationDays - b.durationDays);
    } else if (sortBy === "duration-high-low") {
      result.sort((a, b) => b.durationDays - a.durationDays);
    }

    return result;
  }, [destinations, searchTerm, selectedLocation, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("all");
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="px-6 py-4 bg-white shadow-sm flex items-center justify-between">
        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          YatraBuzz
        </h1>

        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700">
              Hi, {user?.name || "User"}
            </span>
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

      <div className="px-6 py-10">
        <h2 className="text-4xl font-bold mb-2">Explore Dream Destinations</h2>
        <p className="text-gray-600 mb-6">
          Book curated travel experiences with real backend data.
        </p>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location === "all" ? "All Locations" : location}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Sort By</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="duration-low-high">Duration: Short to Long</option>
            <option value="duration-high-low">Duration: Long to Short</option>
          </select>

          <button
            onClick={clearFilters}
            className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-gray-600">
            No destinations found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={dest.heroImage}
                  alt={dest.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-xl font-semibold">{dest.title}</h3>
                  <p className="text-gray-500">{dest.location}</p>
                  <p className="text-sm mt-2">{dest.description}</p>

                  <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                    <span>{dest.durationDays} days</span>
                    <span>Max {dest.maxTravelers} travelers</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-indigo-600 font-bold">
                      ₹{dest.pricePerPerson}
                    </span>
                    <button
                      onClick={() => navigate(`/destination/${dest.slug}`)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;