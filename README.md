
# 👕 Custom Clothing Design Web App

A full-stack web application that allows users to customize a T-shirt by changing colors, adding text or images, previewing designs live, and saving them.

Built with:
- Frontend: Next.js (App Router) + Tailwind CSS + Fabric.js
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma ORM
- Authentication: JWT-based authentication

---

# 🚀 Features

## ✅ User Authentication
- Register new users
- Login with JWT authentication
- Token-based protected routes

## ✅ Design Editor
- Change T-shirt color dynamically
- Add resizable text
- Upload and resize images
- Delete selected objects
- Live preview using Fabric.js

## ✅ Design Management
- Save customized designs
- View saved designs
- Delete saved designs

## ✅ Product Options
- Select size (S, M, L, XL)
- Dynamic price updates based on size

---

# 🏗️ Architecture Overview

Frontend (Next.js)  
        ↓ REST API  
Backend (Express.js)  
        ↓ Prisma ORM  
PostgreSQL Database  

### Frontend Responsibilities
- UI rendering
- Design editor (Fabric.js canvas)
- Sending authenticated API requests
- Token storage in localStorage

### Backend Responsibilities
- User authentication (JWT)
- Design CRUD operations
- Data validation
- Database communication via Prisma

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd custom-clothing-app
```

---

## 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/custom_clothing
JWT_SECRET=your_super_secret_key
```

Run migration:

```bash
npx prisma migrate dev --name init
```

Start backend:

```bash
npm run dev
```

Backend runs at:

http://localhost:5000

---

## 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

http://localhost:3000

---

# 🔐 Authentication Flow

1. User logs in
2. Backend generates JWT
3. Token stored in localStorage
4. Axios interceptor attaches Authorization header
5. Protected routes validate token

---

# 📡 API Documentation

Base URL:

http://localhost:5000/api

---

## 🔑 Auth Routes

### POST /auth/register

Request:
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

---

### POST /auth/login

Response:
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

## 🎨 Design Routes (Protected)

Authorization Header Required:
Authorization: Bearer JWT_TOKEN

---

### POST /designs

```json
{
  "productType": "tshirt",
  "color": "white",
  "size": "M",
  "price": 549,
  "designData": {}
}
```

---

### GET /designs

Returns designs of logged-in user.

---

### DELETE /designs/:id

Deletes design by ID.

---

# 🧠 Data Modeling

## User Model

```prisma
model User {
  id       String   @id @default(uuid())
  email    String   @unique
  password String
  designs  Design[]
}
```

## Design Model

```prisma
model Design {
  id          String  @id @default(uuid())
  productType String
  color       String
  size        String
  price       Int
  designData  Json

  userId String
  user   User @relation(fields: [userId], references: [id])
}
```

---

# 🛡️ Security

- JWT authentication
- Password hashing (bcrypt)
- Protected API routes
- Token expiration handling

---

# 📈 Future Improvements

- Download design as PNG
- Font selector
- Text color picker
- Admin dashboard
- Payment integration

---

# 👨‍💻 Author

Developed as a full-stack project demonstrating REST API design, authentication handling, canvas-based UI development, database modeling, and full-stack integration.
