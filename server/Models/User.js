const db = require('../../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
  static async findOneByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await db.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in findOneByEmail:', error);
      throw error;
    }
  }

  static async create({ name, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const query = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email, created_at, updated_at';
      const result = await db.query(query, [name, email, hashedPassword]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }
}

module.exports = User;
