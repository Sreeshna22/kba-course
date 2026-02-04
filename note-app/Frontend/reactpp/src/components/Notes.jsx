import { useEffect, useState } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  // Fetch notes from backend
  useEffect(() => {
    fetch('http://localhost:5000/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  // Add new note
  const addNote = async () => {
    if (!text) return;
    const res = await fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
    setText('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notes App</h1>

      <div className="flex w-full max-w-md mb-6">
        <input 
          type="text" 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Enter note" 
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          onClick={addNote} 
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {notes.map(note => (
          <li 
            key={note._id} 
            className="bg-white p-3 rounded shadow hover:bg-gray-50 transition-colors"
          >
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
