/* ============================================
   SCRIPT.JS — Para Errahali
   Animations, Interactions, UI Logic
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Navbar Scroll Effect ── */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Menu ── */
  const hamburger = document.querySelector(".nav-hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ── Scroll Reveal (Intersection Observer) ── */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ── Animated Counters ── */
  const counters = document.querySelectorAll(".stat-number[data-target]");
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ── Shop: Render Products ── */
  const productsGrid = document.getElementById("productsGrid");
  const filterTags = document.querySelectorAll(".filter-tag");
  const searchInput = document.getElementById("searchInput");

  if (productsGrid) {
    renderProducts("all", "");

    if (filterTags.length) {
      filterTags.forEach(tag => {
        tag.addEventListener("click", () => {
          filterTags.forEach(t => t.classList.remove("active"));
          tag.classList.add("active");
          renderProducts(tag.dataset.category, searchInput ? searchInput.value : "");
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const activeFilter = document.querySelector(".filter-tag.active");
        const cat = activeFilter ? activeFilter.dataset.category : "all";
        renderProducts(cat, searchInput.value);
      });
    }
  }

  function renderProducts(category, query) {
    if (!productsGrid || typeof PRODUCTS === "undefined") return;

    let filtered = PRODUCTS;

    if (category && category !== "all") {
      filtered = filtered.filter(p => p.category === category);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" stroke-width="1.5" style="margin-bottom:16px;">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p style="font-family:var(--font-heading);font-size:1.1rem;color:var(--gray-600);margin-bottom:8px;">No products found</p>
          <span style="font-size:.9rem;color:var(--gray-400);">Try a different search or category</span>
        </div>`;
      return;
    }

    productsGrid.innerHTML = filtered.map((p, i) => `
      <div class="product-card reveal reveal-delay-${(i % 4) + 1}">
        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
          <button class="product-quick-add" onclick="addToCart(${p.id})" aria-label="Add to cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
        <div class="product-info">
          <p class="product-category">${p.category.replace("-", " ")}</p>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-bottom">
            <span class="product-price">${p.price.toFixed(2)} DH</span>
            <button class="product-add-btn" onclick="addToCart(${p.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
    `).join("");

    /* re-observe new reveal elements */
    const newReveals = productsGrid.querySelectorAll(".reveal");
    const revealObserver2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    newReveals.forEach(el => revealObserver2.observe(el));
  }

  /* ── Featured Products (Home Page) ── */
  const featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid && typeof PRODUCTS !== "undefined") {
    const featured = PRODUCTS.filter(p =>
      ["Bestseller", "Popular", "Essential", "New"].includes(p.badge)
    ).slice(0, 6);

    featuredGrid.innerHTML = featured.map((p, i) => `
      <div class="product-card reveal reveal-delay-${(i % 4) + 1}">
        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
          <button class="product-quick-add" onclick="addToCart(${p.id})" aria-label="Add to cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
        <div class="product-info">
          <p class="product-category">${p.category.replace("-", " ")}</p>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-bottom">
            <span class="product-price">${p.price.toFixed(2)} DH</span>
            <button class="product-add-btn" onclick="addToCart(${p.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ── Contact Form (prevent submission, show toast) ── */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Message sent! We'll get back to you soon.");
      contactForm.reset();
    });
  }

  /* ── Parallax on hero background elements ── */
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      const cross = document.querySelector(".hero-bg-cross");
      if (cross) cross.style.transform = `translateY(calc(-50% + ${scroll * 0.15}px))`;
    }, { passive: true });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

});
