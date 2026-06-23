we are using microservices, structure in backend

Project Architecture
finverse-digital-banking/
│
├── frontend/
│
├── backend/
│
├── infrastructure/
│
├── docs/
│
├── docker-compose.yml
│
├── README.md
│
└── .gitignore

Backend Structure

backend/
│
├── api-gateway/
│
├── auth-service/
│
├── user-service/
│
├── account-service/
│
├── transaction-service/
│
├── notification-service/
│
├── shared/
│
└── package.json

Frontend Structure
frontend/
│
├── public/
│
├── src/
│ ├── api/
│ ├── app/
│ ├── assets/
│ ├── components/
│ ├── constants/
│ ├── contexts/
│ ├── features/
│ ├── hooks/
│ ├── layouts/
│ ├── pages/
│ ├── redux/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ ├── validations/
│ └── App.jsx
│
├── package.json
└── vite.config.js


└── vite.config.js
Infrastructure Folder
infrastructure/
│
├── docker/
│
├── nginx/
│
├── kubernetes/
│
└── github-actions/


Documentation Folder
docs/
│
├── architecture/
├── api-docs/
├── database/
├── diagrams/
└── requirements/