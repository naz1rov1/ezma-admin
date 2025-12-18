import { HiOutlineMenu } from "react-icons/hi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";

const Header = ({ toggleSidebar }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { data: profileM } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/admin/profile/").then((res) => res.data),
    enabled: !!token, 
  });

  const handleProfileClick = () => {
    if (!token) {
      navigate("/login"); 
    } else {
      navigate("/profile"); 
    }
  };

  return (
    <div className="flex items-center justify-between h-full px-16">
      <div className="flex items-center gap-10">
        <span className="text-2xl font-bold text-red-600">Ezma Admin</span>

        <button
          onClick={toggleSidebar}
          className="p-2 rounded hover:bg-gray-700"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <select
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="bg-[#1f2937] p-2 rounded text-white"
        >
          <option value="uz">Uzb</option>
          <option value="ru">Рус</option>
          <option value="en">Eng</option>
        </select>

    
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2"
        >
          <HiMiniUserCircle className="text-3xl" />
          {token && <span>{profileM?.data?.name}</span>}
        </button>
      </div>
    </div>
  );
};

export default Header;
