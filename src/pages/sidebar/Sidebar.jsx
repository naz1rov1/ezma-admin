// Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaBook, FaFolder, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";
import { useTranslation } from "react-i18next";

const Sidebar = ({ isSidebarOpen }) => {
  const { t } = useTranslation(); // i18n hook
  const navigate = useNavigate();

  const { data: profileM } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/admin/profile/").then((res) => res.data),
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // Link klassini aniqlash
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded transition-colors duration-200 ${
      isActive ? "bg-gray-700 text-red-500" : "text-gray-300 hover:bg-gray-800"
    } ${!isSidebarOpen ? "justify-center" : ""}`;

  return (
    <div className="flex flex-col p-4 gap-2 h-full justify-between">
      <div className="flex flex-col gap-2">
        {/* Profil */}
        <NavLink to="/profile" className={linkClass} end>
          <FaUser />
          {isSidebarOpen && (
            <span>{profileM?.name || t("profile", "Profil")}</span>
          )}
        </NavLink>

        {/* Kutubxonalar */}
        <NavLink to="/libraries" className={linkClass} end>
          <FaFolder />
          {isSidebarOpen && <span>{t("librirary")}</span>}
        </NavLink>

        {/* Kitoblar */}
        <NavLink to="/books" className={linkClass} end>
          <FaBook />
          {isSidebarOpen && <span>{t("books")}</span>}
        </NavLink>

        {/* Yangi kutubxona qo'shish */}
        <NavLink to="/libraries/create" className={linkClass} end>
          <FaPlus />
          {isSidebarOpen && <span>{t("addLibrary")}</span>}
        </NavLink>
      </div>

    
      <button
        onClick={handleLogout}
        className={`flex items-center gap-3 p-3 rounded transition-colors duration-200 text-gray-300 hover:bg-red-600 ${
          !isSidebarOpen ? "justify-center" : ""
        }`}
      >
        <FaSignOutAlt />
        {isSidebarOpen && <span>{t("exit", "Chiqish")}</span>}
      </button>
    </div>
  );
};

export default Sidebar;
