# Holkar TechFest 2026 - College Project Website

A clean, modern, and responsive 4-page technical symposium portal created for **Computer Science (Main)** and **Web Design (Vocational)** curriculum.

---

## 📁 Project Structure

```text
holkar-techfest-2026/
├── index.html        # Page 1: Home page with Live Countdown Timer & Highlights
├── events.html       # Page 2: Competitions directory with Dynamic Category Filter
├── register.html     # Page 3: Delegate Registration Form + Real-time Virtual Pass Preview
├── schedule.html     # Page 4: Two-day Itinerary Tabs, Venue Information & Contact Directory
├── css/
│   └── style.css     # Clean CSS3 with CSS Variables, Flexbox, Grid, & Dark-Tech Glassmorphism
├── js/
│   └── main.js       # Vanilla JS (Countdown, Category Filter, Live DOM Manipulation, LocalStorage)
└── README.md         # Project documentation and Viva guide
```

---

## 🚀 Key Highlights for College Assessment & Viva

### 1. Web Design (Vocational) Features:
* **Modern Dark Tech Palette:** Uses neon cyan (`#00f0ff`), deep indigo, and sleek translucent card backgrounds (glassmorphism).
* **Fully Responsive:** Custom CSS media queries for desktop, tablet, and mobile views.
* **Semantic HTML5:** Proper use of `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, and `<footer>` tags.
* **Interactive UI Elements:** Hover transitions, glowing borders, active navigation indicator lines, and smooth tab switching.

### 2. Computer Science (Logic & JavaScript) Features:
* **Live Countdown Timer:** JavaScript calculating real-time remaining days, hours, minutes, and seconds until the fest date (`new Date()`).
* **Dynamic Category Filter:** Seamless DOM filtering (`data-category` & `data-filter`) on the Events page without page reloads.
* **Live Virtual ID Pass Generator:** Uses event listeners (`input`, `change`) to dynamically update participant details and delegate ID card on the screen in real-time.
* **Browser LocalStorage Integration:** Form submission stores registration data inside the browser's `localStorage` and triggers a confirmation modal.
* **URL Parameter Pre-selection:** Direct links like `register.html?event=WebCraft` automatically pre-select the target event in the dropdown.

---

## 🖥️ How to Run
1. Navigate to the folder:
   `C:\Users\hp\.gemini\antigravity\scratch\holkar-techfest-2026`
2. Simply double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox).
3. No server or node_modules installation required!
