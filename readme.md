# 🌍 Timezone & Holiday API

> **Get accurate local time, working hours, and public holidays — anywhere on Earth.**  
> Built with Node.js + Express + Luxon + Calendarific + OpenCage APIs.

---

![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-black?logo=express)
![Luxon](https://img.shields.io/badge/Luxon-UTC%20Ready-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## 🧭 Overview

The **Timezone & Holiday API** is a backend service that provides:
- 📅 **Upcoming public holidays** per country
- 🕒 **Local time and UTC offset** based on any city or coordinates
- 🏢 **Working hour detection** (configurable 9 AM – 6 PM default)
- 🔒 **API key protection + rate limiting**
- ⚡ **Local caching** for performance

Use it in **scheduling apps, automation tools, or dashboards** that need real-time timezone awareness.

---

## ✨ Features

✅ City / coordinate-based input  
✅ Real-time timezone & UTC offset  
✅ Configurable working hours  
✅ Upcoming holiday detection  
✅ API-key authentication  
✅ Rate limiting (50 req / 15 min / IP)  
✅ Local caching with TTL  
✅ Health endpoint for monitoring

---

## 🧠 How It Works  


---

## 🔧 Environment Variables Reference

| Variable | Required | Description |
|-----------|-----------|-------------|
| `PORT` | ✅ | The server port (default 5000) |
| `CALENDARIFIC_API_KEY` | ✅ | API key from [Calendarific](https://calendarific.com/) |
| `OPENCAGE_API_KEY` | ✅ | API key from [OpenCage](https://opencagedata.com/) |
| `VALID_API_KEYS` | ✅ | Comma-separated list of keys allowed to access your API |
| `WORK_START` | ❌ | Start of working hours (default: 9) |
| `WORK_END` | ❌ | End of working hours (default: 18) |

> 🧩 Example:
> ```
> VALID_API_KEYS=key123,key456
> ```

---

## 🧑‍💻 Developer Notes

### 🧩 Rate Limiting
- Implemented using `express-rate-limit`
- 50 requests per 15 minutes per IP
- Returns a JSON error message when exceeded
- Customize easily in `/src/middleware/rateLimiter.js`

### 🔑 API Key Auth
- Implemented via a lightweight custom middleware `/src/middleware/apiAuth.js`
- Supports multiple valid keys from `.env`
- Returns HTTP `401` for unauthorized access

### 💾 Caching
- Implemented with an **in-memory TTL cache** in `/src/utils/cache.js`
- Reduces API requests to Calendarific and OpenCage
- Auto-expires after 24 hours


---

## 🧠 Example Use Cases

| Use Case | Example |
|-----------|----------|
| **Scheduling Systems** | Only allow booking during local working hours |
| **Global Chatbots** | Pause or reschedule notifications during holidays |
| **Workforce Dashboards** | Display "active" / "off hours" for each office |
| **Analytics Pipelines** | Adjust timestamps to correct timezone |
| **Smart Automation Tools** | Avoid triggering processes on national holidays |

---

## 🧰 Possible Enhancements

- Add **Redis or MongoDB cache** for persistence
- Add **JWT or OAuth2** for enterprise authentication
- Implement **custom user-based rate limiting**
- Add **GraphQL endpoint** for flexible querying
- Build a small **React dashboard frontend**

---

## 🧑‍💻 Contributing

Contributions are always welcome!

1. **Fork** the repository
2. Create a new branch
   ```bash
   git checkout -b feature-name

##
https://timezone-api-hmyy.onrender.com/api/timeinfo?city=belgaum&api_key=key12