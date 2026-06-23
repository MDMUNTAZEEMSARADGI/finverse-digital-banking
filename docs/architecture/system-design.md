# FinVerse Digital Banking Platform - System Design

## High Level Architecture

```text
                    ┌─────────────────┐
                    │     Frontend    │
                    │ React + Redux   │
                    └────────┬────────┘
                             │
                             │ HTTPS
                             │
                    ┌────────▼────────┐
                    │   API Gateway   │
                    └────────┬────────┘
                             │
      ┌──────────────────────┼──────────────────────────┐
      │                      │                          │
      │                      │                          │
┌─────▼──────┐      ┌────────▼────────┐       ┌────────▼────────┐
│ Auth       │      │ User Service    │       │ Account Service │
│ Service    │      │                  │       │                 │
└─────┬──────┘      └────────┬────────┘       └────────┬────────┘
      │                      │                          │
      │                      │                          │
      │              ┌───────▼────────┐        ┌────────▼────────┐
      │              │ Transaction     │        │ Notification    │
      │              │ Service         │        │ Service         │
      │              └────────────────┘        └─────────────────┘
      │
      │
┌─────▼────────────────────────────────────────────────────┐
│ PostgreSQL │ MongoDB │ Redis │ Message Queue (RabbitMQ) │
└──────────────────────────────────────────────────────────┘
```

---

## Services

### Auth Service

- Registration
- Login
- JWT
- Refresh Tokens
- RBAC

### User Service

- User Profile
- KYC

### Account Service

- Bank Accounts
- Beneficiaries

### Transaction Service

- Money Transfers
- Statements

### Notification Service

- Email
- In-App Notifications
