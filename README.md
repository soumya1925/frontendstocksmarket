# 📊 Stock Analysis Dashboard

## 🚀 Live Demo

- **Frontend (Next.js app)** 👉 [https://frontendstocksmarket-jg0sl4iti-soumya-rouls-projects.vercel.app](https://frontendstocksmarket-jg0sl4iti-soumya-rouls-projects.vercel.app)  
- **Backend (Express API)** 👉 [https://stocksapi-qp3k.onrender.com](https://stocksapi-qp3k.onrender.com)  

---

A **Next.js + React** powered dashboard for **real-time portfolio tracking and stock analysis**.

---

## ✨ Features

- 📈 Interactive charts with [Recharts](https://recharts.org/)  
- 📋 Dynamic data table using [TanStack React Table](https://tanstack.com/table)  
- 🔄 Auto-refresh every 30 seconds  
- 🎯 Sector-based performance breakdown  
- 💹 Gain/Loss visualization with color coding  

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)  
- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [TanStack React Table](https://tanstack.com/table)  
- [Recharts](https://recharts.org/)  

---

## 📂 Project Structure

/project-root
├── /app
│ ├── /api/portfolio # API route for portfolio data
│ ├── page.tsx # Main dashboard page
│ └── globals.css # Global styles
├── /components # Reusable UI components
├── package.json
└── README.md

yaml
Copy code

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/stock-dashboard.git
cd stock-dashboard
2. Install dependencies
bash
Copy code
npm install
# or
yarn install
3. Run development server
bash
Copy code
npm run dev
# or
yarn dev
👉 App runs on http://localhost:3000
```

## 🔌 API Endpoint
The dashboard fetches portfolio data from: https://stocksapi-qp3k.onrender.com

## 📊 Dashboard Sections
📌 Sector Summary
Total Investment

Total Present Value

Gain/Loss %

📌 Charts
Pie Chart → Sector Allocation

Bar Chart → Sector Gain/Loss %

📌 Stock Table
Detailed stock metrics (Investment, CMP, EPS, P/E, etc.)

Color-coded Gain/Loss for quick insights

🖌️ Styling
Gain/Loss rows styled with CSS classes:

stock-positive, stock-negative

sector-positive, sector-negative

Easily extendable with TailwindCSS or Shadcn
