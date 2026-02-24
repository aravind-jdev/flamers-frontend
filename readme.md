---

# 🔥 FLAMERS – Relationship Predictor

A full-stack relationship prediction web application inspired by the classic FLAMES game — upgraded with a modern Gen-Z mode.

Built with Spring Boot (Java 21), Docker, and deployed using Render (backend) + Vercel (frontend).

---

## 🌐 Live Demo

Frontend: [https://flamers.vercel.app](https://flamers.vercel.app)
Backend API: [https://flamers-backend.onrender.com](https://flamers-backend.onrender.com)

---

## 🚀 Features

* 🔥 Classic FLAMES Mode
*    ⚡ Gen-Z VIBERS Mode
* 🎨 Dynamic theme switching
* 📜 Dynamic letter meanings based on selected mode
* 💾 LocalStorage-based history (last 5 results)
* 🧾 Slide-out history drawer
* 🎵 Theme-based background music toggle
* ✨ Smooth UI animations
* 🌍 Fully deployed (Frontend + Backend)

---

## 🧱 Tech Stack

### Frontend

* HTML5
* CSS3 (Glassmorphism + Grid + Flexbox)
* Vanilla JavaScript (ES6)
* LocalStorage API
* Hosted on Vercel

### Backend

* Java 21
* Spring Boot
* REST API
* Maven
* Docker (multi-stage build)
* Hosted on Render

### DevOps

* Git & GitHub
* Docker containerization
* CI/CD via Render & Vercel auto deploy

---

## 🧠 Architecture Overview

Frontend (Vercel)
⬇
Fetch API (HTTPS)
⬇
Spring Boot REST API (Render)
⬇
Relationship Logic Engine
⬇
JSON Response
⬇
Dynamic UI Update

---

## 📡 API Endpoint

### POST `/api/relationship`

Request:

```json
{
  "name1": "Arjun",
  "name2": "Meera",
  "mode": "classic"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "result": "Marriage",
    "verse": "This story might end with wedding bells."
  },
  "timestamp": "2026-02-17T19:12:43"
}
```

---

## 🎯 Modes Explained

### 🔥 Classic (FLAMES)

* F → Friends
* L → Love
* A → Affection
* M → Marriage
* E → Enemies
* S → Siblings

### ⚡ Gen-Z (VIBERS)

* V → Vibes
* I → In Love
* B → Besties
* E → Ex Energy
* R → Red Flag
* S → Soulmate

---

## 📦 Folder Structure

```
backend/
  ├── src/
  ├── pom.xml
  ├── Dockerfile

frontend/
  ├── index.html
  ├── app.html
  ├── style.css
  ├── script.js
  └── assets/
```

---

## 🧑‍💻 Author

Aravind
B.Tech IT Student
Sri Sairam Institute of Technology, Chennai.

---

## 📜 License

This project is open-source and available under the MIT License.

---
