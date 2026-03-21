import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch destinations:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">YatraBuzz</h1>
      </header>

      <section className="px-6 py-10">
        <h2 className="text-4xl font-bold mb-2">Explore Dream Destinations</h2>
        <p className="text-gray-600 mb-8">
          Book curated travel experiences with real backend data.
        </p>

        {loading ? (
          <p>Loading destinations...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/destination/${d.slug}`)}
              >
                <img
                  src={d.heroImage}
                  alt={d.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{d.title}</h3>
                  <p className="text-gray-500">{d.location}</p>
                  <p className="text-gray-600 mt-2">{d.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-indigo-600 font-bold">
                      ₹{d.pricePerPerson}
                    </span>
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/destination/${d.slug}`);
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;