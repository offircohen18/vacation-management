import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RequesterPage from "./pages/RequesterPage";
import ValidatorPage from "./pages/ValidatorPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/requester"
          element={
            <ProtectedRoute role="Requester">
              <RequesterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/validator"
          element={
            <ProtectedRoute role="Validator">
              <ValidatorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
