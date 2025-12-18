import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    uz: {
      translation: {
        librirary: "Kutubxonalar",
        books: "Kitoblar",
        exit: "Chiqish",
        addLibrary: "kutubxona qo'shish",
        update: "tahrirlash",
      },
    },
    ru: {
      translation: {
        librirary: "Библиотеки",
        books: "Книги",
        exit: "Выход",
        addLibrary: "Добавить библиотеку",
        update: "исправить", 
      },
    },
    en: {
      translation: {
        librirary: "Libraries",
        books: "Books",
        exit: "Exit",
        addLibrary: "Add Library",
        update: "Update",
      },
    },
  },
  lng: "uz",
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
