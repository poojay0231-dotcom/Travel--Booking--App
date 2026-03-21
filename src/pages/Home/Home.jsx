import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white shadow-md p-4 flex justify-between z-50">
        <h1 className="text-xl font-bold text-indigo-700">YatraBuzz</h1>
        <button className="text-xl">☰</button>
      </header>

      {/* HERO WITH SEARCH */}
      <section className="pt-20 px-6">
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl">

          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Explore the <br />
              <span className="text-indigo-400">Unexplored</span>
            </h1>

            {/* SEARCH BAR */}
            <div className="bg-white rounded-full shadow-xl flex items-center p-2 w-full max-w-3xl">

              <input
                type="text"
                placeholder="Where are you going?"
                className="flex-1 px-4 py-2 outline-none rounded-full text-black"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <input
                type="date"
                className="px-3 py-2 outline-none text-black"
              />

              <input
                type="number"
                min="1"
                className="w-20 px-3 py-2 outline-none text-black"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />

              <button
                onClick={() => navigate("/destination")}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
              >
                Search
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* MODERN CATEGORIES */}
      <section className="px-6 mt-10">
        <h2 className="text-xl font-bold mb-6">Categories</h2>

        <div className="flex gap-5">
          {["Beach", "Mountain", "City", "Adventure"].map((item) => (
            <div
              key={item}
              className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-md 
              hover:shadow-xl hover:scale-110 hover:bg-indigo-50 
              transition duration-300 cursor-pointer"
            >
              <span className="text-sm font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MODERN FEATURED CARD */}
      <section className="px-6 mt-12">
        <h2 className="text-xl font-bold mb-6">Featured</h2>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden 
                        hover:shadow-2xl transition duration-300 group">

          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              className="h-56 w-full object-cover 
                         group-hover:scale-110 transition duration-500"
            />
          </div>

          <div className="p-5">
            <h3 className="font-bold text-lg">Bali Retreat</h3>
            <p className="text-sm text-gray-500">Indonesia</p>

            <div className="flex justify-between items-center mt-5">
              <span className="text-indigo-600 font-bold text-lg">$450</span>

              <button
                onClick={() => navigate("/booking")}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full 
                           hover:bg-indigo-700 hover:scale-105 
                           transition duration-300 shadow-md"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-6 bg-white mt-10 text-center text-sm text-gray-500">
        © 2026 YatraBuzz
      </footer>

    </div>
  );
}

export default Home;