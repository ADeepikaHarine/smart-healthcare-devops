require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 4000;

let appointments = []; // simple in-memory store for local dev

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/appointments', (req, res) => res.json(appointments));

app.post('/appointments', (req, res) => {
  const { patientName, time } = req.body;
  if(!patientName || !time) return res.status(400).json({ error: 'patientName and time required' });
  const id = appointments.length + 1;
  const appointment = { id, patientName, time, status: 'booked' };
  appointments.push(appointment);
  res.status(201).json(appointment);
});

app.delete('/appointments/:id', (req,res) => {
  const id = Number(req.params.id);
  appointments = appointments.filter(a => a.id !== id);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
} else {
  module.exports = app; // for tests
}
