// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './Navigation'; // Navigation eingebunden
import Verlauf from './Verlauf';



// ===== Calculator-Komponente =====
function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => setInput(input + value);

  const safeEval = (expr) => {
    if (/[^0-9+\-*/().\s]/.test(expr)) throw new Error("Ungültige Eingabe");
    return new Function("return " + expr)();
  };

  const handleEqual = async () => {
    try {
      const calculatedResult = safeEval(input);
      setResult(calculatedResult);

      await fetch("http://localhost:8080/Verlauf/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: {
            expression: input,
            result: calculatedResult,
            createdAt: new Date().toISOString()
          }
        })
      });
    } catch (error) {
      console.error("Fehler bei Berechnung oder Speicherung:", error);
      setResult("Fehler");
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleDeleteAll = async () => {
    try {
      const res = await fetch("http://localhost:8080/Verlauf/documents");
      const docs = await res.json();

      for (const doc of docs) {
        await fetch(`http://localhost:8080/Verlauf/documents/${doc.id}`, {
          method: "DELETE"
        });
      }

      alert("Verlauf wurde gelöscht!");
    } catch (error) {
      console.error("Fehler beim Löschen des Verlaufs:", error);
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <h2>{input || '0'}</h2>
      </div>
      <div className="result">
        <h3>{result !== '' ? result : ''}</h3>
      </div>
      <div className="buttons">
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>

        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>

        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>

        <button onClick={handleClear}>C</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={handleEqual}>=</button>
        <button onClick={() => handleClick('/')}>/</button>
      </div>
      <button onClick={handleDeleteAll} className="delete-button">
        Verlauf löschen
      </button>
    </div>
  );
}

// ===== Verlauf-Komponente =====


// ===== App mit Routing =====
function App() {
  return (
    <Router>
      <Navigation /> {/* Navigation eingebunden */}
      <Routes>
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/verlauf" element={<Verlauf />} />
        <Route path="*" element={<Calculator />} />
      </Routes>
    </Router>
  );
}

export default App;
