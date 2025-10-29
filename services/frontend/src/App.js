import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    const res = await fetch('http://localhost:4000/appointments');
    const data = await res.json();
    setAppointments(data);
  }

  async function book() {
    if (!name || !time) {
      setMessage('⚠️ Please enter both name and time!');
      return;
    }
    const res = await fetch('http://localhost:4000/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientName: name, time })
    });
    if (res.ok) {
      setMessage('✅ Appointment booked successfully!');
      setName('');
      setTime('');
      fetchAppointments();
    } else {
      setMessage('❌ Booking failed!');
    }
    setTimeout(() => setMessage(''), 3000);
  }

  async function cancel(id) {
    await fetch(`http://localhost:4000/appointments/${id}`, { method: 'DELETE' });
    setAppointments(appointments.filter(a => a.id !== id));
  }

  const filtered = appointments.filter(a =>
    a.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="title">Smart Healthcare - Appointments</h1>

      {message && <div className="alert">{message}</div>}

      <div className="form-container">
        <input
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={book}>Book Appointment</button>
      </div>

      <div className="search-container">
        <input
          placeholder="🔍 Search by patient name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h3 className="count">Total Appointments: {filtered.length}</h3>

      <div className="appointment-grid">
        {filtered.map((a) => (
          <div key={a.id} className="appointment-card">
            <h4>{a.patientName}</h4>
            <p><strong>Time:</strong> {a.time}</p>
            <p className="status booked">{a.status}</p>
            <button className="cancel-btn" onClick={() => cancel(a.id)}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
