import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function BookingConfirmed() {
  const navigate = useNavigate();

  // ✅ DOWNLOAD FUNCTION
  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("YatraBuzz Booking Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text("Booking Confirmed!", 20, 40);

    doc.text("Destination: Bali Retreat", 20, 60);
    doc.text("Location: Indonesia", 20, 70);

    doc.text("Travelers: 2", 20, 80);
    doc.text("Check-in: 12 Dec", 20, 90);
    doc.text("Check-out: 18 Dec", 20, 100);

    doc.text("Total Paid: $900", 20, 120);

    doc.save("receipt.pdf");
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white shadow-md p-4 flex justify-between z-50">
        <h1 className="text-xl font-bold text-indigo-700">YatraBuzz</h1>
        <div>👤</div>
      </header>

      <main className="pt-20 px-6 max-w-md mx-auto">

        {/* SUCCESS ICON */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl text-green-600">✔</span>
          </div>

          <h1 className="text-2xl font-bold text-indigo-700">
            Booking Confirmed!
          </h1>

          <p className="text-gray-500 mt-2">
            Your trip is successfully booked 🎉
          </p>
        </div>

        {/* DETAILS CARD */}
        <div className="bg-white rounded-xl p-6 shadow mb-6">

          <div className="flex justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400">Transaction ID</p>
              <p className="font-bold">#YB123456</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">Date</p>
              <p className="font-bold">Today</p>
            </div>
          </div>

          {/* DESTINATION */}
          <div className="flex gap-4 items-center mb-4">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-bold">Bali Retreat</h2>
              <p className="text-sm text-gray-500">Indonesia</p>
            </div>
          </div>

          {/* INFO */}
          <div className="grid grid-cols-2 gap-3 text-sm">

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-gray-400 text-xs">Check-In</p>
              <p className="font-bold">12 Dec</p>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-gray-400 text-xs">Check-Out</p>
              <p className="font-bold">18 Dec</p>
            </div>

            <div className="bg-gray-100 p-3 rounded col-span-2">
              <p className="text-gray-400 text-xs">Travelers</p>
              <p className="font-bold">2 Guests</p>
            </div>
          </div>

          {/* PRICE */}
          <div className="flex justify-between mt-5">
            <span className="text-gray-500">Total Paid</span>
            <span className="text-xl font-bold text-indigo-600">
              $900
            </span>
          </div>

          <p className="text-green-600 text-xs mt-2">
            ✔ Payment Verified
          </p>
        </div>

        {/* BUTTONS */}
        <div className="space-y-3">

          <button
            onClick={() => navigate("/")}
            className="w-full bg-indigo-600 text-white py-3 rounded-full font-bold hover:bg-indigo-700 transition"
          >
            Go to Home
          </button>

          <button
            onClick={downloadReceipt}   // ✅ CONNECTED HERE
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-300 transition"
          >
            Download Receipt
          </button>

        </div>

      </main>
    </div>
  );
}

export default BookingConfirmed;