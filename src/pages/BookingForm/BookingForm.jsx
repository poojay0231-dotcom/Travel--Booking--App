import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BookingForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white shadow-md p-4 flex justify-between z-50">
        <h1 className="text-xl font-bold text-indigo-700">YatraBuzz</h1>
        <div>👤</div>
      </header>

      <main className="pt-20 px-6 max-w-md mx-auto">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-2">
          Secure Your Journey
        </h2>
        <p className="text-gray-500 mb-6">
          Fill your details to complete booking
        </p>

        {/* SUMMARY CARD */}
        <div className="bg-white rounded-xl p-4 shadow mb-6 flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            className="w-20 h-20 object-cover rounded-lg"
          />

          <div>
            <h3 className="font-bold">Bali Retreat</h3>
            <p className="text-sm text-gray-500">4.9 ⭐</p>
            <p className="text-indigo-600 font-bold">$450</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-full border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-full border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              className="w-1/2 p-3 rounded-full border"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
            />

            <input
              type="date"
              className="w-1/2 p-3 rounded-full border"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-full font-bold hover:bg-indigo-700 transition"
          >
            Proceed to Payment →
          </button>

        </form>

      </main>
    </div>
  );
}

export default BookingForm;