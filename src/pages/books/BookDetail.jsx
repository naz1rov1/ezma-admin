import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../api/API";
import { ArrowLeft, Trash2, X } from "lucide-react";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 

  useEffect(() => {
    API.get(`/books/book/${id}/`)
      .then((res) => setBook(res.data))
      .catch((err) => console.log("Detail error:", err.response?.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    setDeleting(true);
    API.delete(`/books/book/${id}/`)
      .then(() => {
        navigate("/books");
      })
      .catch((err) => {
        console.log("Delete error:", err.response?.data);
        alert("Kitobni o‘chirishda xatolik yuz berdi.");
      })
      .finally(() => setDeleting(false));
  };

  if (loading) return <div className="text-gray-400 p-6">Yuklanmoqda...</div>;
  if (!book) return <div className="text-red-400 p-6">Kitob topilmadi</div>;

  return (
    <div className="text-white ">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Kitoblarga qaytish
        </button>
      </div>

      <h1 className="text-2xl font-semibold mb-6">{book.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0e1628] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Muallif</p>
          <p className="font-medium">{book.author}</p>
        </div>

        <div className="bg-[#0e1628] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Nashriyot</p>
          <p className="font-medium">{book.publisher}</p>
        </div>

        <div className="bg-[#0e1628] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Kutubxona</p>
          <p className="font-medium">{book.library?.name}</p>
        </div>

        <div className="bg-[#0e1628] p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Mavjud nusxalar</p>
          <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-900 text-green-400 text-sm">
            {book.quantity_in_library} nusxa
          </span>
        </div>
      </div>

      {book.description && (
        <div className="bg-[#0e1628] p-6 rounded-xl mb-6">
          <h2 className="text-lg font-medium mb-2">Tavsif</h2>
          <p className="text-gray-300 leading-relaxed">{book.description}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-xl text-white disabled:opacity-50"
        >
          <Trash2 size={18} />
          O‘chirish
        </button>
      </div>

 
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#0e1628] rounded-xl p-6 w-80 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-medium mb-4 text-white">o'chirish!</h2>
            <p className="text-gray-300 mb-6">
              Haqiqatan ham ushbu kitobni o‘chirmoqchimisiz?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-500 text-white"
              >
                Yo‘q
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-600 text-white flex items-center gap-2"
                disabled={deleting}
              >
                <Trash2 size={16} />
                {deleting ? "O‘chirilyapti..." : "Ha"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
