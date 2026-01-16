import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import NewArticle from "./pages/NewArticle";
import AdminModeration from "./pages/AdminModeration";
import ContactMessages from "./pages/ContactMessages";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/:uid/:token" element={<ResetPasswordConfirm />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route
        path="/articles/:id/edit"
        element={(
          <ProtectedRoute requireActive>
            <NewArticle />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/articles/new"
        element={(
          <ProtectedRoute requireActive>
            <NewArticle />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/admin/moderation"
        element={(
          <ProtectedRoute requireAdmin>
            <AdminModeration />
          </ProtectedRoute>
        )}
      />
      <Route
        path="/admin/messages"
        element={(
          <ProtectedRoute requireActive>
            <ContactMessages />
          </ProtectedRoute>
        )}
      />
    </Routes>
  );
}
