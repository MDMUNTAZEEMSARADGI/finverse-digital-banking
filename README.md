# 💳 FinVerse — Digital Banking & FinTech Platform

FinVerse is a **microservices-based digital banking platform** designed to simulate real-world banking operations such as user authentication, KYC verification, bank account management, deposits, withdrawals, money transfers, transaction history, notifications, and administrative KYC approval.

The project is built with a modern **React + Node.js + TypeScript + PostgreSQL** stack and follows a modular microservices architecture with an **API Gateway, Redis, Kafka, Docker, and role-based access control**.

---

## 🚀 Project Overview

FinVerse provides two primary experiences:

### 👤 Customer

Customers can:

* Register and log in securely
* Manage their profile
* Submit KYC information
* View KYC verification status
* Open bank accounts
* View account balances
* Deposit money
* Withdraw money
* Transfer money between accounts
* View transaction history
* View transaction details
* View account details
* Receive notifications
* Access statements

### 👨‍💼 Administrator

Administrators can:

* Log in using an admin account
* Access the admin dashboard
* View submitted KYC applications
* Review customer KYC information
* Approve KYC applications
* Reject KYC applications
* Manage the verification workflow
* Monitor banking-related information

---

# 🏗️ System Architecture

FinVerse follows a **microservices architecture** where individual business domains are separated into independent backend services.

```text
                         ┌─────────────────────┐
                         │      Frontend       │
                         │   React + Vite      │
                         └──────────┬──────────┘
                                    │
                                    │ HTTP / HTTPS
                                    ▼
                         ┌─────────────────────┐
                         │    API Gateway      │
                         │      Nginx           │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌────────────┐       ┌────────────┐       ┌────────────┐
       │    Auth    │       │    KYC     │       │  Account   │
       │  Service   │       │  Service   │       │  Service   │
       └─────┬──────┘       └─────┬──────┘       └─────┬──────┘
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   PostgreSQL    │
                         └─────────────────┘

       ┌────────────────┐             ┌────────────────┐
       │  Transaction   │             │ Notification   │
       │    Service     │             │    Service     │
       └───────┬────────┘             └───────┬────────┘
               │                              │
               ▼                              ▼
        ┌──────────────┐              ┌──────────────┐
        │ PostgreSQL   │              │    Redis     │
        └──────────────┘              └──────────────┘
                                              │
                                              ▼
                                      ┌──────────────┐
                                      │    Kafka     │
                                      └──────────────┘
```

---

# 📁 Project Structure

```text
Finverse/
│
├── backend/
│   │
│   ├── account-service/
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── package.json
│   │   └── ...
│   │
│   ├── api-gateway/
│   │   ├── nginx/
│   │   └── ...
│   │
│   ├── auth-service/
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── package.json
│   │   └── ...
│   │
│   ├── kyc-service/
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── package.json
│   │   └── ...
│   │
│   ├── notification-service/
│   │   ├── src/
│   │   └── ...
│   │
│   └── transaction-service/
│       ├── src/
│       ├── prisma/
│       ├── package.json
│       └── ...
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── features/
│   │   ├── layout/
│   │   ├── routes/
│   │   └── store/
│   ├── package.json
│   └── ...
│
├── docs/
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# 🧩 Backend Microservices

## 🔐 Auth Service

Responsible for authentication and authorization.

### Responsibilities

* User registration
* User login
* Password hashing
* JWT access tokens
* Refresh tokens
* Role-based authentication
* Customer/Admin identification
* Protected profile endpoint

Example roles:

```text
CUSTOMER
ADMIN
```

Authentication flow:

```text
User
 │
 ▼
Login
 │
 ▼
Auth Service
 │
 ├── Validate credentials
 ├── Verify password
 └── Generate JWT
       │
       ▼
    Frontend
       │
       ▼
 Authorization header
       │
       ▼
 Bearer <token>
```

---

# 🪪 KYC Service

The KYC service manages customer identity verification.

### Customer operations

```text
Submit KYC
     │
     ▼
PENDING
     │
     ├───────────────┐
     ▼               ▼
 APPROVED         REJECTED
```

### Admin operations

Administrators can:

* View all KYC applications
* Review submitted information
* Approve KYC
* Reject KYC
* Provide rejection reasons

Example endpoint structure:

```text
GET    /api/kyc/admin
PATCH  /api/kyc/admin/:id/approve
PATCH  /api/kyc/admin/:id/reject
```

KYC states:

```text
PENDING
APPROVED
REJECTED
```

---

# 🏦 Account Service

The Account Service manages customer bank accounts.

### Responsibilities

* Open bank accounts
* Retrieve customer accounts
* Retrieve account details
* Maintain account balance
* Maintain account status
* Generate account information

Example account:

```text
Account Number
IFSC Code
Account Type
Balance
Status
Created At
Updated At
```

Supported account state includes:

```text
ACTIVE
FROZEN
```

---

# 💰 Transaction Service

The Transaction Service handles financial transactions.

Supported transaction operations:

```text
DEPOSIT
WITHDRAW
TRANSFER
```

### Deposit

```json
{
  "accountId": "account-id",
  "amount": 1000
}
```

### Withdrawal

```json
{
  "accountId": "account-id",
  "amount": 300
}
```

### Transfer

```json
{
  "fromAccountId": "sender-account-id",
  "toAccountId": "receiver-account-id",
  "amount": 500
}
```

Transactions maintain information such as:

```text
Transaction ID
Account ID
Receiver Account ID
Amount
Transaction Type
Status
Reference
Created At
```

Transaction statuses include:

```text
SUCCESS
FAILED
PENDING
```

---

# 🔔 Notification Service

The Notification Service is responsible for handling application notifications.

It is designed to work with asynchronous communication infrastructure such as **Kafka** and caching/data-access infrastructure such as **Redis**.

Potential events include:

```text
Transaction Completed
Transaction Failed
KYC Approved
KYC Rejected
Account Created
```

---

# 🌐 API Gateway

FinVerse uses **Nginx as an API Gateway**.

Instead of allowing the frontend to communicate directly with every microservice:

```text
Frontend
   │
   ├── Auth Service
   ├── Account Service
   ├── KYC Service
   └── Transaction Service
```

the frontend communicates through:

```text
Frontend
   │
   ▼
API Gateway
   │
   ├── Auth Service
   ├── Account Service
   ├── KYC Service
   ├── Transaction Service
   └── Notification Service
```

This provides a single entry point for the frontend and simplifies service routing.

---

# 🗄️ Databases & Infrastructure

FinVerse uses multiple infrastructure technologies for different responsibilities.

## PostgreSQL

PostgreSQL is the primary relational database.

It stores structured banking data such as:

```text
Users
Accounts
KYC
Transactions
```

PostgreSQL is used where strong consistency and relational relationships are important.

---

## MongoDB

MongoDB is included as part of the infrastructure for document-oriented data and future extensibility.

It can be useful for data such as:

```text
Notification documents
Activity logs
Audit information
Unstructured application data
```

---

## Redis

Redis provides an in-memory data layer.

It can be used for:

* Caching
* Session-related data
* Temporary data
* Rate limiting
* Frequently accessed information
* Short-lived application state

Because Redis stores data in memory, it is significantly faster than repeatedly querying a relational database for suitable cacheable data.

---

## Apache Kafka

Kafka provides asynchronous event-driven communication.

Instead of tightly coupling services:

```text
Transaction Service
       │
       ▼
Notification Service
```

services can communicate through events:

```text
Transaction Service
       │
       ▼
     Kafka
       │
       ▼
Notification Service
```

For example:

```text
Transaction Completed
        │
        ▼
 transaction.completed
        │
        ▼
       Kafka
        │
        ▼
Notification Service
        │
        ▼
Create Notification
```

This allows services to remain more loosely coupled and makes the architecture easier to extend.

---

# 🐳 Docker

Docker is used to containerize the application's infrastructure.

The local development environment includes:

```text
PostgreSQL
MongoDB
Redis
Kafka
API Gateway
```

These services are orchestrated using:

```text
docker-compose.yml
```

Start the infrastructure with:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

Stop the infrastructure:

```bash
docker compose down
```

---

# 🖥️ Frontend Architecture

The frontend is built using:

* React
* TypeScript
* Vite
* Redux Toolkit
* React Router
* Tailwind CSS
* Axios
* React Hook Form
* Zod
* React Hot Toast
* Lucide React

The application is organized by features.

```text
frontend/src/
│
├── api/
│
├── components/
│
├── features/
│   ├── account/
│   ├── admin/
│   ├── auth/
│   ├── dashboard/
│   ├── kyc/
│   ├── notification/
│   ├── statements/
│   └── transaction/
│
├── layout/
│
├── routes/
│
└── store/
```

---

# 🔄 Authentication Flow

```text
                 ┌──────────────┐
                 │    User      │
                 └──────┬───────┘
                        │
                        ▼
                  Login Form
                        │
                        ▼
                 Auth Service
                        │
                  Validate User
                        │
                        ▼
                 JWT Tokens
                        │
                        ▼
                  Redux Store
                        │
                        ▼
             Authenticated Requests
                        │
                        ▼
                API Gateway
                        │
                        ▼
               Protected Service
```

The backend validates the JWT using authentication middleware.

Authorization is then handled using role-based access control.

Example:

```text
authenticate()
      │
      ▼
Is token valid?
      │
      ▼
authorize(ADMIN)
      │
      ▼
Is user ADMIN?
      │
 ┌────┴────┐
 YES       NO
 │          │
 ▼          ▼
Allow      403
```

---

# 👨‍💼 Admin KYC Workflow

```text
Customer
   │
   ▼
Submit KYC
   │
   ▼
KYC Service
   │
   ▼
PENDING
   │
   ▼
Admin Dashboard
   │
   ├───────────────┐
   │               │
   ▼               ▼
Approve          Reject
   │               │
   ▼               ▼
APPROVED         REJECTED
```

The admin dashboard can display:

* Customer ID
* KYC ID
* Aadhaar information
* PAN information
* Address
* KYC status
* Submission date
* Approval/rejection actions

---

# 💸 Transaction Flow

## Deposit

```text
Customer
   │
   ▼
Frontend
   │
   ▼
API Gateway
   │
   ▼
Transaction Service
   │
   ▼
Validate Account
   │
   ▼
Update Balance
   │
   ▼
Create Transaction
   │
   ▼
SUCCESS
```

## Transfer

```text
Customer
   │
   ▼
Transfer Request
   │
   ▼
API Gateway
   │
   ▼
Transaction Service
   │
   ├── Validate Sender
   ├── Validate Receiver
   ├── Validate Balance
   ├── Debit Sender
   ├── Credit Receiver
   └── Create Transaction
            │
            ▼
         SUCCESS
```

---

# 🔒 Security

FinVerse implements several security concepts:

* JWT authentication
* Password hashing with bcrypt
* Role-based authorization
* Protected API routes
* Environment variables for secrets
* Authentication middleware
* Authorization middleware
* Separation of services
* Server-side validation

Sensitive configuration should be stored in environment variables.

Example:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
REDIS_URL=your_redis_url
KAFKA_BROKER=your_kafka_broker
```

> **Never commit `.env` files or production credentials to GitHub.**

---

# ⚙️ Local Development

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git
* Docker Desktop
* PostgreSQL knowledge
* VS Code or another code editor

---

# 📥 Clone Repository

```bash
git clone <your-github-repository-url>
cd Finverse
```

---

# 🐳 Start Infrastructure

From the project root:

```bash
docker compose up -d
```

Verify:

```bash
docker ps
```

You should see infrastructure containers such as:

```text
finverse-postgres
finverse-mongodb
finverse-redis
finverse-kafka
finverse-api-gateway
```

---

# 🔐 Environment Variables

Environment variables are intentionally excluded from the repository.

Create the appropriate `.env` files for each service based on your local configuration.

Example:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/finverse
JWT_SECRET=your-secret
```

Do not use these example values in a real production environment.

---

# ▶️ Running Backend Services

Each microservice is maintained independently.

Navigate into the relevant service:

```bash
cd backend/auth-service
```

Install dependencies:

```bash
npm install
```

Run the service using the script defined in its `package.json`.

Repeat for the required backend services:

```text
auth-service
account-service
kyc-service
transaction-service
notification-service
```

---

# ▶️ Running Frontend

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server using the project's configured npm script.

The frontend communicates with the API Gateway rather than directly with individual microservices.

---

# 🧪 API Architecture

The API is organized around business domains.

```text
/api
│
├── /auth
│
├── /users
│
├── /accounts
│
├── /transactions
│
├── /kyc
│
└── /notifications
```

The API Gateway routes these requests to their respective microservices.

---

# 📊 Example API Operations

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### User

```text
GET /api/users/profile
```

### KYC

```text
POST  /api/kyc
GET   /api/kyc/me
PUT   /api/kyc
GET   /api/kyc/admin
PATCH /api/kyc/admin/:id/approve
PATCH /api/kyc/admin/:id/reject
```

### Accounts

```text
GET  /api/accounts
GET  /api/accounts/:id
POST /api/accounts
```

### Transactions

```text
GET  /api/transactions
POST /api/transactions/deposit
POST /api/transactions/withdraw
POST /api/transactions/transfer
GET  /api/transactions/:id
```

> Exact endpoints may vary according to the implementation of each service.

---

# 🧰 Technology Stack

| Category          | Technology      |
| ----------------- | --------------- |
| Frontend          | React           |
| Language          | TypeScript      |
| Build Tool        | Vite            |
| State Management  | Redux Toolkit   |
| Routing           | React Router    |
| Styling           | Tailwind CSS    |
| HTTP Client       | Axios           |
| Forms             | React Hook Form |
| Validation        | Zod             |
| Icons             | Lucide React    |
| Backend           | Node.js         |
| API Framework     | Express.js      |
| Authentication    | JWT             |
| Password Security | bcrypt          |
| Database          | PostgreSQL      |
| ORM               | Prisma          |
| Document Database | MongoDB         |
| Cache             | Redis           |
| Messaging         | Apache Kafka    |
| API Gateway       | Nginx           |
| Containerization  | Docker          |
| Infrastructure    | Docker Compose  |
| API Testing       | Postman         |
| Version Control   | Git / GitHub    |

---

# 🧠 Why Microservices?

Instead of building one large backend:

```text
                Monolithic Backend

                  ┌───────────────┐
                  │               │
                  │ Auth          │
                  │ Accounts      │
                  │ KYC           │
                  │ Transactions  │
                  │ Notifications│
                  │               │
                  └───────────────┘
```

FinVerse separates business domains:

```text
Auth Service
Account Service
KYC Service
Transaction Service
Notification Service
```

This provides:

### Independent development

Each service can be developed and maintained independently.

### Independent scaling

A heavily used transaction service can be scaled independently of the KYC service.

### Fault isolation

A failure in one service does not necessarily require the entire backend to be deployed as one application.

### Clear business boundaries

Each service owns a specific business responsibility.

### Easier future expansion

Additional services can be introduced without restructuring the entire backend.

---

# 🌐 Deployment Architecture

The project is designed to be deployable using cloud infrastructure.

A production deployment can follow this architecture:

```text
                       Internet
                           │
                           ▼
                    ┌─────────────┐
                    │  Frontend   │
                    │ React/Vite  │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ API Gateway │
                    │    Nginx    │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
       Auth             Account            KYC
      Service           Service          Service
          │                │                │
          └────────────────┼────────────────┘
                           │
                    ┌──────▼──────┐
                    │ PostgreSQL  │
                    └─────────────┘

          Transaction Service
                  │
                  ▼
                Kafka
                  │
                  ▼
          Notification Service
                  │
                  ▼
                Redis
```

The exact cloud providers and deployment configuration depend on the target environment.

---

# 📌 Current Project Goals

FinVerse is designed as a portfolio-grade project to demonstrate practical experience with:

* Full-stack development
* FinTech application architecture
* Microservices
* REST APIs
* Authentication
* Authorization
* Database design
* Distributed services
* Event-driven architecture
* Caching
* Containerization
* API Gateway architecture
* Cloud deployment

---

# 🔮 Future Improvements

Potential future improvements include:

* Two-factor authentication
* Email verification
* Password reset
* Rate limiting
* Advanced audit logging
* Real notification delivery
* Email/SMS notifications
* Payment gateway integration
* Improved transaction consistency
* Idempotency keys for financial operations
* Distributed tracing
* Centralized logging
* Monitoring and alerting
* CI/CD pipelines
* Kubernetes deployment
* Cloud object storage for KYC documents
* Automated KYC verification
* Advanced admin analytics
* Transaction reconciliation
* Production-grade secrets management

---

# 👨‍💻 Author

**Md Muntazeem Saradgi**

Full-Stack / MERN Developer

Interested in:

* Full-Stack Development
* Backend Engineering
* Microservices
* Cloud & DevOps
* Generative AI
* Scalable Software Architecture

---

# 📄 License

This project is intended for educational, portfolio, and demonstration purposes.

Add an appropriate open-source license here if you decide to distribute the project under one.

---

## ⭐ FinVerse

A full-stack digital banking platform demonstrating how modern web technologies, microservices, databases, authentication, caching, messaging, and containerization can be combined to build a scalable FinTech application.
