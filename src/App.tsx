import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
          <h1 className="text-4xl font-bold text-gray-800">Hello World!</h1>
        </div>
      } />
    </Routes>
  </BrowserRouter>
);

export default App;