const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000;
const db = new sqlite3.Database(':memory:'); // Or use a file path to store the database persistently

// Create the table and seed the data
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS your_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');

  const data = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
  ];

  data.forEach((item) => {
    db.run('INSERT INTO your_table (name) VALUES (?)', [item.name]);
  });
});

// Define your routes and API endpoints
app.get('/api/data', (req, res) => {
  db.all('SELECT * FROM your_table', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
