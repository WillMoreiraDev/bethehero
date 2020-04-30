const request = require('supertest');
const app = require('../../src/app');
const connect = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connect.migrate.rollback();
    await connect.migrate.latest();
  })

  afterAll(async () => {
    await connect.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "ONG TESTE",
        email: "contato@ongteste.com",
        whatsapp: "35992499289",
        city: "Teste",
        uf: "TE"
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });
});