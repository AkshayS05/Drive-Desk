# 🚗 Drive Desk — Car Rental Management App

**Drive Desk** is a modern, full-featured car rental management application built using **React**, **Supabase**, and **Styled Components**. It provides admins or rental agents with real-time tools to manage bookings, cars, and customer data, while offering a seamless and user-friendly interface.

---

## 🧰 Tech Stack

- **Frontend**: React (with React Router, Context API, and custom hooks)
- **Backend-as-a-Service**: Supabase (Database + Auth + API)
- **Styling**: Styled Components
- **State Management**: React Query
- **Date Utilities**: date-fns

---

## 🔑 Key Features

### 🧾 Bookings Management

- Create, check in, and check out bookings
- View booking details, including status, price, and insurance
- Automatic status updates based on date and actions

### 🚙 Cars Module

- Manage the list of available cars
- View car details, availability, and usage

### 👤 Customer Profiles

- View customer information including nationality and booking history
- Country flags and visual cues for better UX

### 💸 Optional Insurance Add-ons

- Users can choose to add insurance during check-in
- Dynamic pricing based on number of nights and configurable rates

### 📆 Daily Activity Tracking

- Dashboard for today's check-ins and check-outs
- Status tagging: arriving, departing, completed

### ✅ Authentication & Access

- Role-based authentication via Supabase Auth (planned or in-progress)
- Session persistence with secure routing

---

## 📦 Project Structure

src/
├── components/
│ ├── bookings/
│ ├── cars/
│ ├── customers/
│ ├── check-in-out/
│ └── ui/
├── hooks/
├── services/
├── styles/
├── utils/
└── App.jsx

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/drive-desk.git
cd drive-desk
```

🚀 Future Enhancements
🟡 3D Car View Integration using Three.js

🟡 Email notifications using Supabase Edge Functions
