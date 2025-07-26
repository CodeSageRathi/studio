# 🚀 TradeFlow – B2B Agricultural Marketplace Platform

**TradeFlow** is a modern, secure, and scalable B2B web platform designed specifically to connect agricultural **suppliers** and **buyers**. It offers end-to-end support for product listing, deal negotiation, inventory management, real-time order tracking, and AI-powered engagement.

---

## 🌟 Key Features

### 1. 🔐 Secure Authentication
- Role-based login/signup for **Buyers** and **Suppliers**.
- OTP, password login, and secure session management.
- ‘Forgot Password’ flow with verification.
- JWT + HTTPS + secure session handling.

---

### 2. 🛒 Product Browsing (For Buyers)
- Browse categorized agricultural products: *grains, spices, seeds, etc.*
- Sorting by **Price**, **Rating**, and **Delivery Time**.
- Detailed product cards with MOQ, quality grades, lead time, etc.

---

### 3. 📦 Product Management (For Suppliers)
- Add, edit, delete product listings.
- Set **MOQ**, bulk pricing tiers, delivery time, stock tracking.
- Real-time stock warnings & automatic unlisting when out of stock.

---

### 4. 📈 Deals & Smart Promotion System
- AI tool to suggest **quantity-based** or **time-based** promotional deals.
- Supplier can target inactive or potential buyers with custom offers.
- Suggestions adapt based on inventory age and stock velocity.

---

### 5. 💬 In-App Real-Time Chat
- Role-based messaging (buyer ↔ supplier).
- File/image support (invoices, product images).
- Typing indicator, seen status, emoji support.
- End-to-end encrypted via socket-based communication.

---

### 6. 🚚 Order & Delivery Tracking
- **Suppliers** can manage live, pending, delivered, and cancelled orders.
- **Buyers** can view status with expected delivery dates.
- Refund request flow & cancellation handling per item.

---

### 7. 🤖 AI Assistant Chatbot
- Embedded AI chatbot for:
  - Supplier onboarding & FAQs.
  - Buyer product recommendations.
  - Basic support & automated replies.
- Built with OpenAI/Gemini APIs for dynamic response generation.

---

## 🎨 Design System & UI/UX Guidelines

### 🎨 Color Scheme
| Element              | Color     | Hex Code   |
|----------------------|-----------|------------|
| Primary              | Indigo    | `#4B0082`  |
| Accent / CTA         | Teal      | `#008080`  |
| Background           | Light Gray| `#F0F0F5`  |
| Text Primary         | Charcoal  | `#2C2C2C`  |
| Success/Info Alerts  | Soft Green| `#DFF5E1`  |

### ✨ Animations
- Smooth page transitions (Framer Motion or GSAP).
- Button hover effects, card pop on scroll.
- Animated typing indicator in chat.
- Dashboard widgets fade-in and number counter animation.

---

## 🧩 Pages & Navigation Map

| Page | Role | Features |
|------|------|----------|
| `Home` | Public | Landing + Intro |
| `Login/Signup` | Buyer/Supplier | Auth with role switcher |
| `Buyer Dashboard` | Buyer | Browse, track orders, chat, view deals |
| `Supplier Dashboard` | Supplier | Product management, order status, deal setup |
| `Product Details` | Both | Full view of listings |
| `Chat` | Both | Buyer-Supplier messaging |
| `Profile` | Both | Update info, company profile, documents |
| `Deals Engine` | Supplier | AI deal recommendations |
| `Order Management` | Supplier | Status panel with actions |
| `Bot Chat` | Both | AI-based assistant |

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express.js, PostgreSQL
- **Authentication**: Firebase Auth or JWT with OTP module
- **Real-time**: Socket.io for chat
- **AI**: OpenAI / Gemini API for chatbot + smart deals
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend)

---

## 🤝 Contribution

We’re building for real-world scale with simplicity and security in mind. If you’re a developer, designer, or strategist who wants to collaborate or test this system, fork the repo and raise a PR or drop an issue.

---

> **Note:** TradeFlow is a project prototype tailored for agricultural trade but can be extended to other B2B verticals like textiles, electronics, etc.

---
