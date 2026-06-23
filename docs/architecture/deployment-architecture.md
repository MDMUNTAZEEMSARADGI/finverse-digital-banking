# Deployment Architecture

```text
Internet
     |
     ▼
Nginx Reverse Proxy
     |
     ▼
API Gateway
     |
------------------------------------------------
| Auth Service                                  |
| User Service                                  |
| Account Service                               |
| Transaction Service                           |
| Notification Service                          |
------------------------------------------------
     |
--------------------------------
| PostgreSQL | MongoDB | Redis |
--------------------------------
```

---

## Containerization

- Docker
- Docker Compose

---

## Cloud

- AWS EC2
- AWS RDS
- AWS S3
