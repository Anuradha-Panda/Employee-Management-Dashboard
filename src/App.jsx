// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Loginform from './components/Loginform';
import Admin from './components/Admin';
import Employee from './components/Employee';
import EditEmployee from './components/EditEmployee';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Loginform />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/edit/:id" element={<EditEmployee />} />

      <Route path="/employee" element={<Employee />} />

    </Routes>
  );
};

export default App;
