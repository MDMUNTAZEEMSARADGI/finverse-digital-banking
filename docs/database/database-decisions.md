# Database Decisions

## PostgreSQL

Used for:

- Users
- Accounts
- Transactions
- Beneficiaries
- KYC

Reason:
Banking transactions require ACID compliance.

---

## MongoDB

Used for:

- Logs
- Notifications
- Email Queue

Reason:
Flexible schema and high write throughput.
