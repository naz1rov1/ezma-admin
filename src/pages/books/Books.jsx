import { useEffect, useState } from "react";
import { Heart, Search } from "lucide-react";
import { API } from "../../api/API";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [allBooks, setAllBooks] = useState([]); 
  const [books, setBooks] = useState([]); 
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("all"); 

  const navigate = useNavigate();


  const getAllBooks = () => {
    setLoading(true);
    API.get("/books/books/")
      .then((res) => {
        const data = res.data.results || res.data;
        setAllBooks(data);
        setBooks(data);
      })
      .finally(() => setLoading(false));
  };

  const searchBooks = (value) => {
    setLoading(true);
    API.get(`/books/search/book/?q=${value}`)
      .then((res) => {
        const data = res.data.results || res.data;
        setBooks(data);
      })
      .catch((err) => {
        console.log("Search error:", err.response?.data);
      })
      .finally(() => setLoading(false));
  };


  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const applyFilter = (filter) => {
    setActiveFilter(filter);

    let filtered = [...allBooks];

    if (filter === "fav") {
      filtered = filtered.filter((b) => favorites.has(b.id));
    }
    if (filter === "az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (filter === "za") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setBooks(filtered);
  };

  
  useEffect(() => {
    getAllBooks();
  }, []);


  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim() === "") {
        
        applyFilter(activeFilter);
      } else {
        searchBooks(search);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [search, favorites, activeFilter]);

  return (
    <div className="text-white">
 
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => applyFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "all"
                ? "bg-red-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Barcha kitoblar
          </button>
          <button
            onClick={() => applyFilter("fav")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "fav"
                ? "bg-red-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Sevimlilar
          </button>
          <button
            onClick={() => applyFilter("az")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "az"
                ? "bg-red-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            A-Z
          </button>
          <button
            onClick={() => applyFilter("za")}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === "za"
                ? "bg-red-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            Z-A
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kitob nomi bo‘yicha qidirish"
            className="pl-9 pr-4 py-2 rounded-lg outline-none border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>


      <table className="w-full text-left">
        <thead className="bg-[#0e1628] text-gray-400">
          <tr>
            <th className="p-4 w-12"></th>
            <th className="p-4">Kitob nomi</th>
            <th className="p-4">Muallif</th>
            <th className="p-4">Nashriyot</th>
            <th className="p-4 text-right">Mavjud nusxalar</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-400">
                Qidirilmoqda...
              </td>
            </tr>
          ) : books.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                Kitob topilmadi
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr
                key={book.id}
                className="border-t border-gray-800 hover:bg-[#111b30] cursor-pointer"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <Heart
                    onClick={() => toggleFavorite(book.id)}
                    className="w-5 h-5 cursor-pointer transition"
                    stroke={favorites.has(book.id) ? "red" : "gray"} 
                    fill={favorites.has(book.id) ? "red" : "none"} 
                  />
                </td>
                <td className="p-4">{book.name}</td>
                <td className="p-4">{book.author}</td>
                <td className="p-4">{book.publisher}</td>
                <td className="p-4 text-right">
                  <span className="px-3 py-1 rounded-full text-sm bg-red-800 text-red-200">
                    {book.quantity_in_library} nusxalar
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
