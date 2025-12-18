import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../api/API";
import { Loader } from "@mantine/core";
import { FaUserCircle, FaPhone, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Profile = () => {
   const { t } = useTranslation(); 
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/admin/profile/").then((res) => res.data),
    onSuccess: (data) => {
      setFormData({ name: data.name, phone: data.phone });
    },
  });

  const mutation = useMutation({
    mutationFn: (updatedData) => API.patch("/auth/admin/profile/", updatedData), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setEditModal(false);
    },
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleUpdate = () => {
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0b0f1a]">
        <Loader color="gray" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-400 text-center">Profilni yuklashda xatolik</div>
    );
  }

  return (
    <div className=" bg-gradient from-[#05070f] to-[#0b1220] text-gray-200 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="w-28 h-28 rounded-full border-2 border-gray-600 flex items-center justify-center">
            <FaUserCircle className="text-7xl text-gray-500" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setFormData({
                  name: profile?.name,
                  phone: profile?.phone,
                });
                setEditModal(true);
              }}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-xl transition"
            >
              <FaEdit />
              {t("update")}
            </button>

            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl transition"
            >
              <FaSignOutAlt />
              {t("exit")}
            </button> 
          </div>
        </div>

        <div className="my-8 h-px bg-gray-700/60" />

        <div className="space-y-5 max-w-md">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
              <FaUserCircle />
            </div>
            <div>
              <p className="text-sm text-gray-400">Ism</p>
              <p className="text-lg font-medium">{profile?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
              <FaPhone />
            </div>
            <div>
              <p className="text-sm text-gray-400">Telefon</p>
              <p className="text-lg font-medium">{profile?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#0f172a] rounded-xl p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-2">Chiqishni tasdiqlash</h2>
            <p className="text-sm text-gray-400 mb-6">
              Akkauntdan chiqishni xohlaysizmi?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                Yo‘q
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                Ha
              </button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#0f172a] rounded-xl p-6 w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Profilni tahrirlash</h2>
            <input
              className="w-full p-2 mb-3 rounded bg-gray-800 text-gray-200"
              placeholder="Ism"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              className="w-full p-2 mb-3 rounded bg-gray-800 text-gray-200"
              placeholder="Telefon"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg transition"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
