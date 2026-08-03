# SMTB School Website

A complete reimagining of the SMTB School digital identity — designed to reflect the prestige, Christian values, and academic excellence of one of Africa's finest private Christian schools.

## Project Structure

```
school-website/
│
├── index.html              # Home page
├── about.html              # About page
├── academics.html          # Academics page
├── admissions.html         # Admissions page
├── gallery.html            # Gallery page
├── news.html               # News page
├── contact.html            # Contact page
│
├── assets/
│   ├── css/
│   │      style.css        # Reset, variables, typography, layout, components
│   │      animations.css   # All reusable animation classes & keyframes
│   │      responsive.css   # Media queries only (desktop → mobile)
│   │
│   ├── js/
│   │      app.js           # Navigation, mobile menu, gallery, slider, accordion, tabs
│   │      animations.js    # Intersection Observer, parallax, particles, counters, loader
│   │
│   ├── images/
│   ├── videos/
│   └── icons/
│
└── README.md
```

## Design System

| Token | Value |
|---|---|
| Primary | `#081C3A` |
| Secondary | `#0F4FA8` |
| Accent | `#D4AF37` |
| Background | `#FFFFFF` / `#F7F8FA` |
| Text | `#1A1A1A` |
| Headings | Playfair Display |
| Body | Inter |
| Buttons | Poppins |

## Architecture

- **No inline CSS.** No inline JavaScript. All styles and scripts are external and reusable.
- **Three CSS files only:** `style.css` (components), `animations.css` (all keyframes), `responsive.css` (media queries).
- **Two JS files only:** `app.js` (interactions), `animations.js` (animation logic).
- **Shared navigation and footer** are written semantically in each page; styling is centralised in `style.css`.
- **Modular structure** designed for easy integration into Laravel Blade — each HTML page maps to a Blade template, and `assets/` maps to `public/assets/`.

## Pages

| Page | Sections |
|---|---|
| **Home** | Hero, Principal's Welcome, Core Values, Academics, Why Choose SMTB, School Levels, Facilities, Gallery Preview, Achievements, Testimonials, News, Admissions Process, CTA, Footer |
| **About** | Page header, Mission/Vision, History Timeline, Core Values, Leadership |
| **Academics** | Page header, School levels detail, Curriculum tabs, Faculty |
| **Admissions** | Page header, Process timeline, Requirements accordion, Fees, Apply CTA |
| **Gallery** | Page header, Filterable masonry gallery, Lightbox |
| **News** | Page header, Featured + grid layout, Article cards |
| **Contact** | Page header, Contact info, Form, Map |

## Features

- Glass-effect sticky navigation with gold underline animations
- 100vh hero with floating particles, animated heading, scroll indicator, and statistics bar
- Scroll-triggered reveal animations (fade-up, fade-left, fade-right, zoom, blur-in)
- Parallax scrolling and mouse-movement effects
- Animated counters for statistics
- Pinterest-style masonry gallery with category filtering and lightbox
- Auto-playing testimonial slider with glassmorphism cards
- Accordion and tab components
- Button ripple and magnetic button effects
- Page loader with progress bar
- Scroll progress indicator
- Back-to-top button
- Animated SVG wave divider in footer
- Fully responsive (desktop, laptop, tablet, mobile)
- Accessible, semantic HTML, SEO-friendly meta tags
- `prefers-reduced-motion` support

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Production build
```

## Credits

- Photography: [Pexels](https://pexels.com) (license-free)
- Fonts: Google Fonts (Playfair Display, Inter, Poppins)
- Icons: Inline SVG (no external icon library)
