const request = require('supertest');
const app = require('../app');
const sequelize = require('../database/connection');

beforeAll(async () => {
  await sequelize.sync();
});

describe('POST /register', () => {
  it('Debe registrar un usuario', async () => {
    const res = await request(app)
      .post('/register')
      .send({ name: 'John', email: 'john@example.com', password: '12345', role: 'admin' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });
});

afterAll(async () => {
  await sequelize.close();
});
