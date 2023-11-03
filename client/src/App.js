import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Menu } from './components/Menu/Menu';
import { HomePage } from './components/HomePage/HomePage';
import { Marks } from './components/Marks/Marks';
import { ViewSubject } from './components/ViewSubject/ViewSubject';
import { Settings } from './components/Settings/Settings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/marks" element={<Marks />} />
          <Route path="/viewsubject" element={<ViewSubject />} />
          <Route path="/settings" element={<Settings />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
