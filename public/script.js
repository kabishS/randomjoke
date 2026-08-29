/* ===================================================
   Random Joke Service — Frontend Script
   =================================================== */

// ---- DOM References ----
const getJokeBtn  = document.getElementById("getJokeBtn");
const copyBtn     = document.getElementById("copyBtn");
const revealBtn   = document.getElementById("revealBtn");
const themeToggle = document.getElementById("themeToggle");
const jokeSetup   = document.getElementById("jokeSetup");
const jokePunchline = document.getElementById("jokePunchline");
const cardCategory = document.getElementById("cardCategory");
const jokeCard    = document.getElementById("jokeCard");
const spinner     = document.getElementById("spinner");
const jokeCount   = document.getElementById("jokeCount");
const toast       = document.getElementById("toast");
const catBtns     = document.querySelectorAll(".cat-btn");

// ---- State ----
let currentCategory = "Any";
let currentJoke     = null;   // { type, joke?, setup?, delivery?, category }
let count           = parseInt(localStorage.getItem("jokeCount") || "0", 10);
let toastTimer      = null;
let isLoading       = false;

// ---- Init ----
jokeCount.textContent = count;
applyTheme(localStorage.getItem("theme") || "dark");

// ---- Theme ----
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

// ---- Category Selection ----
catBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    catBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.cat;
    fetchJoke();
  });
});

// ---- Fetch Joke ----
async function fetchJoke() {
  if (isLoading) return;
  isLoading = true;

  // Show spinner, hide content
  jokeSetup.classList.add("hidden");
  jokePunchline.classList.add("hidden");
  revealBtn.classList.add("hidden");
  spinner.classList.remove("hidden");
  getJokeBtn.disabled = true;

  try {
    const endpoint =
      currentCategory === "Any"
        ? "/api/joke"
        : `/api/joke/${currentCategory}`;

    const res  = await fetch(endpoint);
    const data = await res.json();

    if (data.error) throw new Error(data.message);

    currentJoke = data;
    displayJoke(data);

    // Increment counter
    count++;
    jokeCount.textContent = count;
    localStorage.setItem("jokeCount", count);
  } catch (err) {
    showError(err.message || "Failed to fetch joke. Please try again.");
  } finally {
    spinner.classList.add("hidden");
    jokeSetup.classList.remove("hidden");
    getJokeBtn.disabled = false;
    isLoading = false;
  }
}

// ---- Display Joke ----
function displayJoke(joke) {
  // Category badge
  const categoryEmojis = {
    Programming: "💻", Misc: "🎪", Dark: "🖤",
    Pun: "😜", Spooky: "👻", Christmas: "🎄", Any: "🎲"
  };
  const emoji = categoryEmojis[joke.category] || "🎭";
  cardCategory.textContent = `${emoji} ${joke.category}`;

  // Remove old animation
  jokeCard.classList.remove("animate-in");
  void jokeCard.offsetWidth; // reflow to restart animation
  jokeCard.classList.add("animate-in");

  if (joke.type === "single") {
    jokeSetup.textContent = joke.joke;
    jokePunchline.classList.add("hidden");
    revealBtn.classList.add("hidden");
  } else {
    // Two-part joke: show setup, hide punchline until revealed
    jokeSetup.textContent = joke.setup;
    jokePunchline.textContent = joke.delivery;
    jokePunchline.classList.add("hidden");
    revealBtn.classList.remove("hidden");
    revealBtn.textContent = "👀 Reveal Punchline";
    revealBtn.disabled = false;
  }
}

// ---- Reveal Punchline ----
revealBtn.addEventListener("click", () => {
  jokePunchline.classList.remove("hidden");
  jokePunchline.classList.remove("punchline-reveal");
  void jokePunchline.offsetWidth;
  jokePunchline.classList.add("punchline-reveal");
  revealBtn.textContent = "😂 Ba dum tss!";
  revealBtn.disabled = true;
});

// ---- Copy to Clipboard ----
copyBtn.addEventListener("click", () => {
  if (!currentJoke) {
    showToast("No joke to copy yet! Get one first 😅");
    return;
  }
  let text = "";
  if (currentJoke.type === "single") {
    text = currentJoke.joke;
  } else {
    text = `${currentJoke.setup}\n\n${currentJoke.delivery}`;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Joke copied to clipboard!");
  }).catch(() => {
    showToast("❌ Could not copy. Please copy manually.");
  });
});

// ---- Get Joke Button ----
getJokeBtn.addEventListener("click", fetchJoke);

// ---- Keyboard Shortcuts ----
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
  if (e.code === "Space" || e.code === "Enter") {
    e.preventDefault();
    fetchJoke();
  }
});

// ---- Show Error ----
function showError(msg) {
  jokeSetup.textContent = "⚠️ " + msg;
  cardCategory.textContent = "— Error —";
  jokePunchline.classList.add("hidden");
  revealBtn.classList.add("hidden");
}

// ---- Toast Notification ----
function showToast(message, duration = 2800) {
  if (toastTimer) clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.remove("hidden");
  toastTimer = setTimeout(() => toast.classList.add("hidden"), duration);
}
