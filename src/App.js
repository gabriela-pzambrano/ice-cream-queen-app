import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <main className="bg-background h-full overflow-hidden">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}

export default App;
