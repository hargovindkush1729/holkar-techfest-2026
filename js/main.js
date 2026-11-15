// ========================================================
// HOLKAR TECHFEST 2026 - Main JavaScript Engine
// Covers: Countdown Timer, Category Filter, Real-time Pass
// Generator, Schedule Tabs, and Mobile Navigation.
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCountdown();
  initEventFilter();
  initRegistrationPass();
  initScheduleTabs();
  initEventPreselect();
});

// --------------------------------------------------------
// 1. Mobile Navigation Toggle
// --------------------------------------------------------
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
}

// --------------------------------------------------------
// 2. Live Countdown Timer (Target: Fest Date)
// --------------------------------------------------------
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');

  if (!daysEl) return; // Exit if not on home page

  // Fest Target Date: December 18, 2026
  const targetDate = new Date('2026-12-18T09:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minsEl.innerText = '00';
      secsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minsEl.innerText = String(minutes).padStart(2, '0');
    secsEl.innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// --------------------------------------------------------
// 3. Category Filter Logic (For events.html)
// --------------------------------------------------------
function initEventFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card[data-category]');

  if (filterBtns.length === 0 || eventCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');

      // Filter cards
      eventCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          card.style.animation = 'popIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --------------------------------------------------------
// 4. Live Virtual Pass Generator & LocalStorage (register.html)
// --------------------------------------------------------
function initRegistrationPass() {
  const regForm = document.getElementById('registrationForm');
  if (!regForm) return;

  // Form Inputs
  const nameInput = document.getElementById('fullName');
  const collegeInput = document.getElementById('collegeName');
  const eventSelect = document.getElementById('eventSelect');
  const emailInput = document.getElementById('email');

  // Live Pass Preview Elements
  const previewName = document.getElementById('passName');
  const previewCollege = document.getElementById('passCollege');
  const previewEvent = document.getElementById('passEvent');
  const previewId = document.getElementById('passId');
  const barcodeNumber = document.getElementById('barcodeNumber');

  // Generate random delegate ID
  const randomId = 'HLK-' + Math.floor(100000 + Math.random() * 900000);
  if (previewId) previewId.innerText = randomId;
  if (barcodeNumber) barcodeNumber.innerText = '*' + randomId + '*';

  // Real-time input listeners (DOM Manipulation)
  nameInput?.addEventListener('input', (e) => {
    previewName.innerText = e.target.value.trim() || 'Your Name';
  });

  collegeInput?.addEventListener('input', (e) => {
    previewCollege.innerText = e.target.value.trim() || 'Holkar Science College / Institution';
  });

  eventSelect?.addEventListener('change', (e) => {
    previewEvent.innerText = e.target.value || 'General Delegate';
  });

  // Handle Form Submission
  regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Prepare Registration Object
    const registrationData = {
      id: randomId,
      name: nameInput.value,
      email: emailInput.value,
      college: collegeInput.value,
      event: eventSelect.value,
      date: new Date().toLocaleDateString()
    };

    // Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('holkar_techfest_regs') || '[]');
      existing.push(registrationData);
      localStorage.setItem('holkar_techfest_regs', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage unavailable:', err);
    }

    // Show Confirmation Modal
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.classList.add('active');
    }
  });

  // Print Pass Functionality
  const printBtn = document.getElementById('printPassBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close Modal Button
  const closeModalBtn = document.getElementById('closeModalBtn');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('successModal');
      if (modal) modal.classList.remove('active');
      regForm.reset();
      previewName.innerText = 'Your Name';
      previewCollege.innerText = 'Holkar Science College / Institution';
      previewEvent.innerText = 'Selected Event';
    });
  }
}

// --------------------------------------------------------
// 5. Pre-select Event from URL Query (e.g. ?event=WebCraft)
// --------------------------------------------------------
function initEventPreselect() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedEvent = urlParams.get('event');
  const eventSelect = document.getElementById('eventSelect');
  const previewEvent = document.getElementById('passEvent');

  if (selectedEvent && eventSelect) {
    for (let option of eventSelect.options) {
      if (option.value.toLowerCase().includes(selectedEvent.toLowerCase())) {
        option.selected = true;
        if (previewEvent) previewEvent.innerText = option.value;
        break;
      }
    }
  }
}

// --------------------------------------------------------
// 6. Schedule Day Switcher Tabs (schedule.html)
// --------------------------------------------------------
function initScheduleTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const day1Content = document.getElementById('day1Schedule');
  const day2Content = document.getElementById('day2Schedule');

  if (!tabBtns.length || !day1Content || !day2Content) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetDay = btn.getAttribute('data-day');
      if (targetDay === 'day1') {
        day1Content.style.display = 'block';
        day2Content.style.display = 'none';
      } else {
        day1Content.style.display = 'none';
        day2Content.style.display = 'block';
      }
    });
  });
}
