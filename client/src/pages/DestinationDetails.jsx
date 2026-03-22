import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DestinationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/destinations/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Destination not found");
        }
        return res.json();
      })
      .then((data) => {
        setDestination(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="p-6">Loading destination...</div>;
  }

  if (!destination) {
    return <div className="p-6">Destination not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        className="m-6 px-4 py-2 bg-white rounded-full shadow"
        onClick={() => navigate("/")}
      >
        Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold">{destination.title}</h1>
          <p className="text-gray-500 mt-1">{destination.location}</p>
          <p className="mt-4 text-gray-700">{destination.description}</p>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Price per person</p>
              <p className="text-2xl font-bold text-indigo-600">
                ₹{destination.pricePerPerson}
              </p>
            </div>

            <button
              className="bg-indigo-600 text-white px-6 py-3 rounded-full"
              onClick={() => navigate(`/booking/${destination.slug}`)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;