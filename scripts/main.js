/* main.js */
document.addEventListener('DOMContentLoaded', function () {
  // year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // NAV TOGGLE (accessible)
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav--open');
    });
  }

  // TABS (progressive enhancement)
  document.querySelectorAll('[data-tabs]').forEach(function (container) {
    const tabs = container.querySelectorAll('[role="tab"]');
    const panels = container.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
        panels.forEach(p => p.hidden = true);
        tab.setAttribute('aria-selected', 'true');
        panels[idx].hidden = false;
      });
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          const next = (idx + 1) % tabs.length;
          tabs[next].focus();
        } else if (e.key === 'ArrowLeft') {
          const prev = (idx - 1 + tabs.length) % tabs.length;
          tabs[prev].focus();
        }
      });
    });
  });

  // SIMPLE SLIDER NAV (scroll-snap)
  const slider = document.getElementById('dest-slider');
  if (slider) {
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    function scrollByWidth(dir = 1) {
      const card = slider.querySelector('.slide');
      if (!card) return;
      const width = card.getBoundingClientRect().width + parseFloat(getComputedStyle(slider).gap || 16);
      slider.scrollBy({ left: dir * width, behavior: 'smooth' });
    }
    if (prevBtn) prevBtn.addEventListener('click', () => scrollByWidth(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollByWidth(1));
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
