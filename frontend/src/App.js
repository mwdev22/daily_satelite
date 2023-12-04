import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import { HomePage } from './components/HomePage';
import { SpecifiedImg } from './components/SpecifiedImg';
import { Navbar } from './components/Navbar';
import { NearestObject } from './components/NearestObject'

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/specified_img/:date" element={<SpecifiedImg />} />
        <Route path="/neo" element={<NearestObject />} />
      </Routes>
    </Router>
  );
}

export default App;
