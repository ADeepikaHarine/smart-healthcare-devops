import React, {useState, useEffect} from 'react';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/appointments')
      .then(r => r.json())
      .then(setAppointments);
  }, []);

  async function book() {
    const res = await fetch('http://localhost:4000/appointments', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ patientName: name, time })
    });
    if (res.ok) {
      setName('');
      setTime('');
      const list = await (await fetch('http://localhost:4000/appointments')).json();
      setAppointments(list);
    } else {
      alert('Failed to book');
    }
  }

  async function cancel(id) {
    await fetch(`http://localhost:4000/appointments/${id}`, { method: 'DELETE' });
    setAppointments(appointments.filter(a => a.id !== id));
  }

  return (
    <div style={{padding:20}}>
      <h1>Smart Healthcare - Appointments</h1>
      <div>
        <input placeholder="Patient name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input placeholder="Time (ISO)" value={time} onChange={(e)=>setTime(e.target.value)} />
        <button onClick={book}>Book</button>
      </div>
      <ul className="appointment-list">
        {appointments.map(a => (
          <li key={a.id}>
            {a.patientName} - {a.time} - {a.status}
            <button onClick={() => cancel(a.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
