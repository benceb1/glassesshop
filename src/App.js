import PrivateRoute from "components/PrivateRoute";
import { AuthProvider } from "context/AuthContext";
import Admin from "pages/Admin";
import AdminLogin from "pages/AdminLogin";
import Main from "pages/Main";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
