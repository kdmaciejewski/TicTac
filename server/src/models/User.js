// models/User.js
import pool from "../db.js";

class User {
  constructor(userId, username, hashedPassword, firstName, lastName) {
    this.userId = userId;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static async create({ userId, username, hashedPassword, firstName, lastName }) {
    const result = await pool.query(
      "INSERT INTO Users (userId, username, hashedPassword, firstName, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, username, hashedPassword, firstName, lastName]
    );
    return new User(result.rows[0]);
  }

  static async findByUsername(username) {
    const result = await pool.query("SELECT * FROM Users WHERE username = $1", [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      return new User(user.userId, user.username, user.hashedPassword, user.firstName, user.lastName);
    }
    return null;
  }

  // Add additional methods like update or delete as needed
}

export default User;
