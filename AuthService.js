const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
class AuthService {
    static generateToken(user) {
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    }
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    static async comparePasswords(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}
module.exports = AuthService;