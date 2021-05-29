require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
const supertest = require('supertest');
const app = require('../app');
const db = require('../db');
console.log('📣', process.env.PORT);

/* Create testing server */
let api;
beforeAll(() => {
  api = supertest(app);
});

/* Remove any entries named Testing before each test */
beforeEach(async () => {
  await db.query('DELETE FROM restaurants WHERE name = $1', ['Testing']);
});

/* GET tests */
describe('GET requests to /api/restaurants', () => {
  test('returns successful JSON response', async () => {
    const results = await api
      .get('/api/restaurants')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(JSON.parse(results.text)).toHaveLength(5);
  });

  test('returns single restaurant from api/restaurants/2', async () => {
    const results = await api
      .get('/api/restaurants/2')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(results.text).toMatch(/\"id\":\"2\"/);
  });
});

/* POST tests */
describe('POST requests to /api/restaurants', () => {
  test('successfully adds an entry', async () => {
    await api
      .post('/api/restaurants')
      .send({ name: 'Testing', location: 'Fakeland', price_range: 5 })
      .expect('Content-Type', /json/)
      .expect(201);

    const results = await api.get('/api/restaurants');
    expect(JSON.parse(results.text)).toHaveLength(6);
  });

  test('successfully prevents price_range <1 and >5', async () => {
    await api
      .post('/api/restaurants')
      .send({ name: 'Testing', location: 'Fakeland', price_range: 6 })
      .expect(400);

    await api
      .post('/api/restaurants')
      .send({ name: 'Testing', location: 'Fakeland', price_range: 0 })
      .expect(400);
  });

  test('successfully prevents incomplete entries', async () => {
    await api
      .post('/api/restaurants')
      .send({ name: 'Testing', price_range: 5 })
      .expect(400);

    await api
      .post('/api/restaurants')
      .send({ location: 'Fakeland', price_range: 5 })
      .expect(400);

    await api.post('/api/restaurants').expect(400);
  });
});

/* PUT tests */
describe('PUT requests to /api/restaurants', () => {
  test('successfully updates an entry', async () => {
    await api
      .put('/api/restaurants/2')
      .send({ name: 'PostSuccess' })
      .expect(/PostSuccess/);
  });
});

/* DELETE tests */
describe('DELETE requests to /api/restaurants/:id', () => {
  test('successfully deletes an entry', async () => {
    // First, we insert a new test entry
    const setup = await api
      .post('/api/restaurants')
      .send({ name: 'Testing', location: 'Fakeland', price_range: 5 });
    const testEntry = JSON.parse(setup.text);
    const id = testEntry[0].id;

    // Then, we delete that entry
    await api.delete('/api/restaurants/' + id).expect(200);

    // Finally, we check to see if the database-table size is correct
    const results = await api.get('/api/restaurants');
    expect(JSON.parse(results.text)).toHaveLength(5);
  });
});

/* Cleanup */
afterAll(async () => {
  await db.query('UPDATE restaurants SET name = $1 WHERE id = $2', ['KFC', 2]);
  await db.query('DELETE FROM restaurants WHERE name = $1', ['Testing']);
});
