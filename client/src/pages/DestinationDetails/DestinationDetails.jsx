import { useNavigate } from "react-router-dom";

function DestinationDetails() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen pb-32">

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow flex justify-between items-center px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="text-xl"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-indigo-900">YatraBuzz</h1>
        <div>❤️</div>
      </header>

      {/* HERO IMAGE */}
      <section className="pt-16 relative h-[350px]">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* CONTENT */}
      <div className="bg-white -mt-10 rounded-t-3xl p-6">

        <h1 className="text-3xl font-bold text-indigo-900">
          Maldives Paradise
        </h1>

        <p className="text-gray-500 mt-1">
          North Malé Atoll, Maldives
        </p>

        {/* FEATURES */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            🏊 Pool
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            📶 WiFi
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            🍽 Restaurant
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            ✔ All Meals
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <h2 className="text-xl font-bold">About</h2>
          <p className="text-gray-600 mt-2">
            Experience ultimate luxury in overwater villas with ocean views,
            private service, and unforgettable sunsets.
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 w-full bg-white p-4 flex justify-between items-center shadow-lg">

        <div>
          <p className="text-xs text-gray-400">Price</p>
          <p className="text-xl font-bold text-indigo-700">$1240</p>
        </div>

        <button
          onClick={() => navigate("/booking")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full"
        >
          Book Now
        </button>
      </div>

    </div>
  );
}

export default DestinationDetails;