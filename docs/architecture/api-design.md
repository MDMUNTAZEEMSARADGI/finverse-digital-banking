# API Design

## Authentication

POST /api/auth/register

Request:

{
"firstName": "John",
"lastName": "Doe",
"email": "john@gmail.com",
"password": "Password123"
}

Response:

{
"success": true,
"message": "User Registered"
}

---

POST /api/auth/login

POST /api/auth/logout

POST /api/auth/refresh-token

---

## User APIs

GET /api/users/profile

PUT /api/users/profile

POST /api/users/kyc

---

## Account APIs

POST /api/accounts

GET /api/accounts

GET /api/accounts/:id

---

## Beneficiary APIs

POST /api/beneficiaries

GET /api/beneficiaries

DELETE /api/beneficiaries/:id

---

## Transaction APIs

POST /api/transactions/transfer

GET /api/transactions/history

GET /api/transactions/:id

---

## Notification APIs

GET /api/notifications

PUT /api/notifications/:id/read
