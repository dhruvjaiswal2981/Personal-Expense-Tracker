const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// Add a transaction
app.post('/transactions', (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const query = `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [type, category, amount, date, description], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Get all transactions
app.get('/transactions', (req, res) => {
  db.all(`SELECT * FROM transactions`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get a transaction by ID
app.get('/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(row);
  });
});

// Update a transaction
app.put('/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;
  const query = `
    UPDATE transactions
    SET type = ?, category = ?, amount = ?, date = ?, description = ?
    WHERE id = ?
  `;
  db.run(query, [type, category, amount, date, description, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction updated' });
  });
});

// Delete a transaction
app.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted' });
  });
});


// GET /summary - Retrieves a summary of transactions
app.get('/summary', (req, res) => {
    const { category, startDate, endDate } = req.query;
  
    
    let query = `SELECT 
                    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
                    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpenses,
                    (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS balance
                 FROM transactions WHERE 1=1`;
  
    
    const params = [];
    
    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }
    
    if (startDate) {
      query += ` AND date >= ?`;
      params.push(startDate);
    }
  
    if (endDate) {
      query += ` AND date <= ?`;
      params.push(endDate);
    }
  
    // Execute the query with the filters applied
    db.get(query, params, (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
  
      // Return the summary data
      res.json({
        totalIncome: row.totalIncome || 0,
        totalExpenses: row.totalExpenses || 0,
        balance: row.balance || 0
      });
    });
});
  

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
