const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Or use a file path to store the database persistently

function seedData() {
  db.serialize(() => {
    db.run('CREATE TABLE your_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');

    const data = [
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' },
    ];

    data.forEach((item) => {
      db.run('INSERT INTO your_table (name) VALUES (?)', [item.name]);
    });
  });
}

seedData();
