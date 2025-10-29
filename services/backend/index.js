require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// Temporary in-memory appointments data
let appointments = [];

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend running successfully' });
});

// Get all appointments
app.get('/appointments', (req, res) => {
  res.json(appointments);
});

// Book new appointment
app.post('/appointments', (req, res) => {
  const { patientName, time } = req.body;
  if (!patientName || !time) {
    return res.status(400).json({ error: 'Patient name and time are required' });
  }

  const id = appointments.length + 1;
  const appointment = { id, patientName, time, status: 'booked' };
  appointments.push(appointment);

  res.status(201).json(appointment);
});

// Cancel appointment
app.delete('/appointments/:id', (req, res) => {
  const id = Number(req.params.id);
  appointments = appointments.filter((a) => a.id !== id);
  res.status(204).send();
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
} else {
  module.exports = app; // For testing
}
