import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { apiFetch } from "../utils/api";

function BookingForm() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [travelers, setTravelers] = useState(1);
  const [travelDate, setTravelDate] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/destinations/${slug}`)
      .then((res) => res.json())
      .then((data) => setDestination(data))
      .catch((err) => console.error(err));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn()) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await apiFetch("http://localhost:5000/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          destinationId: Number(destination.id),
          travelers: Number(travelers),
          travelDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create booking");
      }

      navigate("/success", { state: { booking: data, destination } });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (!destination) {
    return <div className="p-6">Loading booking form...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Book {destination.title}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Travel Date</label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Travelers</label>
            <input
              type="number"
              min="1"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;