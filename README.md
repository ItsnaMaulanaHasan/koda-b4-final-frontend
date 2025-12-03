# Koda Shortlink - Frontend

Modern URL shortener frontend application built with React, Vite, and TailwindCSS.

## 🎯 App Description

Koda Shortlink Frontend is a user-friendly web application that allows users to create, manage, and track shortened URLs. Built with modern React ecosystem, it provides an intuitive interface for link management with real-time analytics and dashboard features.

### Key Features

- Create and manage short links
- Real-time dashboard with analytics
- Search and filter links
- Responsive design
- Modern UI with TailwindCSS
- Secure authentication system
- Click tracking and statistics

## 📸 Frontend App Screenshot

### Landing Page

![Landing Page](/docs/landingPage.png)

### Dashboard

![Dashboard](/docs/dashboard.png)

### Link Management

![Link Management](/docs/linkManagement.png)

### Login Page

![Login](/docs/login.png)

### Register Page

![Login](/docs/register.png)

### Setting Page

![Login](/docs/setting.png)

## 🚀 How to Run Frontend

### Prerequisites

- Node.js >= 20.x
- npm or yarn
- Backend API running (see backend repository)

### Installation Steps

1. **Clone the repository**

```bash
   git clone https://github.com/ItsnaMaulanaHasan/koda-b4-final-frontend.git
   cd koda-b4-final-frontend
```

2. **Install dependencies**

```bash
   npm install
```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

```env
   VITE_BASE_URL=http://localhost:8080
```

4. **Run development server**

```bash
   npm run dev
```

5. **Open browser**

   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run lint` - Run ESLint

## 🐳 How to Run with Docker

### Using Docker Compose (Recommended)

This will run frontend, backend, PostgreSQL, and Redis together.

1. **Make sure you have Docker and Docker Compose installed**

2. **Navigate to the root project directory** (where docker-compose.yml is located)

3. **Build and start all services**

```bash
   docker-compose up -d --build
```

4. **Verify services are running**

```bash
   docker-compose ps
```

## 🛠 Tech Stack

### Core

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **React Router DOM 7** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework

### State Management

- **Context API** - State management
- **React Hook Form** - Form handling
- **Yup** - Schema validation

### UI Components

- **Lucide React** - Icon library
- **Recharts** - Chart and data visualization

### Development Tools

- **ESLint** - Code linting
- **Vite Plugin React** - Fast refresh and JSX support

## 📁 Project Structure

```
koda-shortlink-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── StatsCard.jsx
│   │   └── ...
│   ├── context/          # React context providers
│   │   ├── AuthContext.jsx
│   │   └── ProfileContext.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useDashboard.js
│   │   ├── useLinks.js
│   │   └── ...
│   ├── layouts/          # Layout components
│   │   ├── MainLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── pages/            # Page components
│   │   ├── DashboardPage.jsx
│   │   ├── LinksManagementPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── ...
│   ├── utils/            # Utility functions
│   │   └── apiClient.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── .env.example          # Environment variables example
├── Dockerfile            # Docker configuration
├── nginx.conf            # Nginx configuration for Docker
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # TailwindCSS configuration
└── README.md            # This file
```

### Key Directories

- **`components/`** - Reusable UI components like buttons, cards, forms
- **`pages/`** - Full page components that represent routes
- **`hooks/`** - Custom hooks for data fetching and state management
- **`context/`** - React context for global state (auth, user profile)
- **`layouts/`** - Layout wrappers for different page types
- **`utils/`** - Helper functions and API client configuration

## 🔗 Related Repositories

- [Backend Repository](https://github.com/ItsnaMaulanaHasan/koda-b4-final-backend.git) - REST API built with Go and Gin

## 📝 Environment Variables

| Variable        | Description     | Example                 |
| --------------- | --------------- | ----------------------- |
| `VITE_BASE_URL` | Backend API URL | `http://localhost:8080` |
