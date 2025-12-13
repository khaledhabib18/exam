const request = require('supertest');
const app = require('../app');

describe('create exams and', () => {
    let token;
    const userData = {
        email: "test@gmail.com",
        password: "123456",
        name: "sama"
    }

    test('should sign up user', async () => {
        const response = await request(app)
            .post('/api/v1/signup')
            .send(userData);
        expect(response.statusCode).toBe(201);
    });

    test('should log in user and receive a token', async () => {
        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email: userData.email,
                password: userData.password
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        console.log(token);
    });


    test('should get exams list', async () => {
        const response = await request(app)
            .get('/api/v1/exams/exam')
            .set('Authorization', `Bearer ${token}`);
        console.log(response);
        // expect(response.statusCode).toBe(200);
        // expect(response.body).toHaveProperty('exams');
        // expect(Array.isArray(response.body.exams)).toBe(true);
    });
});