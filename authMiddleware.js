const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
    const token = req.header('Authorization');
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