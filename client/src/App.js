import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Menu } from './components/Menu/Menu';
import { HomePage } from './components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/menu" element={<Menu />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
