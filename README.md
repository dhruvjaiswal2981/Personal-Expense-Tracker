# Personal Expense Tracker API

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/dhruvjaiswal2981/Personal-Expense-Tracker.git
   cd expense-tracker

2. Install dependencies:
    ```bash
    npm install

2. Start the server:
    ```bash
    node app.js

### API Endpoints

- POST /transactions
    - Adds a new transaction (income or expense).
    - Request body :- json 
        {
            "type": "income",
            "category": "salary",
            "amount": 5000,
            "date": "2024-10-01",
            "description": "October Salary"
        }

- GET /transactions
    - Retrieves all transactions.

- GET /transactions/:id
    - Retrieves a transaction by ID.

- PUT /transactions/:id
    - Updates a transaction by ID.
    - Request body same as POST /transactions.

- DELETE /transactions/:id
    - Deletes a transaction by ID.

- GET /summary
    - Retrieves a summary of transactions, including total income, total expenses, and balance.
    - Optional query params:
        - category: Filter by category.
        - startDate: Filter by start date.
        - endDate: Filter by end date.