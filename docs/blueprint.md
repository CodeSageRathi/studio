# **App Name**: TradeFlow

## Core Features:

- Secure Authentication: User authentication with role-based access (Buyer/Supplier) and session management, with support for OTP, password and 'forgot password'.
- payment feature: add payemt feaure razor pay upi. for payment gateway.
- Product Browsing: Browse products with category filters (grains, spices, etc.) and sorting options (price, rating, delivery time).
- In-App Chat: In-app chat functionality enabling direct communication between buyers and suppliers for queries and deal negotiation.
- Product Management: Inventory and product management features for suppliers to add, edit, remove items, and manage stock, MOQ, and pricing.
- Order Tracking: Order management system for suppliers to track live, pending, and delivered orders, and manage cancellation/refund status per item.
- Deals Suggestions: Suggest promotional deals that suppliers can send to buyers, to move the product more efficiently; uses a tool that can reason whether quantity or time based deals will work better in different scenarios.
- AI Chatbot: AI base chatbot
- Geo-Location Based Suggestions: Use location services to prioritize suppliers based on proximity, reducing delivery time and cost.
- Dynamic Quotation System: Allow buyers to request custom bulk quotes; suppliers can respond with dynamic offers instead of fixed pricing. Especially helpful for large-volume orders.
- Delivery Slot & Logistics Integration: Enable buyers to choose delivery slots and optionally integrate with local delivery partners (Shiprocket, Delhivery API, etc.).
- Business Analytics Dashboard (for both parties): Buyers: Order volume, savings tracker, most purchased products. Suppliers: Revenue trends, top products, conversion rates, and low stock predictions.
- Advanced Search with NLP: AI-powered product search that understands intent: e.g., 
“cheap rice under ₹500 with delivery in 2 days”.
- Vendor Verification Badge: Verified supplier status (manual + automated verification) to establish trust and boost conversions.
- AI-Driven Reordering Assistant: Suggest recurring orders based on buying patterns with editable cart preview.
- Digital Invoice Generator + GST Handling: Auto-generate PDF invoices post-order. Allow download/email, with GST integration.
- Wishlist & Watchlist for Buyers: Let buyers bookmark suppliers or products they may want to reorder or watch for price drops.
- Dispute & Resolution Center: A structured workflow for refund claims, bad quality products, or delivery issues, reducing manual intervention.
- Micro Animations & Guided Onboarding: Lottie animations, smooth transition effects, and a step-by-step guided onboarding experience (especially for first-time users or suppliers onboarding new products).
- Multi-Product Cart from Multiple Suppliers: Like an Amazon model where buyers can order from multiple sellers in a single checkout flow (with split orders in backend). Improves order efficiency in a busy B2B workflow.
- Supplier Business Profile Pages (Mini Sites): Dedicated landing/profile page for suppliers with: - Logo, about, catalogue, deals, ratings, certifications. Shareable link for marketing. Adds credibility, discoverability, and SEO.

## Style Guidelines:

- Primary color: Indigo (#4B0082), evoking trust and professionalism, aligning with the B2B nature of the marketplace.
- Background color: Very light gray (#F0F0F5), provides a clean and neutral backdrop for product listings and dashboards.
- Accent color: Teal (#008080), chosen as an analogous color to indigo but distinct in brightness and saturation, used for interactive elements and key actions.
- Headline font: 'Poppins', sans-serif. Body font: 'PT Sans', sans-serif. Poppins will be used for titles and PT Sans for paragraphs of text.
- Consistent use of minimalist line icons to represent product categories, actions, and settings across the platform.
- Responsive grid-based layout, ensuring optimal viewing and interaction experience across various devices (desktop and mobile).
- Subtle transitions and animations to enhance user interaction, such as smooth loading indicators and button hover effects.
- Usage Color Name HEX Purpose Primary Indigo `#4B0082` Trust, authority (headers, buttons) Accent Teal `#008080` CTAs, highlights, links Background Light Gray `#F0F0F5` Base layout bg CTA Button Midnight Black `#111827` Primary action buttons Hover State Pale Green `#D1FAE5` Button hover, selection feedback Success Emerald `#10B981` Order complete, success indicators Error Red `#EF4444` Errors, alerts Secondary Text Slate Gray `#6B7280` Paragraphs, muted info Card Background Light Ivory `#FAF9F6` Product cards, dashboards Badge/Highlight Color Amber Yellow `#FFB300` Deal tags, vendor verification
- Grid System: 12-column responsive grid
- Typography System:Use Case Font Size Weight Line Height Style Headline 1 (Hero) Poppins 40px 700 (bold) 1.2 Title Headline 2 Poppins 28px 600 1.3 Section titles Subhead Poppins 20px 500 1.4 Card headers Body PT Sans 16px 400 1.6 Main content Caption/Label PT Sans 14px 400 1.5 Form labels, meta info Button Text Poppins 16px 600 1.5 Bold for clarity
- Buttons: **Primary**: Indigo BG, white text Secondary: Teal outline, teal text CTA Hover: `scale: 1.05`, glow effect with soft shadow Click FX: `scale: 0.95`, ripple animation (using Framer Motion or CSS)
- Data & Dashboard Visuals: Use **Recharts** or **Victory.js** for animated data visuals Smooth **fade + scale** on load Counters (e.g. revenue, order count): animate from `0 → current` on load Inventory status: Use pulsating dots for understocked items (`pulse-green`, `pulse-red`)
- Spacing Guidelines:Use increments of 4 for consistency: - **4px** → Tight spacing (icon-to-text) - **8px** → Field/input margins - **16px** → Section padding - **24px/32px** → Grid gaps, major section breaks
- Padding/Margins: Use increments of `4px`, `8px`, `16px`, `24px`, `32px`
- Card Radius: `16px` (rounded-xl)
- Shadow: Soft elevation (`shadow-md`, `hover:shadow-lg`)
- Breakpoints: - sm: `640px` (mobile) - md: `768px` (tablet) - lg: `1024px` (laptop) - xl: `1280px`+ (desktop)
- Page Transitions (via Framer Motion) - Slide-in on page load: Left for Buyer, Right for Supplier views. - Fade + Scale intro when navigating to dashboards. - Animated route transitions between pages using `AnimatePresence`.
- Button Interactions - Hover: slight scale-up (`scale: 1.05`) + color pulse - Tap: press-in effect (`scale: 0.95`), ripple feedback
- Form Field Animations - Floating labels (`top-[-8px] scale-75`) on focus - Slide-down error messages - Animated password visibility toggle
- Dashboard Animations - Animated charts (`Recharts` or `Victory`) loading with fade-in + scale - Dynamic counters for stats (animated increment on load) - Inventory status indicators pulse if understocked
- Chat UI (Supplier-Buyer) - Typing bubble animation - Sent/Delivered checkmarks fade in - Slide-in chat cards with bounce
- Dark Mode Toggle - Smooth theme transition (`transition-colors duration-500`) - Icon flips from ☀️ to 🌙 with rotation