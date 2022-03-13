import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App';
import Archeology from './components/Archeology';
import ArchMaterials from './components/ArchMaterials';
import ArchCalc from './components/ArchCalc';
import CustomNavbar from './components/CustomNavBar';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/archeology_materials" element={<ArchMaterials />} />
        <Route path="/archeology_calculator" element={<ArchCalc />} />
        <Route path="/archeology" element={<Archeology />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
