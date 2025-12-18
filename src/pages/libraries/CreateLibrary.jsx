import { useState } from "react";
import { API } from "../../api/API";
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";

const CreateLibrary = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    address: "",
    latitude: "",
    longitude: "",
    facebook: "",
    instagram: "",
    telegram: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const e = {};

    if (!form.name) e.name = "Ism majburiy";
    if (!form.phone.startsWith("+998"))
      e.phone = "Telefon +998 bilan boshlanishi kerak";
    if (form.password.length < 8)
      e.password = "Parol kamida 8 ta belgidan iborat bo‘lsin";
    if (!form.address) e.address = "Manzil majburiy";
    if (!form.latitude) e.latitude = "Latitude majburiy";
    if (!form.longitude) e.longitude = "Longitude majburiy";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

  
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("phone", form.phone);
    fd.append("password", form.password);
    fd.append("address", form.address);
    fd.append("latitude", form.latitude);
    fd.append("longitude", form.longitude);
    fd.append("facebook", form.facebook);
    fd.append("instagram", form.instagram);
    fd.append("telegram", form.telegram);

    try {
      await API.post("/auth/register-library/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Kutubxona muvaffaqiyatli qo‘shildi");
    } catch (err) {
      const backendErrors = err.response?.data || {};
      console.log("BACKEND:", backendErrors);
      setErrors(backendErrors);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition";

  const Error = ({ text }) =>
    text ? <p className="text-red-500 text-sm mt-1">{text}</p> : null;

  return (
    <div className="max-w-7xl mx-auto p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient from-gray-900 to-black rounded-xl p-6 space-y-8"
      >
        {/* User */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Foydalanuvchi ma’lumotlari
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <input
                name="name"
                placeholder="Ism"
                className={inputClass}
                onChange={handleChange}
              />
              <Error text={errors.name} />
            </div>

            <div>
              <input
                name="phone"
                placeholder="+998901234567"
                className={inputClass}
                onChange={handleChange}
              />
              <Error text={errors.phone} />
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Parol"
                className={inputClass}
                onChange={handleChange}
              />
              <Error text={errors.password} />
            </div>
          </div>
        </div>

        {/* Library */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Kutubxona ma’lumotlari</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <input
                name="address"
                placeholder="Manzil"
                className={inputClass}
                onChange={handleChange}
              />
              <Error text={errors.address} />
            </div>

            <div>
              <input
                name="latitude"
                placeholder="Latitude"
                className={inputClass}
                onChange={handleChange}
              />
              <Error text={errors.latitude} />
            </div>

            <div>
              <input
                name="longitude"
                placeholder="Longitude"
                className={inputClass}
                onChange={handleChange}
              />
              <Error text={errors.longitude} />
            </div>
          </div>
        </div>

     
        <div className="rounded-xl overflow-hidden border border-gray-700">
          <iframe
            src="https://yandex.uz/map-widget/v1/?ll=69.240562%2C41.299496&z=12"
            width="100%"
            height="350"
            frameBorder="0"
            title="map"
          />
        </div>

        {/* Social */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ijtimoiy tarmoqlar</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <FaFacebook className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
              <input
                name="facebook"
                placeholder="Facebook"
                className={`${inputClass} pl-10`}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <FaInstagram className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500" />
              <input
                name="instagram"
                placeholder="Instagram"
                className={`${inputClass} pl-10`}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <FaTelegram className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
              <input
                name="telegram"
                placeholder="Telegram"
                className={`${inputClass} pl-10`}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition"
          >
            Qo‘shish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLibrary;
