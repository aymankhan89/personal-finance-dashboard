# Personal Finance Dashboard


> ⚠️ **NOTICE**: This project was recently initiated and is currently under active development. It is not yet live or ready for production use.


<div align="center">

![Personal Finance Dashboard](https://img.shields.io/badge/Personal%20Finance-Dashboard-blue?style=for-the-badge&logo=next.js)

A modern, AI-powered personal finance management application built with cutting-edge web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)

[Demo](https://finance-dashboard-demo.vercel.app) • [Documentation](./docs/ARCHITECTURE.md) • [API Reference](./docs/API.md)

</div>

## ✨ Features

### 💰 Financial Management
- **Transaction Tracking**: Add, edit, and categorize income/expenses
- **Budget Management**: Set and monitor budgets with progress tracking
- **Goal Setting**: Create savings goals with timeline visualization
- **Account Management**: Multiple account support (checking, savings, credit)

### 📊 Data Visualization
- **Interactive Charts**: Built with Recharts, Chart.js, and D3.js
- **Spending Analytics**: Category breakdowns, trends, and comparisons
- **Budget Progress**: Visual progress bars and alerts
- **Historical Analysis**: Multi-period financial analysis

### 🤖 AI-Powered Insights
- **Expense Analysis**: "You spent 20% more on food this month"
- **Anomaly Detection**: Unusual spending pattern alerts
- **Personalized Recommendations**: Cost optimization suggestions
- **Predictive Analytics**: Future expense forecasting

### 🎨 User Experience
- **Dark/Light Mode**: System-aware theme switching
- **Responsive Design**: Mobile-first, works on all devices
- **Progressive Web App**: Offline capabilities and app-like experience
- **Accessibility**: WCAG 2.1 AA compliant

### 🔐 Security & Authentication
- **NextAuth.js**: Secure authentication with multiple providers
- **JWT Tokens**: Stateless authentication with refresh tokens
- **Role-based Access**: User permission management
- **Data Encryption**: Sensitive data protection

## 🏗️ Architecture

```
graph TB
    subgraph "Frontend"
        A[Next.js 14] --> B[React Components]
        B --> C[shadcn/ui]
        B --> D[Charts: Recharts/Chart.js/D3]
        B --> E[State: Zustand]
    end
    
    subgraph "Backend"
        F[API Routes] --> G[Business Logic]
        G --> H[Prisma ORM]
        G --> I[AI Service]
    end
    
    subgraph "Data"
        J[(PostgreSQL)]
        K[(Redis Cache)]
    end
    
    A <--> F
    H <--> J
    G <--> K
    I <--> L[OpenAI API]
```

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts, Chart.js, D3.js
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js
- **Theme**: next-themes (Dark/Light mode)

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Authentication**: JWT with NextAuth.js
- **AI**: OpenAI GPT-4 API
- **File Upload**: Cloudinary
- **Email**: Resend

### DevOps & Tools
- **Monorepo**: Turborepo + PNPM workspaces
- **Linting**: ESLint + Prettier
- **Type Safety**: TypeScript strict mode
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- PNPM 8+
- PostgreSQL 14+
- Redis 6+

### Installation

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/personal-finance-dashboard.git
   cd personal-finance-dashboard
   ```

2. **Install dependencies**
   ```
   pnpm install
   ```

3. **Set up environment variables**
   ```
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/finance_dashboard"
   REDIS_URL="redis://localhost:6379"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # AI Service
   OPENAI_API_KEY="your-openai-api-key"
   
   # File Upload
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**
   ```
   cd packages/database
   pnpm db:push
   pnpm db:seed
   cd ../..
   ```

5. **Start development server**
   ```
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
personal-finance-dashboard/
├── apps/
│   └── web/                     # Next.js application
│       ├── app/                 # App Router pages
│       ├── components/          # React components
│       ├── lib/                 # Utility functions
│       ├── hooks/               # Custom React hooks
│       ├── stores/              # Zustand stores
│       └── types/               # TypeScript types
├── packages/
│   ├── ui/                      # Shared UI components (shadcn/ui)
│   ├── eslint-config/           # ESLint configuration
│   ├── typescript-config/       # TypeScript configuration
│   └── database/                # Prisma schema and migrations
├── docs/
│   ├── ARCHITECTURE.md          # System architecture
│   ├── API.md                   # API documentation
│   ├── DEPLOYMENT.md            # Deployment guide
│   └── DEVELOPMENT.md           # Development guide
└── README.md                    # This file
```

## 🛠️ Development Scripts

```
# Start development server
pnpm dev

# Build all packages
pnpm build

# Lint all packages
pnpm lint

# Type check all packages
pnpm type-check

# Run tests
pnpm test

# Clean build artifacts
pnpm clean

# Database operations
pnpm db:push          # Push schema changes
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio
```

## 📊 Key Features Showcase

### Dashboard Overview
- Real-time financial metrics
- Interactive spending charts
- Recent transactions feed
- Budget progress indicators
- AI-powered insights panel

### Transaction Management
- Quick transaction entry with receipt upload
- Bulk import from CSV/bank files
- Advanced filtering and search
- Category management
- Recurring transaction automation

### Budget & Goals
- Visual budget creation wizard
- Real-time spending alerts
- Goal progress tracking
- Savings recommendations
- Budget vs actual analysis

### Analytics & Insights
- Monthly/yearly spending trends
- Category-wise breakdowns
- Income vs expense analysis
- Predictive spending patterns
- AI-generated financial advice

## 🔐 Security Features

- **Authentication**: Secure login with multiple providers
- **Authorization**: Role-based access control
- **Data Protection**: End-to-end encryption
- **Input Validation**: Server-side validation with Zod
- **Rate Limiting**: API endpoint protection
- **HTTPS**: SSL/TLS encryption
- **GDPR Compliance**: Data export/deletion capabilities

## 🚀 Deployment

### Environment Setup
The application supports deployment on various platforms:

- **Vercel** (Recommended): Zero-config deployment
- **Netlify**: Serverless deployment
- **Docker**: Containerized deployment
- **AWS/GCP/Azure**: Cloud platform deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Monitoring and logging set up
- [ ] Backup strategy implemented
- [ ] CDN configured for static assets

## 📚 Documentation

- [**Architecture Guide**](./docs/ARCHITECTURE.md) - System design and technical decisions
- [**API Reference**](./docs/API.md) - Complete API documentation
- [**Development Guide**](./docs/DEVELOPMENT.md) - Local development setup
- [**Deployment Guide**](./docs/DEPLOYMENT.md) - Production deployment instructions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Prisma](https://www.prisma.io/) for type-safe database access
- [OpenAI](https://openai.com/) for AI-powered insights


---

<div align="center">

**Built with ❤️ by developer, for developers**

[⭐ Star this repo](https://github.com/aymankhan89/personal-finance-dashboard) if you find it helpful!

</div>
