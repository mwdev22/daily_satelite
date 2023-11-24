import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './components/HomePage';
import { SpecifiedImg } from './components/SpecifiedImg';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/specified_img/:date" element={<SpecifiedImg />} />
      </Routes>
    </Router>
  );
}

export default App;
