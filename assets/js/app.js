// ===========================================
// SMTB SCHOOL — APP LOGIC
// app.js
// Navigation, mobile menu, sticky navbar, gallery,
// testimonial slider, counter, accordion, tabs,
// back-to-top, dark overlay
// ===========================================

(function () {
  'use strict';

  // ===========================================
  // Sticky Navigation
  // ===========================================
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  function handleScroll() {
    const scrolled = window.scrollY > 60;
    if (navbar) navbar.classList.toggle('navbar--scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('back-to-top--visible', window.scrollY > 600);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===========================================
  // Mobile Menu
  // ===========================================
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');

  function openMenu() {
    if (toggle) toggle.classList.add('navbar__toggle--open');
    if (mobileMenu) mobileMenu.classList.add('mobile-menu--open');
    if (overlay) overlay.classList.add('overlay--active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (toggle) toggle.classList.remove('navbar__toggle--open');
    if (mobileMenu) mobileMenu.classList.remove('mobile-menu--open');
    if (overlay) overlay.classList.remove('overlay--active');
    document.body.style.overflow = '';
  }

  if (toggle) toggle.addEventListener('click', function () {
    if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-menu__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // ===========================================
  // Back to Top
  // ===========================================
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===========================================
  // Gallery Filter
  // ===========================================
  const filters = document.querySelectorAll('.gallery-filter');
  const items = document.querySelectorAll('.gallery-item');

  filters.forEach(function (filter) {
    filter.addEventListener('click', function () {
      const category = this.getAttribute('data-filter');

      filters.forEach(function (f) { f.classList.remove('gallery-filter--active'); });
      this.classList.add('gallery-filter--active');

      items.forEach(function (item) {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('gallery-item--hidden');
        } else {
          item.classList.add('gallery-item--hidden');
        }
      });
    });
  });

  // ===========================================
  // Lightbox
  // ===========================================
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox__img');
  const lightboxCaption = document.querySelector('.lightbox__caption');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxPrev = document.querySelector('.lightbox__nav--prev');
  const lightboxNext = document.querySelector('.lightbox__nav--next');

  let currentImages = [];
  let currentIndex = 0;

  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    showImage();
    if (lightbox) lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
  }

  function showImage() {
    if (!lightboxImg || !currentImages.length) return;
    const img = currentImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    if (lightboxCaption) lightboxCaption.textContent = img.alt || '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage();
  }

  document.querySelectorAll('.gallery-item').forEach(function (item, i) {
    item.addEventListener('click', function () {
      const visible = Array.from(document.querySelectorAll('.gallery-item:not(.gallery-item--hidden)'));
      const imgs = visible.map(function (el) {
        const imgEl = el.querySelector('img');
        return { src: imgEl.src, alt: imgEl.alt };
      });
      const idx = visible.indexOf(item);
      openLightbox(imgs, idx >= 0 ? idx : 0);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
  if (lightbox) lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // ===========================================
  // Testimonial Slider
  // ===========================================
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonials-dot');
  const prevBtn = document.querySelector('.testimonials-arrow--prev');
  const nextBtn = document.querySelector('.testimonials-arrow--next');
  const testimonialCount = document.querySelectorAll('.testimonial-card').length;
  let currentSlide = 0;
  let slideTimer = null;

  function goToSlide(index) {
    currentSlide = (index + testimonialCount) % testimonialCount;
    if (track) track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    dots.forEach(function (dot, i) {
      dot.classList.toggle('testimonials-dot--active', i === currentSlide);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    slideTimer = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 6000);
  }

  function stopAutoplay() {
    if (slideTimer) clearInterval(slideTimer);
  }

  if (nextBtn) nextBtn.addEventListener('click', function () {
    goToSlide(currentSlide + 1);
    startAutoplay();
  });
  if (prevBtn) prevBtn.addEventListener('click', function () {
    goToSlide(currentSlide - 1);
    startAutoplay();
  });
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToSlide(i);
      startAutoplay();
    });
  });

  if (track && testimonialCount > 0) {
    startAutoplay();
    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
    }
  }

  // ===========================================
  // Counter Animation
  // ===========================================
  const counters = document.querySelectorAll('[data-counter]');

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      if (target % 1 !== 0) {
        el.textContent = value.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(value).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = (target % 1 !== 0 ? target.toFixed(1) : target.toLocaleString()) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // ===========================================
  // Accordion
  // ===========================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      const item = header.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('accordion-item--open');

      // Close all others
      document.querySelectorAll('.accordion-item').forEach(function (other) {
        other.classList.remove('accordion-item--open');
        const otherBody = other.querySelector('.accordion-body');
        if (otherBody) otherBody.style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('accordion-item--open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ===========================================
  // Tabs
  // ===========================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(function (b) { b.classList.remove('tab-btn--active'); });
      btn.classList.add('tab-btn--active');

      tabPanels.forEach(function (panel) {
        panel.classList.toggle('tab-panel--active', panel.id === target);
      });
    });
  });

  // ===========================================
  // Contact Form
  // ===========================================
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const success = contactForm.querySelector('.form-success');
      if (success) {
        success.classList.add('form-success--show');
        setTimeout(function () { success.classList.remove('form-success--show'); }, 4000);
      }
      contactForm.reset();
    });
  }

  // ===========================================
  // Newsletter Form
  // ===========================================
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input) {
        input.value = '';
        input.placeholder = 'Thank you for subscribing!';
        setTimeout(function () { input.placeholder = 'Enter your email'; }, 3000);
      }
    });
  }

  // ===========================================
  // Button Ripple Effect
  // ===========================================
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.classList.add('ripple');
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

  // ===========================================
  // Magnetic Buttons
  // ===========================================
  document.querySelectorAll('.magnetic-wrap').forEach(function (wrap) {
    const btn = wrap.querySelector('.btn');
    if (!btn) return;
    const strength = 0.3;

    wrap.addEventListener('mousemove', function (e) {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * strength) + 'px, ' + (y * strength) + 'px)';
    });

    wrap.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

  // ===========================================
  // Expose counter trigger for animations.js
  // ===========================================
  window.SMTB = window.SMTB || {};
  window.SMTB.animateCounter = animateCounter;
  window.SMTB.counters = counters;

})();
