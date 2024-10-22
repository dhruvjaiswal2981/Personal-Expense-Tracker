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
            "type": "expense",
            "category": "Petrol",
            "amount": 2000,
            "date": "2024-10-01",
            "description": "Car"
        }

    - ![CHEESE!](images/Post%20Data%20Feed.PNG)

- GET /transactions
    - Retrieves all transactions.
    - ![CHEESE!](images/Get%20Retrive.PNG)

- GET /transactions/:id
    - Retrieves a transaction by ID.
    - ![CHEESE!](images/Get%20Retrive%20By%20Id.PNG)

- PUT /transactions/:id
    - Updates a transaction by ID.
    - Request body same as POST /transactions.
    - - ![CHEESE!](images/Put%20Data%20Update.PNG)

- DELETE /transactions/:id
    - Deletes a transaction by ID.
    - ![CHEESE!](images/Delete%20Transactions%20dlt.PNG)

- GET /summary
    - Retrieves a summary of transactions, including total income, total expenses, and balance.
    - Optional query params:
        - category: Filter by category.
        - startDate: Filter by start date.
        - endDate: Filter by end date.
    - ![CHEESE!](images/Get%20summary.PNG)