# 🎭 Random Joke Service

A full-stack web application that delivers random jokes using a **Node.js + Express** backend and a clean, animated frontend — powered by the free [JokeAPI v2](https://v2.jokeapi.dev/) (no API key required).

![Random Joke Service](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![API](https://img.shields.io/badge/API-JokeAPI%20v2-orange?style=for-the-badge)

---

## ✨ Features

- 🎲 **Random jokes** from 7 categories: All, Programming, Pun, Misc, Dark, Spooky, Christmas
- 🎬 **Two-part jokes** — setup shown first, click "Reveal Punchline" to see the delivery
- 🌙 **Dark / Light theme** toggle (saved in localStorage)
- 📋 **Copy to clipboard** — copy any joke with one click
- 🔢 **Joke counter** — persists across sessions via localStorage
- ⌨️ **Keyboard shortcuts** — press `Space` or `Enter` for the next joke
- 📱 **Fully responsive** — works great on mobile and desktop
- ✅ **Safe mode** — all jokes are filtered for family-friendly content

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js, Express |
| **Frontend** | HTML5, CSS3 (animations), Vanilla JS |
| **External API** | [JokeAPI v2](https://v2.jokeapi.dev/) — free, no key needed |
| **Dependencies** | `express`, `node-fetch`, `cors` |

---

## 📁 Project Structure

```
randomjoke/
├── server.js          # Express server + API proxy routes
├── package.json       # Node.js project config & dependencies
├── README.md          # Project documentation
└── public/
    ├── index.html     # Main HTML page
    ├── style.css      # Styling, themes & animations
    └── script.js      # Frontend logic (fetch, UI, keyboard)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v14 or higher
- npm (comes with Node.js)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/kabishS/randomjoke.git

# 2. Navigate to the project directory
cd randomjoke

# 3. Install dependencies
npm install

# 4. Start the server
node server.js
```

### Open in Browser

```
http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/joke` | Get a random joke from any category |
| `GET` | `/api/joke/:category` | Get a joke from a specific category |
| `GET` | `/api/categories` | List all available categories |

### Example Response

**Single joke:**
```json
{
  "type": "single",
  "joke": "Debugging is like being the detective in a crime movie where you'\''re also the murderer.",
  "category": "Programming"
}
```

**Two-part joke:**
```json
{
  "type": "twopart",
  "setup": "Why do Java developers wear glasses?",
  "delivery": "Because they don'\''t C#.",
  "category": "Programming"
}
```

### Valid Categories

`Any` | `Programming` | `Misc` | `Dark` | `Pun` | `Spooky` | `Christmas`

---

## 📸 Screenshots

> Open `http://localhost:3000` after running the server to see the app in action!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [JokeAPI](https://jokeapi.dev/) by Sv443 — an awesome free joke API
- [Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins)

---

> Made with ❤️ and 😂 using Node.js + JokeAPI
