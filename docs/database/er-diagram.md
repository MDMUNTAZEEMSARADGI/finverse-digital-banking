Users
|
|----< Accounts
|
|----< Beneficiaries
|
|----< Notifications
|
|----< UserKYC
|
|----< AuditLogs

Accounts
|
|----< Transactions >----|
|
Accounts

Database Relationships
users (1) -------- (N) accounts

users (1) -------- (N) beneficiaries

users (1) -------- (1) user_kyc

users (1) -------- (N) notifications

accounts (1) ----- (N) transactions

accounts (1) ----- (N) transactions

Production Indexes
CREATE INDEX idx_user_email ON users(email);

CREATE INDEX idx_account_number
ON accounts(account_number);

CREATE INDEX idx_transaction_reference
ON transactions(reference_number);

CREATE INDEX idx_transaction_created_at
ON transactions(created_at);

CREATE INDEX idx_notification_user
ON notifications(user_id);
