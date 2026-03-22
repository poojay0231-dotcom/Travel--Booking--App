import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { apiFetch } from "../utils/api";

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    async function loadBookings() {
      try {
        const res = await apiFetch("http://localhost:5000/api/bookings/my-bookings");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }

        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("MyBookings error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [navigate]);

  if (loading) {
    return <div className="p-6">Loading bookings...</div>;
  }

  if (error) {
    return <div className="p-6">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-6">
            No bookings found.
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {booking.destination?.title || "Unknown Destination"}
                </h2>
                <p><strong>Reference:</strong> {booking.reference}</p>
                <p><strong>Location:</strong> {booking.destination?.location || "N/A"}</p>
                <p><strong>Travel Date:</strong> {new Date(booking.travelDate).toLocaleDateString()}</p>
                <p><strong>Travelers:</strong> {booking.travelers}</p>
                <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Payment:</strong> {booking.paymentStatus}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;