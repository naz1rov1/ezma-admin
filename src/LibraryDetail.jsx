import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Info, Send } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { API } from "./api/API";
import "leaflet/dist/leaflet.css";

const LibraryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [library, setLibrary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/libraries/library/${id}/`)
      .then((res) => {
        setLibrary(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6 text-center">Yuklanmoqda...</div>;
  if (!library)
    return <div className="p-6 text-center">Kutubxona topilmadi</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
     
      <div className="space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 mb-4 rounded-xl py-2 px-4   justify-center "
        >
          <ArrowLeft size={18} /> Orqaga
        </button>

        <div className="bg-gray-900 p-6 rounded-xl space-y-4 shadow-md">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Info className="text-red-400" /> Kutubxona haqida ma'lumot
          </h2>

          <div className="bg-gray-800 p-3 rounded-md space-y-2">
            <div className="flex gap-2 text-gray-300">
              <span className="font-semibold w-24">Manzil:</span>
              <span>{library.address}</span>
            </div>

            {library.phone && (
              <div className="flex gap-2 text-gray-300">
                <span className="font-semibold w-24">Telefon:</span>
                <span>{library.phone}</span>
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-3 rounded-md space-y-2">
            <h3 className="text-red-400 font-semibold flex items-center gap-2">
              <Send size={16} /> Ijtimoiy tarmoqlar
            </h3>
            <div className="flex flex-col gap-1">
              {library.telegram && (
                <a
                  href={library.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Telegram
                </a>
              )}
              {library.instagram && (
                <a
                  href={library.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:underline"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* O'ng: Yandex Map */}
      <div className="bg-gray-900 p-4 rounded-xl shadow-md">
        <h2 className="text-lg mb-3 text-white flex items-center gap-2">
          <MapPin className="text-red-400" /> Manzil
        </h2>

        <div className="rounded-xl overflow-hidden border border-gray-700">
          <iframe
            src="https://yandex.uz/map-widget/v1/?ll=69.240562%2C41.299496&z=12"
            width="100%"
            height="350"
            frameBorder="0"
            title="map"
          />
        </div>
      </div>
    </div>
  );
};

export default LibraryDetail;
