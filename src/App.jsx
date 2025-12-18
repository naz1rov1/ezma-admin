import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Libraries from "./pages/Libraries";
import Books from "./pages/books/Books";
import Profile from "./pages/profile/Profile";
import BookDetail from "./pages/books/BookDetail";
import Login from "./pages/login/Login";
import ProtectedLayout from "./components/ProtectedLayout";
import CreateLibrary from "./pages/libraries/CreateLibrary";
import LibraryDetail from "./LibraryDetail";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedLayout />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/libraries" replace />} />
          <Route path="/libraries" element={<Libraries />} />
          <Route path="/libraries/:id" element={<LibraryDetail/>} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/libraries/create" element={<CreateLibrary />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
