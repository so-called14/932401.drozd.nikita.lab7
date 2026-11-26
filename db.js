const Database = require('better-sqlite3');

const db = new Database('library.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT NOT NULL UNIQUE,
    available INTEGER NOT NULL DEFAULT 1 CHECK (available IN (0, 1))
  )
`);

const getAll = db.prepare('SELECT * FROM books ORDER BY id');
const getById = db.prepare('SELECT * FROM books WHERE id = ?');
const searchByAuthor = db.prepare(`SELECT * FROM books WHERE author LIKE ? ORDER BY id`);
const getByAvailable = db.prepare(` SELECT * FROM books WHERE available = ? ORDER BY id`);

const createBook = db.prepare(`
  INSERT INTO books (title, author, isbn, available)
  VALUES (@title, @author, @isbn, @available)
`);

const toggleAvailable = db.prepare(`
  UPDATE books
  SET available = CASE WHEN available = 1 THEN 0 ELSE 1 END
  WHERE id = ?
`);

const deleteBook = db.prepare('DELETE FROM books WHERE id = ?');

module.exports = {
  getAll,
  getById,
  searchByAuthor,
  getByAvailable,
  createBook,
  toggleAvailable,
  deleteBook,
};
