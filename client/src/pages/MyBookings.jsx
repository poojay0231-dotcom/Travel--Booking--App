import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext";

function MyBookings() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      const res = await apiFetch("/api/bookings/my-bookings");
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
  };

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    loadBookings();
  }, [navigate, isAuthenticated, authLoading]);

  const handleCancel = async (bookingId) => {
    try {
      const res = await apiFetch(`/api/bookings/${bookingId}/cancel`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      await loadBookings();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (authLoading || loading) {
    return <div className="p-6">Loading bookings...</div>;
  }

  if (error) {
    return <div className="p-6">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Back Home
          </button>
        </div>

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
                <p>
                  <strong>Travel Date:</strong>{" "}
                  {booking.travelDate
                    ? new Date(booking.travelDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p><strong>Travelers:</strong> {booking.travelers}</p>
                <p><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Payment:</strong> {booking.paymentStatus}</p>

                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;