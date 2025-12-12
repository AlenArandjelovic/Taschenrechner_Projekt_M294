// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation';
import Verlauf from './Verlauf';
import Calculator from './Calculator'; // <--- NEU: Calculator importieren

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/verlauf" element={<Verlauf />} />
        <Route path="*" element={<Calculator />} />
      </Routes>
    </Router>
  );
}

export default App;
