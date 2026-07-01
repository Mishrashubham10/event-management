# Event Management System

A full-stack real-time Event Management System built with **Next.js**, **Node.js**, **Express**, **MongoDB**, **Socket.IO**, and **TypeScript**.

The application allows administrators to manage events while users can browse, join, leave, and receive live updates without refreshing the page.

---

## Live Demo

### Frontend
https://event-management-nine-ochre.vercel.app

### Backend API
https://event-management-1-ncj7.onrender.com

---

# ✨ Features

## Authentication

- JWT Authentication
- HTTP Only Cookies
- Session Management
- Protected Routes
- Role Based Authorization (Admin)

---

## Event Management

- Create Events
- Update Events
- Delete Events
- Upload Multiple Images
- Event Categories
- Publish Date
- Event Details Page

---

## Real-Time Features

- Socket.IO Integration
- Live Join Event
- Live Leave Event
- Live Participant Count
- Automatic UI Updates

---

## Admin Dashboard

- Dashboard Overview
- Manage Events
- Manage Categories
- Manage Users
- View Participants
- Delete Events
- Delete Users

---

## Modern UI

- Next.js App Router
- Tailwind CSS
- shadcn/ui
- Responsive Design
- Dark UI
- Toast Notifications

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React 19
- TypeScript
- Redux Toolkit
- RTK Query
- React Hook Form
- Zod
- Tailwind CSS
- shadcn/ui
- Socket.IO Client
- Lucide Icons

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- Multer
- Zod
- TypeScript

---

# 📂 Project Structure

```
event-management
│
├── client
│   ├── app
│   ├── components
│   ├── hooks
│   ├── redux
│   ├── schemas
│   └── utils
│
├── server
│   ├── config
│   ├── middleware
│   ├── modules
│   ├── routes
│   ├── sockets
│   └── utils
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Mishrashubham10/event-management.git
```

```
cd event-management
```

---

## Backend

```bash
cd server
npm install
```

Create a `.env`

```env
PORT=5500
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:3000
COOKIE_SECURE=false
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd client
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5500/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5500
```

Run

```bash
npm run dev
```

---

# 🌐 Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- MongoDB Atlas

---

# 📡 Socket Events

Client emits

- join-event
- leave-event

Server emits

- participant-joined
- participant-left
- participant-count-updated

---

# 📸 Screenshots

> Add screenshots here after deployment.

Example:

```
/screenshots/login.png
/screenshots/dashboard.png
/screenshots/event-details.png
```

---

# 🔒 Authentication Flow

```
Login
      │
      ▼
JWT Generated
      │
      ▼
HTTP Only Cookie
      │
      ▼
Auth Middleware
      │
      ▼
Protected APIs
```

---

# 📌 Future Improvements

- Video Conferencing
- Live Chat
- Notifications
- Email Invitations
- Event Calendar
- Search & Filters
- Analytics Dashboard
- Event QR Code
- PWA Support
- Docker Deployment
- CI/CD Pipeline

---

# 👨‍💻 Author

**Shubham Mishra**

GitHub

https://github.com/Mishrashubham10

LinkedIn

(Add your LinkedIn URL)

---

# License

This project is licensed under the MIT License.

---

If you found this project useful, consider giving it a star.