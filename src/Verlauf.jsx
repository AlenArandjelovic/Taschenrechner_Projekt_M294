// src/Verlauf.jsx
import { useEffect, useState } from "react";

function Verlauf() {
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editExpression, setEditExpression] = useState("");
  const [editResult, setEditResult] = useState("");

  // Daten laden
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/Verlauf/documents");
        const data = await res.json();
        setEntries(data);
      } catch (error) {
        console.error("Fehler beim Laden des Verlaufs:", error);
      }
    };
    fetchData();
  }, []);

  // Bearbeiten starten
  const startEdit = (doc) => {
    setEditId(doc.id || doc._id); // falls dein Backend _id statt id liefert
    setEditExpression(doc.content.expression);
    setEditResult(doc.content.result);
  };

  // Änderungen speichern (PUT)
  const saveEdit = async () => {
    try {
      await fetch(`http://localhost:8080/Verlauf/documents/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: {
            expression: editExpression,
            result: editResult,
            createdAt: new Date().toISOString(),
          },
        }),
      });

      // Lokale Liste aktualisieren
      setEntries((prev) =>
        prev.map((doc) =>
          (doc.id || doc._id) === editId
            ? {
                ...doc,
                content: {
                  ...doc.content,
                  expression: editExpression,
                  result: editResult,
                  createdAt: new Date().toISOString(),
                },
              }
            : doc
        )
      );

      // Edit-Modus beenden
      setEditId(null);
      setEditExpression("");
      setEditResult("");
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  return (
    <div className="verlauf">
      <h2>Rechnungsverlauf</h2>
      <h1>oddddddddddd</h1>
      {entries.length === 0 ? (
        <p>Kein Verlauf vorhanden.</p>
      ) : (
        <ul>
          {entries.map((doc) => (
            <li key={doc.id || doc._id}>
              {editId === (doc.id || doc._id) ? (
                <>
                  <input
                    type="text"
                    value={editExpression}
                    onChange={(e) => setEditExpression(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editResult}
                    onChange={(e) => setEditResult(e.target.value)}
                  />
                  <button onClick={saveEdit}>Speichern</button>
                  <button onClick={() => setEditId(null)}>Abbrechen</button>
                </>
              ) : (
                <>
                  <strong>{doc.content.expression}</strong> = {doc.content.result}
                  <br />
                  <small>
                    {new Date(doc.content.createdAt).toLocaleString()}
                  </small>
                  <br />
                  <button onClick={() => startEdit(doc)}>Bearbeiten</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Verlauf;
