const API_URL = "https://flamers-backend.onrender.com/api/relationship";
let currentMode = "classic";

const music = document.getElementById("themeMusic");
let musicOn = false;

const MEANINGS = {
  classic: [
    {
      letter: "F",
      title: "Friends",
      desc: "Great friendship energy between you two.",
    },
    {
      letter: "L",
      title: "Love",
      desc: "There’s a romantic spark in the air.",
    },
    {
      letter: "A",
      title: "Affection",
      desc: "Deep emotional connection detected.",
    },
    {
      letter: "M",
      title: "Marriage",
      desc: "Long-term destiny vibes and commitment.",
    },
    { letter: "E", title: "Enemies", desc: "Perhaps not the best match." },
    { letter: "S", title: "Siblings", desc: "More of a sibling bond vibe." },
  ],
  genz: [
    { letter: "V", title: "Vibes", desc: "Energy is matching effortlessly." },
    { letter: "I", title: "In Love", desc: "This one hits different." },
    { letter: "B", title: "Besties", desc: "Zero romance. 100% loyalty." },
    { letter: "E", title: "Ex Energy", desc: "It’s complicated…" },
    { letter: "R", title: "Red Flag", desc: "Proceed with caution." },
    { letter: "S", title: "Soulmate", desc: "Cosmic alignment achieved." },
  ],
};

// Initialize on page load
window.addEventListener("load", () => {
  renderHistory();
  updateThemeButtons();
  renderMeanings();
  setMode(currentMode);
});

// ========== THEME MANAGEMENT ==========

function setMode(mode) {
  currentMode = mode;
  document.body.className = mode;
  updateThemeButtons();
  renderMeanings();

  // Set music based on theme
  if (mode === "classic") {
    music.src = "assets/classic.mp3";
  } else {
    music.src = "assets/genz.mp3";
  }

  // Resume music if it was playing
  if (musicOn) {
    music.play().catch(() => {
      console.log("Music playback failed - checking browser autoplay policy");
    });
  }
}

function updateThemeButtons() {
  const classicBtn = document.getElementById("classicBtn");
  const genzBtn = document.getElementById("genzBtn");

  if (classicBtn) {
    classicBtn.classList.toggle("active", currentMode === "classic");
  }
  if (genzBtn) {
    genzBtn.classList.toggle("active", currentMode === "genz");
  }
}

// ========== CALCULATION & API ==========

function handleSubmit(event) {
  event.preventDefault();
  calculate();
}

async function calculate() {
  const name1 = document.getElementById("name1").value.trim();
  const name2 = document.getElementById("name2").value.trim();

  if (!name1 || !name2) {
    alert("Please enter both names");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name1, name2, mode: currentMode }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Display result
    const resultContainer = document.getElementById("resultContainer");
    document.getElementById("resultText").innerText = data.data.result;
    document.getElementById("verseText").innerText = data.data.verse;
    resultContainer.style.display = "block";

    // Save to history
    saveHistory(name1, name2, data.data.result);

    // Scroll result into view
    setTimeout(() => {
      document.getElementById("resultContainer").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  } catch (error) {
    console.error("Error:", error);
    alert(`Failed to reveal your destiny: ${error.message}`);
  }
}

// ========== HISTORY MANAGEMENT ==========

function saveHistory(name1, name2, result) {
  let history = JSON.parse(localStorage.getItem("flamesHistory")) || [];

  // Add new entry at the beginning
  history.unshift(`${name1} ❤️ ${name2} → ${result}`);

  // Keep only last 5 entries
  if (history.length > 5) {
    history = history.slice(0, 5);
  }

  localStorage.setItem("flamesHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem("flamesHistory")) || [];
  const list = document.getElementById("history");

  if (!list) return;

  list.innerHTML = "";

  if (history.length === 0) {
    list.innerHTML =
      '<li style="text-align: center; opacity: 0.6;">No results yet</li>';
    return;
  }

  history.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    li.style.cursor = "pointer";
    li.addEventListener("mouseenter", () => {
      li.style.background = "rgba(255, 255, 255, 0.15)";
    });
    list.appendChild(li);
  });
}

function clearHistory() {
  if (confirm("Are you sure you want to clear all history?")) {
    localStorage.removeItem("flamesHistory");
    renderHistory();
  }
}

function toggleHistory() {
  const drawer = document.getElementById("historyDrawer");
  drawer.classList.toggle("show");
}

// Close history drawer when clicking outside
document.addEventListener("click", function (event) {
  const drawer = document.getElementById("historyDrawer");
  const toggle = document.querySelector(".history-toggle");
  const historyToggle = document.querySelector(".history-toggle");

  if (
    drawer &&
    historyToggle &&
    !drawer.contains(event.target) &&
    !historyToggle.contains(event.target) &&
    drawer.classList.contains("show")
  ) {
    drawer.classList.remove("show");
  }
});

// ========== MUSIC MANAGEMENT ==========

function toggleMusic() {
  if (!music.src) {
    setMode(currentMode);
  }

  if (musicOn) {
    music.pause();
    musicOn = false;
  } else {
    music.play().catch(() => {
      console.log(
        "Music playback failed - browser autoplay policy may be blocking it",
      );
      musicOn = false;
    });
    musicOn = true;
  }
}

function renderMeanings() {
  const grid = document.getElementById("meaningGrid");
  if (!grid) return;

  grid.innerHTML = "";

  MEANINGS[currentMode].forEach((item) => {
    const div = document.createElement("div");
    div.className = "meaning-item";

    div.innerHTML = `
            <div class="meaning-icon">${item.letter}</div>
            <div class="meaning-content">
                <strong>${item.title}</strong>
                <p>${item.desc}</p>
            </div>
        `;

    grid.appendChild(div);
  });
}
