# 🏥 National Healthcare Oversight Dashboard

A web-based healthcare analytics platform that provides real-time insights into hospital performance, patient demographics, and medication safety metrics using WHO, HealthData.gov, and openFDA data sources.

---

## 🚀 Features

- Dynamic dashboard built with HTML, CSS, and JavaScript (Chart.js)
- Express.js backend API fetching data from WHO, HealthData.gov, and openFDA
- Mock data system for offline use
- Hospital and patient KPIs
- Drug event tracking
- Secure API handling with CORS and error protection

---

## 🗂️ Folder Structure

HEALTH-DASHBOARD/
│
├── backend/
│   ├── server.js
│   ├── data-mocks.js
│   ├── package.json
│   ├── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│
├── .gitignore
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Satishtirukoti/health-dashboard.git
cd health-dashboard
2. Install Dependencies
bash
Copy code
npm install
3. Start the Backend Server
bash
Copy code
npm start
The server runs at http://localhost:3000

4. Open the Frontend
Open frontend/index.html in your browser.

🧩 API Endpoints
GET /api/who/indicator/:code – WHO health indicators
GET /api/healthdata/query?dataset=g62h-syeh&limit=50 – HealthData.gov dataset
GET /api/openfda/drug/events?search=&limit=10 – openFDA drug events
GET /api/kpis – Combined KPIs summary

🧠 Technologies Used
Category	Technology
Frontend	HTML, CSS, JavaScript, Chart.js
Backend	Node.js, Express.js
Data Fetching	node-fetch
Cross-Origin	CORS
Mock Data	data-mocks.js
APIs	WHO, HealthData.gov, openFDA

🧾 Usage
Start the backend using npm start

Open index.html in your browser

Explore dashboard charts, KPIs, and patient data

🧱 Future Enhancements
Admin authentication

Live database integration (Firebase or MongoDB)

Real-time updates using WebSockets

Export analytics as PDF/CSV

📄 License
Licensed under the MIT License — free to use and modify.

👨‍💻 Author
Satish Tirukoti
GitHub Profile
College Student | Passionate about Data Analytics & Software Development