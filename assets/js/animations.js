// ===========================================
// SMTB SCHOOL — ANIMATION LOGIC
// animations.js
// Intersection Observer, reveal, parallax,
// mouse movement, hero animation, counter,
// loading screen, scroll progress, text reveal,
// floating particles
// ===========================================

(function () {
  'use strict';

  // ===========================================
  // Loading Screen
  // ===========================================
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('loader--hidden');
        setTimeout(function () { loader.style.display = 'none'; }, 600);
      }, 800);
    });
    // Fallback: hide after 3s no matter what
    setTimeout(function () {
      loader.classList.add('loader--hidden');
      setTimeout(function () { loader.style.display = 'none'; }, 600);
    }, 3000);
  }

  // ===========================================
  // Scroll Progress Bar
  // ===========================================
  const progressBar = document.querySelector('.scroll-progress');

  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ===========================================
  // Intersection Observer — Reveal Animations
  // ===========================================
  const revealElements = document.querySelectorAll(
    '.reveal, .fade-up, .fade-left, .fade-right, .zoom, .scale, .blur-in, .slide-up, .slide-left, .text-reveal, .section-transition'
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ===========================================
  // Counter Animation (triggered on scroll)
  // ===========================================
  const counters = document.querySelectorAll('[data-counter]');

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (window.SMTB && window.SMTB.animateCounter) {
          window.SMTB.animateCounter(entry.target);
        } else {
          // Fallback counter
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-counter'));
          const suffix = el.getAttribute('data-suffix') || '';
          el.textContent = target.toLocaleString() + suffix;
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(function (c) { counterObserver.observe(c); });

  // ===========================================
  // Hero Title — Word-by-word reveal
  // ===========================================
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    // Split into words while preserving HTML tags like <span class="accent">
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const words = [];

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach(function (part) {
          if (part.trim()) {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = part;
            words.push(span);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const inner = [];
        node.childNodes.forEach(function (child) {
          if (child.nodeType === Node.TEXT_NODE) {
            child.textContent.split(/(\s+)/).forEach(function (part) {
              if (part.trim()) inner.push(part);
            });
          }
        });
        inner.forEach(function (word, i) {
          const span = document.createElement('span');
          span.className = 'word ' + node.className;
          span.textContent = word;
          words.push(span);
        });
      }
    }

    Array.from(tempDiv.childNodes).forEach(processNode);

    heroTitle.innerHTML = '';
    words.forEach(function (word, i) {
      word.style.animationDelay = (0.15 + i * 0.08) + 's';
      heroTitle.appendChild(word);
      heroTitle.appendChild(document.createTextNode(' '));
    });
  }

  // ===========================================
  // Parallax (scroll-based)
  // ===========================================
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  function handleParallax() {
    const scrollY = window.scrollY;
    parallaxElements.forEach(function (el) {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      const offset = scrollY * speed;
      el.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
    });
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ===========================================
  // Mouse Parallax (hero elements)
  // ===========================================
  const mouseParallaxElements = document.querySelectorAll('[data-mouse-parallax]');
  const hero = document.querySelector('.hero');

  if (hero && mouseParallaxElements.length) {
    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseParallaxElements.forEach(function (el) {
        const depth = parseFloat(el.getAttribute('data-mouse-parallax')) || 20;
        const moveX = x * depth;
        const moveY = y * depth;
        el.style.transform = 'translate3d(' + moveX + 'px, ' + moveY + 'px, 0)';
      });
    });

    hero.addEventListener('mouseleave', function () {
      mouseParallaxElements.forEach(function (el) {
        el.style.transform = '';
      });
    });
  }

  // ===========================================
  // Floating Particles (hero)
  // ===========================================
  const particlesContainer = document.querySelector('.hero__particles');
  if (particlesContainer) {
    const particleCount = 18;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = '-10px';
      particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.opacity = Math.random() * 0.4 + 0.1;
      particlesContainer.appendChild(particle);
    }
  }

  // ===========================================
  // Smooth Scroll for anchor links
  // ===========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===========================================
  // Active nav link based on section in view
  // ===========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link[data-section]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              'navbar__link--active',
              link.getAttribute('data-section') === id
            );
          });
        }
      });
    }, { threshold: 0.5, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

})();
