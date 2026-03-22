import { useLocation, useNavigate } from "react-router-dom";

function BookingConfirmed() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
  const destination = location.state?.destination;

  if (!booking || !destination) {
    return <div className="p-6">No booking found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Booking Confirmed
        </h1>

        <p className="mb-2"><strong>Reference:</strong> {booking.reference}</p>
        <p className="mb-2"><strong>Destination:</strong> {destination.title}</p>
        <p className="mb-2"><strong>Travelers:</strong> {booking.travelers}</p>
        <p className="mb-2"><strong>Total Amount:</strong> ₹{booking.totalAmount}</p>
        <p className="mb-4"><strong>Status:</strong> {booking.status}</p>

        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmed;