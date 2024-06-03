const app = require('../app')
const request = require('supertest')

let id;
let token;


test('POST /users should create one user', async () => {
    const user = {
        firstName: 'user',
        lastName: 'user',
        email: 'user@gmail.com',
        password: '1234'
    }
    const res = await request(app).post('/users').send(user)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.id).toBeDefined();
});


test('POST /users/login', async () => {
    const userLogin = {
      email: 'user@gmail.com',
      password: '1234',
    }
    const res = await request(app)
      .post('/users/login')
      .send(userLogin);
      token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(userLogin.email);
    expect(res.body.token).toBeDefined();
  });


  test('POST /users/login invalid credentials', async () => {
    const credentials = {
      email: 'incorrecto@gmail.com',
      password: 'incorrecto1234',
    }
    const res = await request(app)
      .post('/users/login').send(credentials)
    expect(res.status).toBe(401);
  });
  



  

  test('GET /users should return all users', async () => {
    const res = await request(app).get('/users')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});


test('PUT /users/:id should update one user', async () => {
    const userUpdated = {
        firstName: 'Update user',
    }
    const res = await request(app).put(`/users/${id}`)
    .send(userUpdated)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(userUpdated.firstName);
});


test('DELETE /users/:id should delete one user', async () => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});