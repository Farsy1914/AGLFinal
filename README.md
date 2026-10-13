# 🌾 AgriTech Platform

An **AI-Powered & Crowdfunding Smart Agricultural Ecosystem** designed to revolutionize agricultural finance, produce trading, and crop intelligence in Bangladesh.

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

---

## 📌 Problem Statement & Solution

Smallholder farmers in Bangladesh face high-interest informal loans, price exploitation by middlemen, and unpredictable crop losses due to climate change. Investors hesitate to fund farming projects due to a lack of verifiable feasibility data and risk of fraud.

**AgriTech Platform** bridges this gap by:
1. **Crowdfunding Agricultural Projects:** Allowing farmers to request capital directly from investors.
2. **Automated ROI Calculations:** Using regional yield benchmarks (`avgYieldPerAcreKg`) and market prices (`avgMarketPricePerKg`) to compute transparent Return on Investment metrics for analysts.
3. **Escrow Vault Mechanism:** Securing investor and buyer funds in a third-party holding mechanism until order fulfillment or project approval.
4. **Direct Marketplace:** Connecting farmers directly with retail buyers to eliminate middleman margins.
5. **AI Weather & Advisory:** Providing real-time weather forecasts and agronomic recommendations.

---

## ✨ Key Features

### 🚜 For Farmers
- **Crowdfunding Campaigns:** Post farm project requests specifying land area, crop, region, and target budget.
- **Direct Crop Marketplace:** List harvested crops for retail buyers with custom pricing and stock management.
- **AI Weather & Crop Advisory:** Get localized weather forecasts, rainfall alerts, and climate protection tips.

### 💼 For Investors
- **Verified Farm Projects:** Browse crowdfunding campaigns with transparent, analyst-verified ROI projections.
- **Portfolio Tracking:** Track active investments, expected returns, and funding status in real time.

### 🛒 For Buyers
- **Fresh Marketplace:** Order produce directly from local farmers without intermediary fees.
- **Escrow Order Checkout:** Funds are safely held in Escrow until produce delivery is confirmed.

### 📊 For Analysts
- **Regional Benchmark Feasibility Pipeline:** Verify crowdfunding proposals against regional historical yield data.
- **Automated Fallback Engine:** Automatic benchmark estimation logic to prevent verification halts when regional data is missing.

### ⚙️ For Administrators
- **System Command Center:** Real-time system analytics (Users, Active Projects, Total Funds Raised, Escrow Volume).
- **User KYC Audits:** Review NID and trade license verification requests.
- **Database Seed Execution:** Re-populate system benchmark data with one click (`/api/seed`).

---

## 🧮 Mathematical Model: Analyst ROI Calculation

The platform calculates project feasibility and projected Return on Investment ($\text{ROI}$) using the following formulas:

1. **Calculated Yield (kg):**
   $$\text{Yield} = \text{Land Area (Acres)} \times \text{Average Yield Per Acre (kg)}$$

2. **Expected Revenue (৳):**
   $$\text{Revenue} = \text{Yield (kg)} \times \text{Average Market Price Per Kg (৳)}$$

3. **Net Profit (৳):**
   $$\text{Net Profit} = \text{Expected Revenue} - \text{Target Budget (৳)}$$

4. **ROI Percentage (%):**
   $$\text{ROI (\%)} = \left( \frac{\text{Net Profit}}{\text{Target Budget}} \right) \times 100$$

---

## 🔒 Escrow Payment Flow
