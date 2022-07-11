import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./routes/Home"
import CharacterPage from "./routes/CharacterPage"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters/:name" element={<CharacterPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);