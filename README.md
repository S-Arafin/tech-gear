<div align="center">

# ⚡ TechGear E-Commerce

<img src="https://placehold.co/1200x300/1f2937/7c3aed?text=Next.js+16+%2B+MongoDB+%2B+Tailwind" alt="TechGear Banner" width="100%" style="border-radius: 10px; margin-bottom: 20px;">

<p style="font-size: 1.2rem;">
  A high-performance, full-stack e-commerce platform built for tech enthusiasts.<br>
  Featuring server-side pagination, dynamic search/filtering, and a seamless cart experience.
</p>

<p>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" alt="MongoDB"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwind-css" alt="Tailwind"></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Framer-Motion-purple?style=for-the-badge" alt="Framer Motion"></a>
</p>

</div>

---

## 🚀 Key Features

### 🛒 Shopping Experience
- **Dynamic Catalog:** Server-side pagination (12 items/page), live search, and category filtering using MongoDB aggregation.
- **Smart Cart System:** Persistent cart (LocalStorage) with slide-out sidebar, dedicated cart page, and quantity management.
- **Product Details:** Rich product pages with dynamic stock status, image rendering, and "Quick Add" functionality.
- **Interactivity:** Smooth animations using `Framer Motion` and instant feedback via `React Hot Toast`.

### 🔐 Admin & Authentication
- **Secure Access:** Mock authentication system using cookies protection.
- **Product Management:** Protected `/add-item` route to upload new products to the database.
- **Glassmorphism UI:** Modern, responsive login interface.

### 🎨 UI/UX Design
- **Theming:** Dark/Light mode toggle with a custom "Tech-Gear" dark theme.
- **Responsive:** Fully mobile-responsive layout with custom mobile navigation.
- **Error Handling:** Custom `404` (Not Found) and `Error` boundary pages.

---

## 🔐 Admin Credentials

To access the **Add Item** page, login using the specific admin credentials or use the "Demo Login" button on the login page.

<div style="background-color: #1e1e2e; color: #cdd6f4; padding: 20px; border-radius: 10px; border-left: 6px solid #a855f7; font-family: monospace;">
  <h3 style="margin-top: 0; color: #a855f7;">👑 Admin Access</h3>
  <p><strong>Email:</strong> <span style="color: #fca5a5;">admin@test.com</span></p>
  <p><strong>Password:</strong> <span style="color: #fca5a5;">123456</span></p>
</div>

---

## 📂 Project Structure

Based on the implemented filing system:

```text
src/
├── app/
│   ├── add-item/          # Protected Route: Add new products
│   │   └── page.jsx
│   ├── api/items/         # API Routes (GET, POST)
│   │   ├── [id]/route.js  # Single Item operations
│   │   └── route.js       # Pagination & Filtering logic
│   ├── cart/              # Full Cart Page
│   │   └── page.jsx
│   ├── items/             # Catalog Page (Search/Filter/Paginate)
│   │   ├── [id]/page.jsx  # Product Details
│   │   └── page.jsx       # Catalog Grid
│   ├── login/             # Authentication Page
│   │   └── page.jsx
│   ├── error.jsx          # Global Error Boundary
│   ├── layout.jsx         # Root Layout (Providers & Hydration)
│   ├── not-found.jsx      # Custom 404 Page
│   └── page.jsx           # Landing Page (Hero, Features)
│
├── components/            # Reusable UI Components
│   ├── AddToCartButton.jsx
│   ├── CartSidebar.jsx
│   ├── FeaturedSection.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx
│   ├── Navbar.jsx
│   └── ProductCard.jsx
│
├── context/               # Global State
│   └── CartContext.js     # Cart Logic & Persistence
│
├── lib/                   # Utilities
│   └── db.js              # MongoDB Connection Client
│
└── public/                # Static Assets
🛠️ Installation & Setup
Clone the repository:

Bash

git clone [https://github.com/your-username/tech-gear.git](https://github.com/your-username/tech-gear.git)
cd tech-gear
Install dependencies:

Bash

npm install
Environment Setup: Create a .env.local file in the root directory and add your MongoDB connection string:

Code snippet

MONGODB_URI=your_mongodb_connection_string_here
NEXT_PUBLIC_API_URL=http://localhost:3000
Run the development server:

Bash

npm run dev
Open the app: Visit http://localhost:3000 in your browser.

📡 API Documentation
This project uses Next.js App Router API handlers.

GET /api/items
Fetches a paginated list of products.

Query Params:

page: Page number (default: 1)

limit: Items per page (default: 12)

category: Filter by category (e.g., 'Gaming')

search: Search term for name or description

GET /api/items/[id]
Fetches details for a single product by MongoDB Object ID.

POST /api/items
Adds a new product to the database.

Body: JSON object containing name, price, description, category, stock, etc.

📦 Dependencies
<div style="display: flex; gap: 10px; flex-wrap: wrap;"> <span style="background: #333; color: white; padding: 5px 10px; border-radius: 5px;">react-hot-toast</span> <span style="background: #333; color: white; padding: 5px 10px; border-radius: 5px;">framer-motion</span> <span style="background: #333; color: white; padding: 5px 10px; border-radius: 5px;">mongodb</span> <span style="background: #333; color: white; padding: 5px 10px; border-radius: 5px;">js-cookie</span> <span style="background: #333; color: white; padding: 5px 10px; border-radius: 5px;">react-icons</span> <span style="background: #333; color: white; padding: 5px 10px; border-radius: 5px;">daisyui</span> </div>

<div align="center"> <p>Built with ❤️ by Sultanul Arafin</p> <p>© 2026 TechGear Industries</p> </div>