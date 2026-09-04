import { test, expect } from '../../fixtures/custom.fixture';

test.describe('API Testing - ReqRes Users Service', () => {
  const baseURL = 'https://reqres.in/api';

  test('GET /users - should return user list with valid schema', async ({ request }) => {
    const response = await request.get(`${baseURL}/users?page=2`);
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.page).toBe(2);
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
    
    // Data assertions
    const user = body.data[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
  });

  test('POST /users - should create a new user entry', async ({ request }) => {
    const payload = {
      name: 'Pablo Lavayen',
      job: 'Senior Data & API QA Engineer'
    };

    const response = await request.post(`${baseURL}/users`, {
      data: payload
    });

    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(body.name).toBe(payload.name);
    expect(body.job).toBe(payload.job);
    expect(body).toHaveProperty('id');
  });
});