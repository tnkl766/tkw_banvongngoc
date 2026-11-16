/* ==========================================================================
   JADE - PRODUCT DETAIL CONTROLLER
   ========================================================================== */

let currentProduct = null;
let selectedSize = null;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'), 10) || 1;

  currentProduct = getProductById(productId) || JADE_DATA.products[0];
  selectedSize = currentProduct.sizes && currentProduct.sizes.length ? currentProduct.sizes[0] : 'Tiêu chuẩn';

  renderProductDetails();
  renderProductReviews();
  renderRelatedProducts();
  setupDetailListeners();
  setupReviewListeners();
});

function renderProductDetails() {
  const p = currentProduct;
  document.title = `${p.name} | JADE – Natural Gemstone Jewelry`;

  // Breadcrumbs
  const breadcrumbCategory = document.getElementById('detail-breadcrumb-cat');
  const breadcrumbCurrent = document.getElementById('detail-breadcrumb-current');
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = p.categoryName;
    breadcrumbCategory.href = `products.html?cat=${p.category}`;
  }
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = p.name;

  // Title, SKU, Rating
  const titleEl = document.getElementById('detail-product-name');
  const skuEl = document.getElementById('detail-product-sku');
  const descEl = document.getElementById('detail-product-desc');
  const ratingScoreEl = document.getElementById('detail-rating-score');
  const reviewCountEl = document.getElementById('detail-review-count');
  if (titleEl) titleEl.textContent = p.name;
  if (skuEl) skuEl.textContent = p.sku;
  if (descEl) descEl.textContent = p.description;
  if (ratingScoreEl) ratingScoreEl.textContent = (p.rating || 5.0).toFixed(1);
  if (reviewCountEl) reviewCountEl.textContent = `${p.reviewCount || 18}`;

  // Price
  const priceBox = document.getElementById('detail-price-box');
  if (priceBox) {
    if (p.originalPrice) {
      priceBox.innerHTML = `
        <span class="detail-current-price" style="color: var(--color-sale);">${formatPrice(p.price)}</span>
        <span class="detail-original-price">${formatPrice(p.originalPrice)}</span>
        <span class="badge badge-sale">Tiết kiệm ${p.discountPercent}%</span>
      `;
    } else {
      priceBox.innerHTML = `
        <span class="detail-current-price">${formatPrice(p.price)}</span>
      `;
    }
  }

  // Stock status
  const stockEl = document.getElementById('detail-stock-status');
  if (stockEl) {
    stockEl.innerHTML = p.stock > 0 
      ? `<span style="color: var(--color-success); font-weight: 500;">&bull; Còn hàng (Sẵn sàng giao ngay)</span>`
      : `<span style="color: var(--color-error); font-weight: 500;">&bull; Tạm hết hàng</span>`;
  }

  // Gallery
  const getImg = (url) => (typeof resolveProductImg === 'function' ? resolveProductImg(url) : (url || ''));
  const mainImg = document.getElementById('gallery-main-image');
  const thumbsContainer = document.getElementById('gallery-thumbs-row');
  if (mainImg) mainImg.src = getImg(p.images[0]);

  if (thumbsContainer) {
    thumbsContainer.innerHTML = p.images.map((img, idx) => `
      <div class="thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${getImg(img)}" alt="${p.name} góc ${idx + 1}" />
      </div>
    `).join('');
  }

  // Size/Variant Selector
  const sizeContainer = document.getElementById('detail-sizes-group');
  if (sizeContainer) {
    sizeContainer.innerHTML = (p.sizes || ['Tiêu chuẩn']).map((s, idx) => `
      <button type="button" class="size-pill ${idx === 0 ? 'active' : ''}" data-size="${s}">
        ${s}
      </button>
    `).join('');
  }

  // Accordion Details
  const accDesc = document.getElementById('acc-content-desc');
  const accMaterial = document.getElementById('acc-content-material');
  const accCare = document.getElementById('acc-content-care');

  if (accDesc) {
    accDesc.innerHTML = `
      <p>${p.description}</p>
      <ul style="list-style: disc; padding-left: 1.25rem; margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.35rem;">
        ${p.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;
  }

  if (accMaterial) {
    accMaterial.innerHTML = `
      <p><strong>Chất liệu ngọc:</strong> ${p.material}</p>
      <p><strong>Màu sắc nguyên bản:</strong> ${p.color}</p>
      <p><strong>Chứng thư giám định:</strong> Đi kèm chứng thư kiểm định độc lập (SJC / PNJ / GIA) niêm phong vỉ có mã QR tra cứu cơ sở dữ liệu quốc gia.</p>
    `;
  }

  if (accCare) {
    accCare.innerHTML = `
      <p>${p.care}</p>
      <p>Quý khách được miễn phí vệ sinh bằng sóng siêu âm và đánh bóng làm mới trọn đời tại tất cả các showroom JADE trên toàn quốc.</p>
    `;
  }

  // Wishlist button state
  const wishBtn = document.getElementById('detail-wishlist-btn');
  if (wishBtn) {
    wishBtn.setAttribute('data-id', p.id);
    if (isInWishlist(p.id)) wishBtn.classList.add('active');
  }
}

function setupDetailListeners() {
  // Gallery Thumbnail clicks
  const thumbsContainer = document.getElementById('gallery-thumbs-row');
  const mainImg = document.getElementById('gallery-main-image');
  if (thumbsContainer && mainImg) {
    thumbsContainer.addEventListener('click', (e) => {
      const thumb = e.target.closest('.thumb-item');
      if (thumb) {
        document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const idx = parseInt(thumb.getAttribute('data-index'), 10);
        mainImg.src = getImg(currentProduct.images[idx]);
      }
    });
  }

  // Size pill clicks
  const sizeContainer = document.getElementById('detail-sizes-group');
  if (sizeContainer) {
    sizeContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.size-pill');
      if (pill) {
        document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedSize = pill.getAttribute('data-size');
      }
    });
  }

  // Quantity stepper
  const qtyInput = document.getElementById('detail-quantity-input');
  const btnMinus = document.getElementById('detail-qty-minus');
  const btnPlus = document.getElementById('detail-qty-plus');

  if (btnMinus && qtyInput) {
    btnMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) {
        val -= 1;
        qtyInput.value = val;
        currentQuantity = val;
      }
    });
  }

  if (btnPlus && qtyInput) {
    btnPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      val += 1;
      qtyInput.value = val;
      currentQuantity = val;
    });
  }

  // Add to cart button
  const addCartBtn = document.getElementById('detail-btn-add-cart');
  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      addToCart(currentProduct.id, selectedSize, currentQuantity);
    });
  }

  // Buy Now button
  const buyNowBtn = document.getElementById('detail-btn-buy-now');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', () => {
      if (!isUserLoggedIn()) {
        openAuthRequiredModal({
          type: 'buyNow',
          productId: currentProduct.id,
          size: selectedSize,
          quantity: currentQuantity
        });
        return;
      }
      addToCart(currentProduct.id, selectedSize, currentQuantity, false);
      window.location.href = 'checkout.html';
    });
  }

  // Detail Wishlist button
  const wishBtn = document.getElementById('detail-wishlist-btn');
  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      toggleWishlist(currentProduct.id, wishBtn);
    });
  }

  // Accordion Expand/Collapse
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion by default
  const firstAccordion = document.querySelector('.accordion-item');
  if (firstAccordion) {
    firstAccordion.classList.add('active');
    const c = firstAccordion.querySelector('.accordion-content');
    if (c) c.style.maxHeight = c.scrollHeight + 'px';
  }
}

function renderRelatedProducts() {
  const container = document.getElementById('detail-related-products-grid');
  if (!container || !currentProduct) return;

  const related = JADE_DATA.products
    .filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.collection === currentProduct.collection))
    .slice(0, 4);

  // Fallback to random if not enough
  const displayList = related.length >= 4 
    ? related 
    : JADE_DATA.products.filter(p => p.id !== currentProduct.id).slice(0, 4);

  container.innerHTML = displayList.map(p => createProductCardHtml(p, { relativePath: '' })).join('');
  updateWishlistUI();
}

/* ==========================================================================
   PRODUCT REVIEWS & FEEDBACK CONTROLLER
   ========================================================================== */

let selectedReviewRating = 5;

function renderProductReviews() {
  if (!currentProduct) return;
  const p = currentProduct;
  const reviews = typeof getProductReviews === 'function' 
    ? getProductReviews(p.id) 
    : (JADE_DATA.reviews || []).slice(0, 4);

  const totalCount = p.reviewCount || reviews.length || 18;
  const avgRating = (p.rating || 5.0).toFixed(1);

  // Update summary score & count
  const scoreEl = document.getElementById('detail-rev-summary-score');
  const countEl = document.getElementById('detail-rev-total-count');
  const starsEl = document.getElementById('detail-rev-summary-stars');
  if (scoreEl) scoreEl.textContent = avgRating;
  if (countEl) countEl.textContent = totalCount;
  if (starsEl) {
    const fullStars = Math.round(parseFloat(avgRating));
    starsEl.textContent = '★'.repeat(fullStars) + '☆'.repeat(Math.max(0, 5 - fullStars));
  }

  // Calculate Breakdown
  const breakdownEl = document.getElementById('detail-rev-breakdown');
  if (breakdownEl) {
    // Generate realistic distribution
    const counts = { 5: Math.round(totalCount * 0.88), 4: Math.round(totalCount * 0.09), 3: Math.max(1, Math.round(totalCount * 0.02)), 2: 0, 1: 0 };
    const maxVal = Math.max(1, totalCount);

    breakdownEl.innerHTML = [5, 4, 3, 2, 1].map(star => {
      const c = counts[star] || 0;
      const pct = Math.round((c / maxVal) * 100);
      return `
        <div class="breakdown-row">
          <span class="breakdown-label">${star} sao</span>
          <div class="breakdown-bar-bg">
            <div class="breakdown-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <span class="breakdown-count">${c}</span>
        </div>
      `;
    }).join('');
  }

  // Render Reviews List
  const listEl = document.getElementById('product-reviews-list');
  if (listEl) {
    if (reviews.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 2.5rem; background: #fff; border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
          <p style="font-size: 1rem; color: var(--color-text-muted); margin-bottom: 1rem;">Chưa có đánh giá nào cho riêng tác phẩm này. Hãy là người đầu tiên chia sẻ cảm nhận!</p>
          <button type="button" class="btn btn-primary" onclick="document.getElementById('btn-toggle-review-form').click()">Viết đánh giá ngay</button>
        </div>
      `;
      return;
    }

    const getImg = (url) => (typeof resolveProductImg === 'function' ? resolveProductImg(url) : (url || ''));

    listEl.innerHTML = reviews.map(r => `
      <div class="review-item-card">
        <div class="review-card-header">
          <div class="reviewer-profile">
            <img src="${getImg(r.avatar)}" alt="${r.author}" class="reviewer-avatar" />
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span class="reviewer-name">${r.author}</span>
                ${r.verified ? '<span class="reviewer-tag">✓ Đã xác thực mua hàng</span>' : ''}
              </div>
              <div class="review-card-date">${r.city ? r.city + ' &bull; ' : ''}${r.date || 'Tháng 10, 2025'}</div>
            </div>
          </div>
          <div class="review-card-stars" aria-label="${r.rating} trên 5 sao">
            ${'★'.repeat(r.rating || 5)}${'☆'.repeat(5 - (r.rating || 5))}
          </div>
        </div>

        <h4 class="review-card-title">${r.title || 'Tuyệt tác trang sức ngọc thiên nhiên'}</h4>
        <p class="review-card-content">${r.content}</p>

        ${r.images && r.images.length ? `
          <div class="review-images-grid">
            ${r.images.map(img => `
              <img src="${getImg(img)}" alt="Hình ảnh thực tế từ khách hàng" class="review-attached-img" onclick="window.open('${getImg(img)}', '_blank')" />
            `).join('')}
          </div>
        ` : ''}

        <div class="review-card-footer">
          <span>Sản phẩm: <strong>${p.name}</strong></span>
          <button type="button" class="helpful-btn" onclick="this.innerHTML='✓ Đã cảm ơn (${Math.floor(Math.random() * 5) + 12})'; this.disabled=true;">
            👍 Hữu ích (${Math.floor(Math.random() * 8) + 6})
          </button>
        </div>
      </div>
    `).join('');
  }
}

function setupReviewListeners() {
  const toggleBtn = document.getElementById('btn-toggle-review-form');
  const cancelBtn = document.getElementById('btn-cancel-review');
  const formContainer = document.getElementById('product-review-form-container');
  const form = document.getElementById('product-review-form');
  const starPicker = document.getElementById('review-rating-picker');

  if (toggleBtn && formContainer) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = formContainer.style.display === 'none';
      formContainer.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (cancelBtn && formContainer) {
    cancelBtn.addEventListener('click', () => {
      formContainer.style.display = 'none';
    });
  }

  // Star rating picker
  if (starPicker) {
    const starBtns = starPicker.querySelectorAll('.star-btn');
    const updateStarDisplay = (val) => {
      selectedReviewRating = val;
      starBtns.forEach(btn => {
        const starVal = parseInt(btn.getAttribute('data-rating'), 10);
        btn.style.color = starVal <= val ? '#D4AF37' : '#D1D5DB';
      });
    };
    updateStarDisplay(5);

    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-rating'), 10);
        updateStarDisplay(val);
      });
    });
  }

  // Form submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('review-input-name').value.trim();
      const contact = document.getElementById('review-input-contact').value.trim();
      const title = document.getElementById('review-input-title').value.trim();
      const content = document.getElementById('review-input-content').value.trim();

      const newReview = {
        id: Date.now(),
        productId: currentProduct ? currentProduct.id : 1,
        author: name || 'Quý Khách Hàng',
        city: 'Việt Nam',
        date: 'Vừa xong',
        rating: selectedReviewRating,
        title: title,
        content: content,
        verified: true,
        avatar: '../assets/images/logo.png',
        images: []
      };

      if (!JADE_DATA.reviews) JADE_DATA.reviews = [];
      JADE_DATA.reviews.unshift(newReview);

      if (currentProduct) {
        currentProduct.reviewCount = (currentProduct.reviewCount || 18) + 1;
      }

      form.reset();
      if (formContainer) formContainer.style.display = 'none';

      if (typeof showToast === 'function') {
        showToast('Trân trọng cảm ơn quý khách! Đánh giá đã được ghi nhận thành công.', 'success');
      } else {
        alert('Trân trọng cảm ơn quý khách! Đánh giá đã được ghi nhận thành công.');
      }

      renderProductReviews();
    });
  }
}
