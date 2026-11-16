/* ==========================================================================
   JADE - FEEDBACK & REVIEWS HUB CONTROLLER
   ========================================================================== */

let activeFilter = 'all';
let selectedRating = 5;

document.addEventListener('DOMContentLoaded', () => {
  renderFeedbackHero();
  renderCustomerGallery();
  renderFeedbackCards();
  setupFeedbackListeners();
});

function renderFeedbackHero() {
  const heroEl = document.getElementById('feedback-category-hero');
  if (heroEl) {
    const bannerImg = (typeof resolveProductImg === 'function' ? resolveProductImg('../assets/images/banner.jpg') : '../assets/images/banner.jpg');
    heroEl.style.backgroundImage = `url("${bannerImg}")`;
  }
}

function renderCustomerGallery() {
  const container = document.getElementById('customer-photos-strip');
  if (!container) return;

  const getImg = (url) => (typeof resolveProductImg === 'function' ? resolveProductImg(url) : (url || ''));

  const customerMoments = [
    { img: 'assets/images/products/vong-tay-cam-thach-1.jpg', client: 'Chị Mai Lan', title: 'Vòng Ngọc Phỉ Thúy' },
    { img: 'assets/images/products/vong-tay-cam-thach-2.jpg', client: 'Bác Thu Cúc', title: 'Vòng Ngọc Huyết' },
    { img: 'assets/images/products/nhan-cam-thach-1.jpg', client: 'Chị Phương Vy', title: 'Nhẫn Ngọc Hoàng Đế' },
    { img: 'assets/images/products/mat-day-chuyen-1.jpg', client: 'Cô Ngọc Bích', title: 'Mặt Ngọc Phật Bản Mệnh' },
    { img: 'assets/images/products/bong-tai-1.jpg', client: 'Chị Diễm Hương', title: 'Bông Tai Bích Ngọc' },
    { img: 'assets/images/products/vong-hat-1.jpg', client: 'Anh Quốc Bảo', title: 'Chuỗi Hạt Ngọc Niệm Phật' }
  ];

  container.innerHTML = customerMoments.map(m => `
    <div class="customer-photo-item" onclick="window.open('${getImg(m.img)}', '_blank')">
      <img src="${getImg(m.img)}" alt="${m.title}" loading="lazy" />
      <div class="customer-photo-overlay">
        <span>${m.client}</span>
        <span style="font-size: 0.68rem; opacity: 0.85;">${m.title}</span>
      </div>
    </div>
  `).join('');
}

function renderFeedbackCards() {
  const container = document.getElementById('feedback-cards-container');
  const countEl = document.getElementById('feedback-showing-count');
  if (!container) return;

  let reviews = JADE_DATA.reviews || [];

  // Filter logic
  if (activeFilter === 'photo') {
    reviews = reviews.filter(r => r.images && r.images.length > 0);
  } else if (activeFilter === '5star') {
    reviews = reviews.filter(r => (r.rating || 5) === 5);
  } else if (activeFilter === 'vong') {
    reviews = reviews.filter(r => {
      const p = typeof getProductById === 'function' ? getProductById(r.productId) : null;
      return p && (p.category === 'vong-ban' || p.category === 'vong-hat');
    });
  } else if (activeFilter === 'nhan-mat') {
    reviews = reviews.filter(r => {
      const p = typeof getProductById === 'function' ? getProductById(r.productId) : null;
      return p && (p.category === 'nhan-ngoc' || p.category === 'day-chuyen');
    });
  }

  if (countEl) countEl.textContent = `${reviews.length}`;

  if (reviews.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: #fff; border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
        <p style="font-size: 1.05rem; color: var(--color-text-muted); margin-bottom: 1.25rem;">
          Không tìm thấy đánh giá nào phù hợp với bộ lọc đã chọn.
        </p>
        <button type="button" class="btn btn-secondary" onclick="resetFeedbackFilter()">Xem tất cả phản hồi</button>
      </div>
    `;
    return;
  }

  const getImg = (url) => (typeof resolveProductImg === 'function' ? resolveProductImg(url) : (url || ''));

  container.innerHTML = reviews.map(r => {
    const p = typeof getProductById === 'function' ? getProductById(r.productId) : null;
    const prodName = p ? p.name : 'Trang Sức Ngọc Thiên Nhiên JADE';
    const prodLink = p ? `product-detail.html?id=${p.id}` : 'products.html';

    return `
      <div class="feedback-card">
        <div>
          <div class="feedback-card-header">
            <div class="feedback-author-box">
              <img src="${getImg(r.avatar)}" alt="${r.author}" class="feedback-author-avatar" />
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                  <span class="feedback-author-name">${r.author}</span>
                  ${r.verified ? '<span class="feedback-badge-verified">✓ Đã mua hàng</span>' : ''}
                </div>
                <div class="feedback-author-meta">${r.city ? r.city + ' &bull; ' : ''}${r.date || 'Tháng 10, 2025'}</div>
              </div>
            </div>
            <div class="feedback-stars" aria-label="${r.rating || 5} trên 5 sao">
              ${'★'.repeat(r.rating || 5)}${'☆'.repeat(5 - (r.rating || 5))}
            </div>
          </div>

          <h3 class="feedback-card-title">${r.title || 'Tuyệt tác trang sức ngọc thiên nhiên'}</h3>
          <p class="feedback-card-content">${r.content}</p>

          <a href="${prodLink}" class="feedback-product-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Sở hữu: <strong>${prodName}</strong> &rarr;
          </a>

          ${r.images && r.images.length ? `
            <div class="feedback-card-images">
              ${r.images.map(img => `
                <img src="${getImg(img)}" alt="Hình ảnh từ khách hàng" class="feedback-card-img" onclick="window.open('${getImg(img)}', '_blank')" />
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div class="feedback-card-footer">
          <span>Chứng thư kiểm định: <strong>Type A Giám Định Độc Lập</strong></span>
          <button type="button" class="feedback-helpful-btn" onclick="this.innerHTML='✓ Đã cảm ơn (${Math.floor(Math.random() * 5) + 15})'; this.disabled=true;">
            👍 Hữu ích (${Math.floor(Math.random() * 10) + 12})
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function resetFeedbackFilter() {
  activeFilter = 'all';
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
  });
  renderFeedbackCards();
}

function setupFeedbackListeners() {
  // Filter pills
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.getAttribute('data-filter');
      renderFeedbackCards();
    });
  });

  // Toggle feedback form
  const toggleBtn = document.getElementById('btn-toggle-feedback-form');
  const cancelBtn = document.getElementById('btn-cancel-feedback');
  const formCard = document.getElementById('feedback-form-container');
  const form = document.getElementById('feedback-hub-form');
  const starPicker = document.getElementById('feedback-rating-picker');

  if (toggleBtn && formCard) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = formCard.style.display === 'none';
      formCard.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (cancelBtn && formCard) {
    cancelBtn.addEventListener('click', () => {
      formCard.style.display = 'none';
    });
  }

  // Star Picker
  if (starPicker) {
    const starBtns = starPicker.querySelectorAll('.star-btn');
    const updateStars = (val) => {
      selectedRating = val;
      starBtns.forEach(btn => {
        const sVal = parseInt(btn.getAttribute('data-rating'), 10);
        btn.style.color = sVal <= val ? '#D4AF37' : '#D1D5DB';
      });
    };
    updateStars(5);

    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-rating'), 10);
        updateStars(val);
      });
    });
  }

  // Submit Feedback
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fb-input-name').value.trim();
      const contact = document.getElementById('fb-input-contact').value.trim();
      const city = document.getElementById('fb-input-city').value.trim() || 'Hà Nội';
      const prodSelect = document.getElementById('fb-input-product').value;
      const title = document.getElementById('fb-input-title').value.trim();
      const content = document.getElementById('fb-input-content').value.trim();

      const newRev = {
        id: Date.now(),
        productId: parseInt(prodSelect, 10) || 1,
        author: name || 'Quý Khách',
        city: city,
        date: 'Vừa xong',
        rating: selectedRating,
        title: title,
        content: content,
        verified: true,
        avatar: '../assets/images/logo.png',
        images: ['assets/images/products/vong-tay-cam-thach-1.jpg']
      };

      if (!JADE_DATA.reviews) JADE_DATA.reviews = [];
      JADE_DATA.reviews.unshift(newRev);

      form.reset();
      if (formCard) formCard.style.display = 'none';

      if (typeof showToast === 'function') {
        showToast('Kính cảm ơn quý khách! Đánh giá đã được đăng tải thành công.', 'success');
      } else {
        alert('Kính cảm ơn quý khách! Đánh giá đã được đăng tải thành công.');
      }

      renderFeedbackCards();
    });
  }
}
