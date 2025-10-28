const request = require('supertest');
const app = require('../index');

describe('appointments API', () => {
  it('GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
  it('POST & GET appointments', async () => {
    const payload = { patientName: 'A', time: '2025-10-30T10:00:00' };
    const post = await request(app).post('/appointments').send(payload);
    expect(post.statusCode).toBe(201);
    const get = await request(app).get('/appointments');
    expect(Array.isArray(get.body)).toBe(true);
    expect(get.body.length).toBeGreaterThanOrEqual(1);
  });
});
