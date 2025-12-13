const request = require('supertest');
const app = require('../app');


describe('create exams and', () => {
    let token;
    let examId;
    const adminData = {
        name: "Khaled Habib",
        email: "admin@kh.com",
        password: "admin"
    };
    const examData = {
        title: "Example Exam",
        description: "mesh nodal exam",
        duration: "30",
        start_time: "2025-12-10 23:30:00 +00:00",
        end_time: "2025-12-10 23:59:00 +00:00"
    };

    const questionData = {
        "question_text": "What color is the sky on a clear day?",
        "question_type": "multiple_choice",
        "correct_answer_label": "B",
        "options": [
            { "label": "A", "text": "red" },
            { "label": "B", "text": "blue" },
            { "label": "C", "text": "green" },
            { "label": "D", "text": "yellow" }
        ]
    };
    test('should create admin user if not exists', async () => {
        const response = await request(app)
            .post('/api/v1/admin')
            .send(adminData);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Admin user created successfully");
    });
    test('Should sign the admin user in and receive a token', async () => {
        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email: adminData.email,
                password: adminData.password
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('Should Create an exam', async () => {
        const response = await request(app)
            .post('/api/v1/exams/exam')
            .set('Authorization', `Bearer ${token}`)
            .send(examData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('exam');
        expect(response.body.exam).toHaveProperty('id');
        examId = response.body.exam.id;
        console.log(examId);
    });

    test('should create exam questions', async () => {
        const response = await request(app)
            .post(`/api/v1/questions/question`)
            .set('Authorization', `Bearer ${token}`)
            .set('examId', examId)
            .send(questionData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('question');
        expect(response.body.question).toHaveProperty('id');
    });
});