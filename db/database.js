const path = require('path');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const databasePath = path.join(__dirname, '..', 'data', 'app.db');
let db;

function getDb() {
  if (!db) {
    db = new Database(databasePath);
  }

  return db;
}

function createTables(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('student', 'admin')),
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      student_type TEXT NOT NULL,
      category TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
}

function seedAdminUser(database) {
  const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || '';
  const adminName = (process.env.ADMIN_NAME || 'School Admin').trim();

  if (!adminEmail || !adminPassword) {
    console.warn('Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD missing.');
    return;
  }

  const existingAdmin = database
    .prepare('SELECT id FROM users WHERE email = ?')
    .get(adminEmail);

  if (existingAdmin) {
    return;
  }

  const passwordHash = bcrypt.hashSync(adminPassword, 12);
  const createdAt = new Date().toISOString();

  database
    .prepare(`
      INSERT INTO users (full_name, email, password_hash, role, created_at)
      VALUES (?, ?, ?, 'admin', ?)
    `)
    .run(adminName || 'School Admin', adminEmail, passwordHash, createdAt);
}

function initDatabase() {
  const database = getDb();

  database.pragma('foreign_keys = ON');
  createTables(database);
  seedAdminUser(database);
}

module.exports = {
  initDatabase,
  getDb
};
