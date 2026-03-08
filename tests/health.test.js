const request = require('supertest');
const app = require('../src/app');

describe('Health Check Endpoint', () => {
  it('should return 200 and healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Server is healthy');
  });

  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/unknown-route-123');
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });
});
