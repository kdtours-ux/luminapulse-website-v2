// 凝境影像 v2 - 主要 JavaScript
// DZOFILM Inspired Interactions

(function() {
  'use strict';

  // ========== NAVIGATION SCROLL EFFECT ==========
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  function handleNavScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========== SCROLL REVEAL ANIMATION ==========
  const revealElements = document.querySelectorAll('.philosophy-card, .service-v2-card, .portfolio-card');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in', 'visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('fade-in');
    revealObserver.observe(el);
  });

  // ========== HERO PARALLAX ==========
  const heroSection = document.querySelector('.hero-v2');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroContent = heroSection.querySelector('.hero-v2-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
      }
    }, { passive: true });
  }

  // ========== NAV LINKS ACTIVE STATE ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ========== FORM HANDLING ==========
  // Netlify Forms handles submission automatically
  // This script provides enhanced UX feedback
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Show loading state when form is submitted
    contactForm.addEventListener('submit', function() {
      const submitBtn = this.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = submitBtn.textContent.includes('Send') ? 'Sending...' : '發送中...';
      submitBtn.disabled = true;
      
      // Netlify will handle the actual submission
      // After submission, Netlify redirects to a success page or shows a success message
      setTimeout(() => {
        submitBtn.textContent = submitBtn.textContent.includes('Sending') ? 'Sent!' : '已發送！';
        submitBtn.style.background = '#4CAF50';
      }, 1000);
    });
  }

  // ========== PORTFOLIO HOVER EFFECTS ==========
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const iframe = this.querySelector('iframe');
      if (iframe) {
        // Optional: Start playing on hover
        // iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    });
  });

  // ========== INITIALIZE ==========
  document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
      document.querySelectorAll('.hero-v2-tag, .hero-v2 h1, .hero-v2-subtitle, .hero-v2-tagline, .hero-v2-cta').forEach(el => {
        el.style.animationPlayState = 'running';
      });
    }, 100);
  });

})();
