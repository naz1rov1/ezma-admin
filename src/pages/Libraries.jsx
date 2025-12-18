import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/API";

const Libraries = () => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); 

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/libraries/libraries/")
      .then((res) => {
        setLibraries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-4">Yuklanmoqda...</div>;

  const filteredLibraries = libraries
    .filter((lib) => {
      if (filter === "active") return lib.is_active;
      if (filter === "inactive") return !lib.is_active;
      return true; 
    })
    .filter((lib) => lib.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="">
   
      <div className="flex justify-between mb-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all"
                ? "bg-red-700 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-md ${
              filter === "active"
                ? "bg-red-700 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Faol
          </button>
          <button
            onClick={() => setFilter("inactive")}
            className={`px-4 py-2 rounded-md ${
              filter === "inactive"
                ? "bg-red-700 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Nofaol
          </button>
        </div>

        <input
          type="text"
          placeholder="Qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#0e1628] text-gray-400">
            <tr>
              <th className="py-2 px-4">Kutubxona</th>
              <th className="py-2 px-4">Holat</th>
              <th className="py-2 px-4">Manzil</th>
              <th className="py-2 px-4">Jami kitoblar</th>
            </tr>
          </thead>
          <tbody>
            {filteredLibraries.map((lib) => (
              <tr
                key={lib.id}
                className="border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                onClick={() => navigate(`/libraries/${lib.id}`)}
              >
                <td className="py-2 px-4">{lib.name}</td>
                <td className="px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      lib.is_active ? "bg-green-700" : "bg-red-700"
                    }`}
                  >
                    {lib.is_active ? "Faol" : "Nofaol"}
                  </span>
                </td>
                <td className="py-2 px-30">{lib.address}</td>
                <td className="py-2 px-4">{lib.total_books} ta</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Libraries;
