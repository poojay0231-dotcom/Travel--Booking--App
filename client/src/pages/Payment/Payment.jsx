import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Payment() {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = () => {
    // fake payment success
    navigate("/success");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white shadow-md p-4 flex justify-between z-50">
        <h1 className="text-xl font-bold text-indigo-700">Checkout</h1>
        <span className="font-bold">YatraBuzz</span>
      </header>

      <main className="pt-20 px-6 max-w-md mx-auto space-y-6">

        {/* SUMMARY */}
        <div className="bg-white rounded-xl p-4 shadow flex gap-4">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div>
            <h3 className="font-bold">Bali Retreat</h3>
            <p className="text-sm text-gray-500">Oct 12 - Oct 18</p>
            <p className="text-indigo-600 font-bold">$450</p>
          </div>
        </div>

        {/* PRICE */}
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between text-sm mb-2">
            <span>6 Nights x $75</span>
            <span>$450</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Service Fee</span>
            <span>$20</span>
          </div>

          <div className="flex justify-between font-bold mt-4 text-indigo-600">
            <span>Total</span>
            <span>$470</span>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div>
          <h2 className="font-bold mb-3">Payment Method</h2>

          <div className="flex gap-3">
            <button className="flex-1 bg-indigo-600 text-white p-3 rounded-lg">
              Card
            </button>
            <button className="flex-1 bg-gray-200 p-3 rounded-lg">
              UPI
            </button>
          </div>
        </div>

        {/* CARD FORM */}
        <div className="bg-white p-4 rounded-xl shadow space-y-4">

          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-3 border rounded-full"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 p-3 border rounded-full"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />

            <input
              type="password"
              placeholder="CVV"
              className="w-1/2 p-3 border rounded-full"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          className="w-full bg-indigo-600 text-white py-4 rounded-full font-bold hover:bg-indigo-700 transition"
        >
          Pay Now
        </button>

      </main>
    </div>
  );
}

export default Payment;