const request = require('supertest');

let token;

describe('API de Usuários', () => {
    beforeAll(async () => {
        const res = await request(app).post('/login').send({ username: 'admin', password: '1234' });
        token = res.body.token;
    });

    test('Deve autenticar e retornar um token JWT', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'admin', password: '1234' });
        
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    test('Deve retornar erro ao autenticar com credenciais inválidas', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'admin', password: 'wrongpassword' });
        
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });

    test('Deve adicionar um novo usuário', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'Teste User', email: 'teste@example.com' });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    test('Deve retornar erro ao tentar criar usuário sem nome ou e-mail', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: '' });
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('Deve retornar a lista de usuários (com autenticação)', async () => {
        const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});