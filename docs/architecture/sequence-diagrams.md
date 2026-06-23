# Sequence Diagrams

## Login Flow

```text
Client
  |
  | Login Request
  ▼
API Gateway
  |
  ▼
Auth Service
  |
  | Validate User
  ▼
PostgreSQL
  |
  | User Data
  ▼
Auth Service
  |
  | Generate JWT
  ▼
Client
```

---

## Transfer Money Flow

```text
User
  |
  | Transfer Money
  ▼
API Gateway
  |
  ▼
Transaction Service
  |
  | Validate Accounts
  ▼
Account Service
  |
  | Debit Sender
  | Credit Receiver
  ▼
PostgreSQL
  |
  | Save Transaction
  ▼
Notification Service
  |
  ▼
User
```
