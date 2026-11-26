const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.get('/api/books', (req, res) => {
  const { available, author } = req.query;

  if (available !== undefined && available !== 'true' && available !== 'false') {
    return res.status(400).json({ error: 'Параметр available должен быть true или false' });
  }

  let books;
  if (available === 'true') {
    books = db.getByAvailable.all(1);
  } 
  else if (available === 'false') {
    books = db.getByAvailable.all(0);
  } 
  else if (author) {
    books = db.searchByAuthor.all(`%${author}%`);
  } 
  else {
    books = db.getAll.all();
  }

  res.json(books);
});

app.use(express.json());
app.post('/api/books', (req, res) => {
  const { title, author, isbn, available = true } = req.body;

  if (
    typeof title !== 'string' || !title.trim() ||
    typeof author !== 'string' || !author.trim() ||
    typeof isbn !== 'string' || !isbn.trim()
  ) {
    return res.status(400).json({ error: 'Поля title, author и isbn обязательны и должны быть строками' });
  }

  if (typeof available !== 'boolean') {
    return res.status(400).json({ error: 'Поле available должно быть boolean' });
  }

  try {
    const result = db.createBook.run({
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      available: available ? 1 : 0,
    });

    const book = db.getById.get(result.lastInsertRowid);
    res.status(201).json(book);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Книга с таким ISBN уже существует' });
    }

    console.error(error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.patch('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Некорректный id' });
  }

  const result = db.toggleAvailable.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  res.json(db.getById.get(id));
});

app.delete('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Некорректный id' });
  }

  const result = db.deleteBook.run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
