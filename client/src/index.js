import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./routes/HomePage"
import CharacterPage from "./routes/CharacterPage"
import PeopleProvider from './context/People';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PeopleProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/characters/:name" element={<CharacterPage />} />
        </Routes>
      </BrowserRouter>
    </PeopleProvider>
  </React.StrictMode>
);