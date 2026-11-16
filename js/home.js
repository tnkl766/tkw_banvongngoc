/* ==========================================================================
   JADE - HOMEPAGE CONTROLLER WITH AUTO-SLIDER & JM SEARCH BAR
   TẤT CẢ DỮ LIỆU & HÌNH ẢNH ĐƯỢC LOAD DYNAMIC TỪ JADE_DATA (js/data.js)
   ========================================================================== */

let currentSlideIndex = 0;
let slideInterval = null;
const SLIDE_DURATION = 2500; // 2.5 seconds auto-slide as requested

function initHomePage() {
  // Chỉ chạy trên trang chủ có slider hoặc danh mục trang chủ
  if (!document.querySelector('.hero-slider-section') && !document.getElementById('home-categories-grid')) {
    return;
  }
  renderHeroSlider();
  renderBrandStory();
  renderHomeCategories();
  renderHomeCollections();
  renderNewArrivals();
  renderBestSellers();
  renderSpecialOffers();
  renderReviews();
  setupHeroAutoSlider();
  setupJmSearch();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}

// 1. Render Hero Slider dynamically from JADE_DATA.images.heroSlides
function renderHeroSlider() {
  const container = document.querySelector('.hero-slider-container');
  const dotsContainer = document.querySelector('.slider-dots');
  const dataset = (typeof JADE_DATA !== 'undefined') ? JADE_DATA : (typeof window !== 'undefined' ? window.JADE_DATA : null);
  const slides = (dataset && dataset.images && dataset.images.heroSlides) ? dataset.images.heroSlides : null;

  if (!container || !slides || slides.length === 0) return;

  container.innerHTML = slides.map((slide, idx) => `
    <div class="hero-slide ${idx === 0 ? 'active' : ''}" data-slide="${idx}">
      <img 
        src="${slide.image}" 
        alt="${slide.alt || 'Trang sức ngọc JADE'}" 
        class="slide-bg-img"
        ${slide.objectPosition ? `style="object-position: ${slide.objectPosition};"` : ''}
      />
      <div class="container slide-content-container">
        <div class="slide-text-col">
          <${idx === 0 ? 'h1' : 'h2'} class="slide-calligraphy-title">${slide.title}</${idx === 0 ? 'h1' : 'h2'}>
          <p class="slide-subtitle">${slide.subtitle}</p>
          <a href="${slide.buttonLink || 'pages/products.html'}" class="btn-slide-pill">${slide.buttonText || 'KHÁM PHÁ'}</a>
        </div>
      </div>
    </div>
  `).join('');

  if (dotsContainer) {
    dotsContainer.innerHTML = slides.map((_, idx) => `
      <button type="button" class="slider-dot ${idx === 0 ? 'active' : ''}" data-slide-index="${idx}" aria-label="Slide ${idx + 1}"></button>
    `).join('');
  }
}

// 2. Render Brand Story image dynamically from JADE_DATA.images.brandStory
function renderBrandStory() {
  const storyImg = document.querySelector('.story-strip-image img') || document.getElementById('home-story-img');
  const dataset = (typeof JADE_DATA !== 'undefined') ? JADE_DATA : (typeof window !== 'undefined' ? window.JADE_DATA : null);
  if (storyImg && dataset && dataset.images && dataset.images.brandStory) {
    storyImg.src = dataset.images.brandStory;
  }
}

// Setup JM-Style Hero Auto-Slider
function setupHeroAutoSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const btnPrev = document.querySelector('.slider-prev');
  const btnNext = document.querySelector('.slider-next');
  const sliderSection = document.querySelector('.hero-slider-section');

  if (!slides || slides.length === 0) return;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    currentSlideIndex = index;
  }

  function nextSlide() {
    let next = (currentSlideIndex + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Next & Prev Click
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  // Dots click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide-index'), 10);
      showSlide(idx);
      startAutoPlay();
    });
  });

  // Start initial autoplay
  startAutoPlay();
}

// Setup JM Search Bar ("Bạn muốn tìm sản phẩm gì ?" + "Tìm kiếm ngay")
function setupJmSearch() {
  const form = document.getElementById('jm-search-form');
  const input = document.getElementById('jm-search-input');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (q) {
        window.location.href = `pages/search.html?q=${encodeURIComponent(q)}`;
      } else {
        window.location.href = 'pages/search.html';
      }
    });
  }

  // Keyword tags click
  document.querySelectorAll('.keyword-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const kw = pill.getAttribute('data-keyword');
      if (kw) {
        window.location.href = `pages/search.html?q=${encodeURIComponent(kw)}`;
      }
    });
  });
}

// Render 6 main categories
function renderHomeCategories() {
  const container = document.getElementById('home-categories-grid');
  if (!container) return;

  const categories = JADE_DATA.categories;
  container.innerHTML = categories.map(cat => `
    <a href="pages/products.html?cat=${cat.slug}" class="category-card" title="${cat.name}">
      <img src="${cat.image}" alt="${cat.name}" class="category-image" loading="lazy" />
      <div class="category-overlay">
        <span class="category-count">${cat.itemCount} Tuyệt tác</span>
        <h3 class="category-title">${cat.name}</h3>
        <span class="category-link-text">Khám phá ngay &rarr;</span>
      </div>
    </a>
  `).join('');
}

// Render Featured Collections from JADE_DATA.collections
function renderHomeCollections() {
  const container = document.getElementById('home-collections-grid');
  const dataset = (typeof JADE_DATA !== 'undefined') ? JADE_DATA : (typeof window !== 'undefined' ? window.JADE_DATA : null);
  if (!container || !dataset || !dataset.collections) return;

  const collections = dataset.collections.slice(0, 3);
  container.innerHTML = collections.map((col, idx) => {
    const colImg = typeof resolveProductImg === 'function' ? resolveProductImg(col.image) : col.image;
    return `
    <div class="collection-card">
      <img src="${colImg}" alt="${col.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';" />
      <div class="collection-content">
        <span class="collection-tag">BỘ SƯU TẬP 0${idx + 1}</span>
        <h3 class="collection-title">${col.name}</h3>
        <p class="collection-desc">${col.desc}</p>
        <a href="pages/collection-detail.html?col=${col.id}" class="btn btn-white btn-sm">Xem Chi Tiết &rarr;</a>
      </div>
    </div>
  `;
  }).join('');
}

// Render New Arrivals
function renderNewArrivals() {
  const container = document.getElementById('new-arrivals-grid');
  if (!container) return;

  const newProducts = JADE_DATA.products.filter(p => p.isNew).slice(0, 8);
  container.innerHTML = newProducts.map(p => createProductCardHtml(p, { badge: 'MỚI', relativePath: 'pages/' })).join('');
  updateWishlistUI();
}

// Render Best Sellers
function renderBestSellers() {
  const container = document.getElementById('best-sellers-grid');
  if (!container) return;

  const bestProducts = JADE_DATA.products.filter(p => p.isBestSeller).slice(0, 8);
  container.innerHTML = bestProducts.map(p => createProductCardHtml(p, { badge: 'BÁN CHẠY', relativePath: 'pages/' })).join('');
  updateWishlistUI();
}

// Render Special Offers
function renderSpecialOffers() {
  const container = document.getElementById('special-offers-grid');
  if (!container) return;

  const saleProducts = JADE_DATA.products.filter(p => p.discountPercent).slice(0, 8);
  container.innerHTML = saleProducts.map(p => createProductCardHtml(p, { badge: `-${p.discountPercent}%`, relativePath: 'pages/' })).join('');
  updateWishlistUI();
}

// Render Customer Reviews (Chỉ hiển thị 4 đánh giá tiêu biểu nhất trên trang chủ)
function renderReviews() {
  const container = document.getElementById('home-reviews-grid');
  if (!container) return;

  const reviews = (JADE_DATA.reviews || []).slice(0, 4);
  const getImg = (url) => (typeof resolveProductImg === 'function' ? resolveProductImg(url) : (url || ''));

  container.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-stars">
        ${Array(r.rating || 5).fill('<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>').join('')}
      </div>
      <p class="review-text">"${r.content}"</p>
      <div class="review-author">
        <img src="${getImg(r.avatar)}" alt="${r.author}" class="author-avatar" loading="lazy" />
        <div>
          <div class="author-name">${r.author}</div>
          <div class="author-sub">${r.city ? r.city + ' &bull; ' : ''}${r.verified ? 'Đã mua hàng' : 'Khách hàng VIP'}</div>
        </div>
      </div>
    </div>
  `).join('');
}
