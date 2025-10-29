const request = require('supertest');
const app = require('../index');

describe('Appointments API Tests', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('should create and fetch appointments', async () => {
    const payload = { patientName: 'Deepika', time: '2025-10-30T10:00' };
    const postRes = await request(app).post('/appointments').send(payload);
    expect(postRes.statusCode).toBe(201);

    const getRes = await request(app).get('/appointments');
    expect(Array.isArray(getRes.body)).toBe(true);
    expect(getRes.body.length).toBeGreaterThan(0);
  });
});
