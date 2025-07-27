# 🛒 Buyer-Supplier Discovery Platform

This is a real-time geo-location based platform where **buyers and suppliers** can discover each other based on location, trust level, and business category. The platform empowers **local commerce**, builds trust with **verified profiles**, and helps streamline sourcing and selling.

## 🌐 Core Concept

📍 Built on Google Maps API, the platform allows:
- **Suppliers** to list their businesses and attract nearby buyers.
- **Buyers** to discover trusted, relevant suppliers within their vicinity.

---

## 🔐 Verified & Trusted Accounts

To ensure **reliability** and **authenticity**, both buyers and suppliers can upgrade to **Trusted Accounts** by submitting comprehensive business or personal data. These trusted accounts get a badge, higher visibility, and access to deeper insights.

---

## 🧑‍💼 Supplier Perspective

### ✅ Supplier Onboarding Flow
When a supplier registers, we collect:
- **Business Name**
- **Contact Person**
- **Business Type**: Individual / Shop / Distributor / Manufacturer
- **GST Number / License ID**
- **Product Category**: Dropdown (Vegetables, Textiles, Hardware, etc.)
- **Business Location**: GPS auto-detect or manual entry (city, district, state)
- **Verification Documents (Optional)** for Trusted Account
- **Shop Timings & Delivery Options**

### 📍 Supplier Map Visibility
- Supplier’s shop is pinned on the map for buyers within a **2–8 km radius**.
- Suppliers can **see nearby buyers** looking for their product category.
- Profile card visible to buyers with:
  - Business logo/avatar
  - Trust badge if verified
  - Category
  - Ratings
  - Delivery availability
  - Contact options

### 🛠 Supplier Dashboard Features
- Manage Products & Categories
- Toggle Availability (Active/Inactive)
- View Buyer Interests (anonymous until connected)
- Upgrade to Trusted Supplier

---

## 🛍 Buyer Perspective

### ✅ Buyer Registration Flow
We collect:
- **Name**
- **Contact Number**
- **Buying Preferences** (categories interested in)
- **Location (GPS or manual)**: To find nearby suppliers
- **Purpose**: Daily use / Bulk order / Wholesale
- **Verification (Optional)** for Trusted Account

### 🔍 Buyer Map Experience
- Buyer sees nearby suppliers filtered by:
  - Product Category
  - Distance Radius (e.g., 2–8 km)
  - Trust Level (can choose “Only Trusted Suppliers”)
- Buyer profile visible to suppliers **if buyer opts in** (for B2B interactions)

### 🧾 Buyer Dashboard Features
- Browse Suppliers by Category or Trust Level
- Save Favorite Suppliers
- See Shop Details (location, open hours, trust badge)
- Request Quotation / Contact Supplier
- Upgrade to Trusted Buyer

---

## 🧠 Smart Matching Engine

We match buyers and suppliers based on:
- **Proximity**
- **Product category**
- **Verified status**
- **Activity status (open/closed now)**

---

## 🔐 Trusted Account Features (for both roles)

| Feature                    | Regular Account | Trusted Account |
|---------------------------|-----------------|------------------|
| Map Visibility            | ✅              | 🔝 Higher Rank   |
| Profile Card              | ✅              | ⭐ Trust Badge   |
| Document Verified         | ❌              | ✅               |
| Extended Radius Match     | ❌              | ✅ (up to 12km)  |
| Priority Listing          | ❌              | ✅               |
| Review & Rating Access    | ❌              | ✅               |

---

## 🚀 Future Scope

- 🗂 Filter by Ratings, Delivery Speed, Open Now
- 🧾 Buyer Requirements Broadcast (Suppliers can bid)
- 💬 In-app Chat (Buyer ↔ Supplier)
- 📦 Order Tracking Integration (For delivery-focused shops)
- 📊 Supplier Analytics (Views, Clicks, Matches)

---

## 🛠 Built With

- Google Maps API
- Firebase (Authentication + Firestore)
- React / Next.js Frontend *(optional for now)*

---

## 👥 Roles Summary

| Feature                          | Buyer                | Supplier             |
|----------------------------------|----------------------|----------------------|
| Map-based Discovery              | ✅                  | ✅                  |
| Category Matching                | ✅                  | ✅                  |
| Profile Card Visibility          | ✅ (if opted in)    | ✅                  |
| Contact Option                   | ✅                  | ✅                  |
| Trusted Account Badge            | ✅ (optional)        | ✅ (optional)        |
| Dashboard with Activity          | ✅                  | ✅                  |

---

## 📌 Example Use-Case

> A restaurant owner (buyer) is looking for daily fresh vegetables within 5 km. Opens the app → sees 3 nearby trusted suppliers (with ratings, pricing, open hours) → sends quotation request → gets response in real-time.

---

## 💡 Vision

This platform bridges the local gap between demand and supply. Whether it’s a daily vegetable buyer or a wholesale textile distributor, we bring **trust + location + need** together for **smart, local commerce.**
