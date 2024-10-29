import pkg from 'pg';
const { Pool } = pkg;


// Create a pool for database connections
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tictactoe',
  password: 'Maciejewski12',
  port: 5432, // Default PostgreSQL port
});

export async function createDatabaseSchema() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS Users (
                userId UUID PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                hashedPassword VARCHAR(255) NOT NULL,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(50) NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS Messages (
                messageId SERIAL PRIMARY KEY,              
                senderId INTEGER REFERENCES Users(userId),
                receiverId INTEGER REFERENCES Users(userId),
                content TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Database and tables created successfully.");
    } catch (error) {
        console.error("Error creating database schema:", error);
    } finally {
        client.release();
    }
}


// Export the pool and the schema creation function
export default { pool, createDatabaseSchema };