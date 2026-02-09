# Shop Pilot

A modern, full-featured e-commerce admin dashboard built with Next.js 16, React 19, and TypeScript. Features a clean design system, dark mode support, role-based access control, and responsive layout.

![Dashboard Preview](/dashboard.png)

## ✨ Features

### Authentication & Authorization
- **Role-based access control** with Admin and Editor roles
- **Persistent sessions** with "Remember Me" functionality
- **Protected routes** that redirect unauthorized users
- **Permission-based UI** that adapts to user roles

### Dashboard
- **Real-time statistics** with trend indicators
- **Recent orders** overview with status badges
- **Responsive grid layout** that adapts to screen size
- **Dark/Light theme** with system preference detection

### Product Management
- **Full CRUD operations** for products
- **Advanced filtering** by category and status
- **Debounced search** for instant feedback
- **Pagination** with smart page navigation
- **Inline image previews** in product forms

### Order Management
- **Order tracking** with status progression (pending → processing → shipped → completed)
- **Customer information** display with email links
- **Order totals** with formatted currency
- **Quick status updates** at a glance

### Design System
- **Custom UI components** built from scratch (no heavy component libraries)
- **Tailwind CSS v4** with CSS-first configuration
- **CSS variables** for consistent theming
- **Dark mode** with `.dark` class toggle
- **Responsive design** mobile-first approach

## 📸 Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![Dashboard](/dashboard.png) | ![Dashboard Dark](/dashboard-dark.png) |
| ![Products](/products.png) | ![Edit Product](/edit-product.png) |
| ![Login](/login.png) | ![Order Details](/order-details.png) |

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19.2 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| State Management | React Context API |
| Fonts | Geist Sans/Mono |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd shop-pilot

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Editor | editor@example.com | editor123 |

## 📁 Project Structure

```
shop-pilot/
├── app/                    # Next.js App Router pages
│   ├── auth/               # Authentication pages
│   ├── dashboard/         # Dashboard pages + layout components
│   ├── products/         # Product management
│   └── orders/           # Order management
├── components/            # Reusable components
│   ├── ui/              # Design system components
│   ├── common/          # Shared utility components
│   └── auth/           # Auth-specific components
├── contexts/            # React Context providers
├── data/               # Mock data + storage
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/             # TypeScript type definitions
```

## 🎨 Key Design Decisions

### Why No Component Library?
This project intentionally avoids heavy component libraries (MUI, AntD, etc.) to:
- Maintain complete control over design and behavior
- Keep bundle size minimal

### Custom Hooks
Reusable logic extracted into custom hooks:
- `useForm` - Type-safe form handling with validation
- `useDebounce` - Delay value updates for search optimization

### CSS Variables + Tailwind
The project uses CSS variables for theming mapped to Tailwind utilities:
```css
@theme inline {
  --color-primary: var(--primary);
  --color-error: var(--error);
  /* ... */
}
```

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Run ESLint
npx tsc --noEmit # Run TypeScript type checking
```

## 🔐 Authentication Flow

1. User enters credentials on `/auth/login`
2. AuthContext validates against mock users
3. Session persisted in localStorage (remember me) or sessionStorage
4. ProtectedRoute components check auth state
5. Role-based permissions filter UI elements

## 🎯 Supported Roles

### Admin
- Full access to all features
- Manage products, orders, users
- View and edit settings

### Editor
- View all products and orders
- Create and edit products
- Cannot delete or manage users

## 🌓 Dark Mode

Dark mode is implemented with CSS variables and the `.dark` class:
- Automatic detection via `prefers-color-scheme`
- Manual toggle in header
- Persisted in localStorage
- Smooth transitions between themes

## 📱 Responsive Design

- **Mobile**: Collapsible sidebar with slide-over menu
- **Tablet**: 2-column grids, adjusted spacing
- **Desktop**: Full sidebar, 4-column stat grids
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🧪 Testing

This project currently has no test framework configured.

## 📄 License

Private project. All rights reserved.

## 🤝 Contributing

This is a portfolio/demo project. For inquiries or contributions, please contact the repository owner.

---

Built with ❤️ using Next.js, React, and TypeScript
