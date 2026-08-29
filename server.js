const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve index.html from root, and static assets (CSS/JS) from public/
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "public")));

// Valid JokeAPI categories
const VALID_CATEGORIES = ["Any", "Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"];

/**
 * Normalize a joke from JokeAPI into a consistent format:
 * { type: "single"|"twopart", joke?, setup?, delivery? }
 */
function normalizeJoke(data) {
  if (data.error) {
    throw new Error(data.message || "JokeAPI returned an error");
  }
  if (data.type === "single") {
    return { type: "single", joke: data.joke, category: data.category };
  } else {
    return { type: "twopart", setup: data.setup, delivery: data.delivery, category: data.category };
  }
}

// GET /api/joke  — random joke from any category
app.get("/api/joke", async (req, res) => {
  try {
    const url = "https://v2.jokeapi.dev/joke/Any?safe-mode";
    const response = await fetch(url);
    const data = await response.json();
    res.json(normalizeJoke(data));
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

// GET /api/joke/:category  — joke from a specific category
app.get("/api/joke/:category", async (req, res) => {
  const category = req.params.category;

  // Validate category (case-insensitive)
  const matched = VALID_CATEGORIES.find(
    (c) => c.toLowerCase() === category.toLowerCase()
  );

  if (!matched) {
    return res.status(400).json({
      error: true,
      message: `Invalid category "${category}". Valid options: ${VALID_CATEGORIES.join(", ")}`,
    });
  }

  try {
    const url = `https://v2.jokeapi.dev/joke/${matched}?safe-mode`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(normalizeJoke(data));
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

// GET /api/categories  — list all valid categories
app.get("/api/categories", (req, res) => {
  res.json({ categories: VALID_CATEGORIES });
});

// Fallback: serve index.html from root for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎭 Random Joke Service running at http://localhost:${PORT}\n`);
});
