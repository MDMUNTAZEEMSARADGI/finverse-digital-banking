Users Table

CREATE TABLE users (
id UUID PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100),
email VARCHAR(255) UNIQUE NOT NULL,
phone VARCHAR(20) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role VARCHAR(20) DEFAULT 'customer',
kyc_status VARCHAR(20) DEFAULT 'pending',
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

User KYC Table
CREATE TABLE user_kyc (
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id),
pan_number VARCHAR(20),
aadhaar_number VARCHAR(20),
pan_document_url TEXT,
aadhaar_document_url TEXT,
address_proof_url TEXT,
status VARCHAR(20) DEFAULT 'pending',
verified_by UUID,
verified_at TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Accounts Table
CREATE TABLE accounts (
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id),
account_number VARCHAR(20) UNIQUE NOT NULL,
ifsc_code VARCHAR(20),
account_type VARCHAR(20),
balance NUMERIC(15,2) DEFAULT 0,
status VARCHAR(20) DEFAULT 'active',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Beneficiaries Table
CREATE TABLE beneficiaries (
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id),
beneficiary_name VARCHAR(255),
beneficiary_account_number VARCHAR(20),
beneficiary_ifsc VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Transactions Table
CREATE TABLE transactions (
id UUID PRIMARY KEY,
sender_account_id UUID REFERENCES accounts(id),
receiver_account_id UUID REFERENCES accounts(id),
amount NUMERIC(15,2),
transaction_type VARCHAR(50),
status VARCHAR(20),
reference_number VARCHAR(100) UNIQUE,
remarks TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Notifications Table
CREATE TABLE notifications (
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id),
title VARCHAR(255),
message TEXT,
is_read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Refresh Tokens Table
CREATE TABLE refresh_tokens (
id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id),
token TEXT NOT NULL,
expires_at TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Audit Logs Table
CREATE TABLE audit_logs (
id UUID PRIMARY KEY,
user_id UUID,
action VARCHAR(255),
entity_type VARCHAR(100),
entity_id UUID,
ip_address VARCHAR(100),
user_agent TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
