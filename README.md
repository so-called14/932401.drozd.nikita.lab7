# Лабораторная работа №7. Работа с базой данных (SQLite) и CRUD-операции.
**Вариант 11.** Тема «Библиотека книг» (наличие и авторы)  
**Цель:** изучить основы работы с реляционными БД, выполнить CRUD-операции и интегрировать их с Express.
## Описание проекта
REST API «Библиотека книг» на Node.js (Express) с базой данных SQLite. Реализованы операции создания, чтения, обновления (переключение available) и удаления записей о книгах, фильтрация по доступности и поиск по автору, а также контроль целостности данных.
## Сущность books
* id - Первичный ключ
* title - Название книги
* author - Автор
* isbn - Международный стандартный книжный номер
* available - Признак доступности книги
## Маршруты
* GET /api/books - список книг
* POST /api/books - добавление новой книги
* PATCH /api/books/:id - переключение статуса
* DELETE /api/books/:id - удаление книги
## Технологии
Node.js, Express.js, SQLite (better-sqlite3)
## Как запустить проект
1. Установите Node.js
2. Установите зависимости (пакеты):
   ```bash
   npm install
3. Запустите сервер:
   ```bash
   npm start
4. Для работы с базой данных
   ```bash
   curl.exe http://localhost:3000/api/books                                                                :: просмотр записей
   curl.exe -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d "@body.json"    :: добавление записи, предварительно задав параметры в body.json
   curl.exe -X PATCH http://localhost:3000/api/books/1                                                     :: просмотр записи с id=1
   curl.exe "http://localhost:3000/api/books?available=true/false"                                         :: просмотр записей с available=1/0
   curl.exe -X DELETE http://localhost:3000/api/books/1                                                    :: удаление записи по id=1
   curl.exe http://localhost:3000/api/books?author=Гайдар                                                  :: фильтрация по author=Гайдар
## Результаты
![Изначальный список книг в БД](<img width="1119" height="69" alt="image" src="https://github.com/user-attachments/assets/a3a849f9-b0c4-4482-9f39-cce8b963c923" />
)  

## Структура проекта
```
web lab 7/
├── body.json             # Шаблон для записи в БД
├── db.js                 # Открытие БД, создание таблицы, SQL-запросы, экспорт объектов-запросов
├── index.js              # Сервер на Express (маршруты и API)
├── library.db            # Файл базы данных
└── package.json          # Настройки проекта, зависимости и скрипты
