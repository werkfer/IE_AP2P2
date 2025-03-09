const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


let users = [];
let idCounter = 1;

// Middleware de autenticação
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    //const token = 'pos_ulbra';
    if (!token) return res.status(401).json({
        error: 'Acesso negado!'
    });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token inválido!' });
    }
};


// Rota de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username !== 'admin' || password !== '1234') {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Rota para obter todos os usuários (protegida)
app.get('/users', authenticateToken, (req, res) => {
    res.json(users);
});

// Rota para adicionar um novo usuário
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
    }
    const newUser = { id: idCounter++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Rota para atualizar um usuário pelo ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    
    res.json(user);
});

// Rota para deletar um usuário pelo ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(user => user.id !== parseInt(id));
    res.status(204).send();
});