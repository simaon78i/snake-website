# 🐍 Snake App - Full Stack & Dockerized

A modern, high-performance take on the classic Snake game. This project isn't just about the gameplay—it’s a full-scale **3-Tier Architecture** demonstration, featuring a decoupled frontend, a containerized backend, and a cloud-hosted relational database.

---

### 🖼️ Preview
<div align="center">
  <img src="assets/snake picture.png" alt="Snake Game Gameplay" width="700">
  <p><i>The modern grid interface featuring global leaderboard integration.</i></p>
</div>

---

### ✨ Key Features
* **Global High Scores:** Your scores aren't just local. They are sent via a REST API to a central database.
* **Dockerized Backend:** The API server is fully containerized for consistent deployment across any environment.
* **Cloud Integration:** Real-time data sync between GitHub Pages (Frontend), Render (Backend), and Neon (Database).
* **Responsive Logic:** Smooth movement physics with collision detection and dynamic growth.

---

### 🛠️ Tech Stack

| Layer | Technology | Hosting |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | GitHub Pages |
| **Backend** | Node.js, Express.js, Docker | Render |
| **Database** | PostgreSQL | Neon (Serverless Postgres) |
| **DevOps** | CI/CD Pipeline, Dockerfile, Env Vars | GitHub Actions |

---

### 🏗️ Architecture Overview

1. **Client (Presentation):** The vanilla JavaScript frontend handles game loops and UI. It communicates with the backend via `fetch` API.
2. **Server (Application):** A Node.js container running in a Dockerized environment. It validates data and manages the connection pool to the database.
3. **Database (Data):** A PostgreSQL instance storing player names, emails, and high scores with timestamping.

---

### 🎮 How to Play

> **Objective:** Eat the apples to grow and set a new world record! Avoid hitting the walls or your own tail.

* **Steer:** Use **Arrow Keys** or **WASD**.
* **Submit:** Once the game ends, a modal will prompt you to save your score to the global leaderboard.

---

### 🚀 Developer Setup

To run the backend locally using Docker:

1. **Clone the Backend Repository:**
   ```bash
   git clone [https://github.com/simaon78i/snake_backend.git](https://github.com/simaon78i/snake_backend.git)
2. **Build the Docker Image:**
   ```bash
   docker build -t snake-api .
3. **Run the Container:**
   ```bash
   docker run -p 10000:10000 --env DATABASE_URL="your_connection_string" snake-api
   

   
