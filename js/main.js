/* ==========================================================================
   JADE - MAIN APPLICATION SCRIPT
   GLOBAL STATE, STORAGE & COMMON UI INTERACTIONS
   ========================================================================== */

// --- Storage Keys ---
const STORAGE_KEYS = {
  CART: 'jade_cart',
  WISHLIST: 'jade_wishlist',
  USER: 'jade_current_user',
  ORDERS: 'jade_orders_list'
};

// --- Global State Helpers ---
function getStoredCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CART);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartBadges();
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
}

function getStoredWishlist() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading wishlist from localStorage', e);
    return [];
  }
}

function saveWishlist(wishlist) {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    updateWishlistBadges();
  } catch (e) {
    console.error('Error saving wishlist to localStorage', e);
  }
}

function getStoredOrders() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders', e);
  }
}

function getCurrentUser() {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

function saveCurrentUser(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (e) {}
}

// --- Auth Requirement & State Helpers ---
function isUserLoggedIn() {
  const user = getCurrentUser();
  return !!(user && user.loggedIn);
}

let pendingAuthAction = null;

function openAuthRequiredModal(actionData = null) {
  pendingAuthAction = actionData;

  let backdrop = document.getElementById('jade-auth-modal-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'jade-auth-modal-backdrop';
    backdrop.className = 'jade-modal-backdrop';
    
    // Check if we are inside /pages/ or root for links
    const isInnerPage = window.location.pathname.includes('/pages/');
    const accountUrl = isInnerPage ? 'account.html' : 'pages/account.html';

    backdrop.innerHTML = `
      <div class="jade-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <button class="jade-modal-close" id="btn-close-auth-modal" aria-label="Đóng">&times;</button>
        
        <div class="jade-modal-header">
          <span class="jade-modal-badge">Yêu cầu đăng nhập</span>
          <h3 id="auth-modal-title" class="jade-modal-title">ĐĂNG NHẬP ĐỂ MUA HÀNG</h3>
          <p class="jade-modal-desc">
            Quý khách vui lòng đăng nhập tài khoản JADE để thêm vào giỏ hàng, nhận ưu đãi hội viên và được cấp chứng thư bảo hành ngọc trọn đời.
          </p>
        </div>

        <form id="jade-quick-auth-form" class="jade-modal-form">
          <div class="form-group">
            <label for="modal-auth-email">Email hoặc Số điện thoại</label>
            <input type="text" id="modal-auth-email" placeholder="Ví dụ: thuha@gmail.com" required value="thuha.jade@gmail.com" />
          </div>
          <div class="form-group">
            <label for="modal-auth-pass">Mật khẩu</label>
            <input type="password" id="modal-auth-pass" placeholder="Nhập mật khẩu" required value="123456" />
          </div>

          <div class="jade-modal-actions">
            <button type="submit" class="btn btn-primary btn-full btn-lg">ĐĂNG NHẬP & TIẾP TỤC</button>
            <button type="button" id="btn-modal-demo-login" class="btn-demo-quick-login">
              ⚡ Đăng Nhập Nhanh (Demo 1-Chạm)
            </button>
          </div>
        </form>

        <div class="jade-modal-footer">
          Chưa có tài khoản? <a href="${accountUrl}">Đăng ký tài khoản JADE tại đây</a>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    // Event listeners
    backdrop.querySelector('#btn-close-auth-modal').addEventListener('click', closeAuthRequiredModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeAuthRequiredModal();
    });

    // Form submit handler
    const form = backdrop.querySelector('#jade-quick-auth-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('modal-auth-email').value.trim() || 'khachhang@gmail.com';
      completeLoginAndResumeAction({
        name: email.split('@')[0].toUpperCase(),
        email: email,
        phone: '0988 888 888',
        address: '24 Hai Bà Trưng, Hoàn Kiếm, Hà Nội',
        loggedIn: true
      });
    });

    // Demo quick login
    backdrop.querySelector('#btn-modal-demo-login').addEventListener('click', () => {
      completeLoginAndResumeAction({
        name: 'Nguyễn Thu Hà (VIP)',
        email: 'thuha.jade@gmail.com',
        phone: '0912 345 678',
        address: '88 Phố Huế, Q. Hai Bà Trưng, Hà Nội',
        loggedIn: true
      });
    });
  }

  // Open backdrop
  requestAnimationFrame(() => {
    // Dynamic text update if modal already existed
    const titleEl = document.getElementById('auth-modal-title');
    const descEl = document.querySelector('.jade-modal-desc');
    const badgeEl = document.querySelector('.jade-modal-badge');
    if (actionData && actionData.title && titleEl) {
      titleEl.textContent = actionData.title;
    } else if (titleEl) {
      titleEl.textContent = 'ĐĂNG NHẬP ĐỂ TIẾP TỤC';
    }
    if (actionData && actionData.desc && descEl) {
      descEl.textContent = actionData.desc;
    } else if (descEl) {
      descEl.textContent = 'Quý khách vui lòng đăng nhập hoặc đăng ký tài khoản JADE để nhận ưu đãi hội viên và được cấp chứng thư bảo hành ngọc trọn đời.';
    }
    if (actionData && actionData.badge && badgeEl) {
      badgeEl.textContent = actionData.badge;
    } else if (badgeEl) {
      badgeEl.textContent = 'Yêu cầu đăng nhập';
    }

    backdrop.classList.add('active');
  });
}

function closeAuthRequiredModal() {
  const backdrop = document.getElementById('jade-auth-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
  }
}

function completeLoginAndResumeAction(user) {
  saveCurrentUser(user);
  closeAuthRequiredModal();
  updateAccountHeaderUI();
  showToast('Đăng nhập thành công', `Chào mừng quý khách ${user.name} đến với JADE!`, 'success');

  if (pendingAuthAction) {
    const act = pendingAuthAction;
    pendingAuthAction = null;

    if (act.type === 'addToCart') {
      setTimeout(() => {
        addToCart(act.productId, act.size, act.quantity, act.showSuccessToast);
      }, 300);
    } else if (act.type === 'buyNow') {
      addToCart(act.productId, act.size, act.quantity, false);
      const isInnerPage = window.location.pathname.includes('/pages/');
      const checkoutUrl = isInnerPage ? 'checkout.html' : 'pages/checkout.html';
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 400);
    } else if (act.type === 'checkout') {
      const isInnerPage = window.location.pathname.includes('/pages/');
      const checkoutUrl = isInnerPage ? 'checkout.html' : 'pages/checkout.html';
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 400);
    } else if (act.type === 'wishlist') {
      setTimeout(() => {
        toggleWishlist(act.productId, act.btnElement);
      }, 300);
    } else if (act.type === 'view_wishlist') {
      const isInnerPage = window.location.pathname.includes('/pages/');
      const wishlistUrl = isInnerPage ? 'wishlist.html' : 'pages/wishlist.html';
      setTimeout(() => {
        window.location.href = wishlistUrl;
      }, 300);
    }
  }
}

function updateAccountHeaderUI() {
  const user = getCurrentUser();
  const accLinks = document.querySelectorAll('a[title="Tài khoản"]');
  accLinks.forEach(link => {
    if (user && user.loggedIn) {
      link.setAttribute('title', `Tài khoản: ${user.name}`);
      link.style.position = 'relative';
      let dot = link.querySelector('.user-auth-dot');
      if (!dot) {
        dot = document.createElement('span');
        dot.className = 'user-auth-dot';
        dot.style.cssText = 'position: absolute; top: 0; right: 0; width: 8px; height: 8px; background: #2E7D32; border-radius: 50%; border: 1.5px solid #FAF9F6;';
        link.appendChild(dot);
      }
    }
  });
}

// --- Cart Actions ---
function addToCart(productId, size = null, quantity = 1, showSuccessToast = true) {
  // Requirement: Must be logged in to add to cart
  if (!isUserLoggedIn()) {
    openAuthRequiredModal({
      type: 'addToCart',
      productId: productId,
      size: size,
      quantity: quantity,
      showSuccessToast: showSuccessToast
    });
    return false;
  }

  const product = getProductById(productId);
  if (!product) return false;

  const cart = getStoredCart();
  const selectedSize = size || (product.sizes && product.sizes.length ? product.sizes[0] : 'Tiêu chuẩn');

  const existingIndex = cart.findIndex(item => item.id === product.id && item.size === selectedSize);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity
    });
  }

  saveCart(cart);

  if (showSuccessToast) {
    showToast(
      'Đã thêm vào giỏ hàng',
      `${product.name} (${selectedSize}) đã được thêm vào giỏ.`,
      'success'
    );
  }
}

function updateCartItemQuantity(productId, size, newQty) {
  let cart = getStoredCart();
  if (newQty <= 0) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
  } else {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
      item.quantity = newQty;
    }
  }
  saveCart(cart);
}

function removeCartItem(productId, size) {
  let cart = getStoredCart();
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart(cart);
  showToast('Đã xóa sản phẩm', 'Sản phẩm đã được gỡ khỏi giỏ hàng.', 'info');
}

// --- Wishlist Actions ---
function toggleWishlist(productId, btnElement = null) {
  // Yêu cầu bắt buộc: Phải đăng nhập / đăng ký tài khoản mới được lưu yêu thích
  if (!isUserLoggedIn()) {
    openAuthRequiredModal({
      type: 'wishlist',
      productId: parseInt(productId, 10),
      btnElement: btnElement,
      badge: 'Yêu thích sản phẩm',
      title: 'ĐĂNG NHẬP ĐỂ LƯU YÊU THÍCH',
      desc: 'Quý khách vui lòng đăng nhập hoặc đăng ký tài khoản JADE để lưu các tuyệt tác vào danh sách yêu thích và nhận thông báo khi có ưu đãi đặc quyền.'
    });
    return false;
  }

  let wishlist = getStoredWishlist();
  const pId = parseInt(productId, 10);
  const exists = wishlist.includes(pId);
  const product = getProductById(pId);

  if (exists) {
    wishlist = wishlist.filter(id => id !== pId);
    saveWishlist(wishlist);
    if (btnElement) btnElement.classList.remove('active');
    showToast('Đã gỡ yêu thích', `Đã xóa ${product ? product.name : 'sản phẩm'} khỏi danh sách.`, 'info');
  } else {
    wishlist.push(pId);
    saveWishlist(wishlist);
    if (btnElement) btnElement.classList.add('active');
    showToast('Đã lưu yêu thích', `Đã thêm ${product ? product.name : 'sản phẩm'} vào danh sách yêu thích.`, 'success');
  }
  updateWishlistUI();
  return true;
}

function isInWishlist(productId) {
  const wishlist = getStoredWishlist();
  return wishlist.includes(parseInt(productId, 10));
}

// --- UI Updates ---
function updateCartBadges() {
  const cart = getStoredCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.badge-cart');
  badges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? 'flex' : 'none';
  });
}

function updateWishlistBadges() {
  const wishlist = getStoredWishlist();
  const count = wishlist.length;
  const badges = document.querySelectorAll('.badge-wishlist');
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

function updateWishlistUI() {
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const id = btn.getAttribute('data-id');
    if (id && isInWishlist(id)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// --- Toast Notification System ---
function showToast(title, message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : (type === 'error' 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0288D1" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`);

  toast.innerHTML = `
    ${icon}
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <p class="toast-msg">${message}</p>
    </div>
    <button class="toast-close" aria-label="Đóng">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  const closeToast = () => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', closeToast);
  setTimeout(closeToast, 4000);
}

// --- Header, Navigation & Common DOM Listeners ---
document.addEventListener('DOMContentLoaded', () => {
  // Update counts & auth state
  updateCartBadges();
  updateWishlistBadges();
  updateWishlistUI();
  updateAccountHeaderUI();

  // Sticky Header
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');

  if (mobileToggle && drawerOverlay) {
    mobileToggle.addEventListener('click', () => {
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeDrawer();
    });
  }

  // Mobile Submenus Accordion
  document.querySelectorAll('.mobile-has-sub').forEach(item => {
    const link = item.querySelector('.mobile-nav-link');
    const submenu = item.querySelector('.mobile-submenu');
    if (link && submenu) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        submenu.classList.toggle('open');
        const arrow = link.querySelector('.mobile-arrow');
        if (arrow) arrow.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : '';
      });
    }
  });

  // Back to Top Button
  let backBtn = document.querySelector('.back-to-top');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Về đầu trang');
    backBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(backBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Newsletter Form handler
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        showToast('Đăng ký thành công!', `Cảm ơn bạn đã tham gia cộng đồng tinh hoa JADE. Ưu đãi 10% sẽ gửi đến email ${input.value}.`, 'success');
        input.value = '';
      }
    });
  });

  // Global Wishlist Click Delegation
  document.body.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('.btn-wishlist');
    if (wishBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = wishBtn.getAttribute('data-id');
      if (id) toggleWishlist(id, wishBtn);
    }

    const quickAddBtn = e.target.closest('.btn-quick-add');
    if (quickAddBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = quickAddBtn.getAttribute('data-id');
      if (id) addToCart(parseInt(id, 10));
    }
  });

  // Populate dynamic images from JADE_DATA.images
  setupDynamicPageImages();
});

// Tự động gán hình ảnh từ JADE_DATA.images cho các trang tĩnh (About, Story, v.v.)
function setupDynamicPageImages() {
  const dataset = (typeof JADE_DATA !== 'undefined') ? JADE_DATA : (typeof window !== 'undefined' ? window.JADE_DATA : null);
  if (!dataset || !dataset.images) return;

  const isPagesDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
  const fixUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) return url;
    if (isPagesDir && !url.startsWith('../') && !url.startsWith('/')) {
      return '../' + url;
    }
    return url;
  };

  // 1. Trang Giới thiệu (About Us) - 3 bước hành trình chế tác
  const editorialImages = document.querySelectorAll('.editorial-img img');
  if (editorialImages.length > 0 && Array.isArray(dataset.images.aboutJourney)) {
    editorialImages.forEach((img, idx) => {
      if (dataset.images.aboutJourney[idx]) {
        img.src = fixUrl(dataset.images.aboutJourney[idx]);
      }
    });
  }

  // 2. Brand Story Strip ở trang chủ
  const storyImg = document.getElementById('home-story-img');
  if (storyImg && dataset.images.brandStory) {
    storyImg.src = fixUrl(dataset.images.brandStory);
  }
}

// Global Helper: Generate HTML for Product Card across all pages
function createProductCardHtml(p, options = {}) {
  const path = options.relativePath || '';
  const isWish = isInWishlist(p.id);
  const getImg = (url) => (typeof resolveProductImg === 'function' ? resolveProductImg(url) : (url || ''));
  const primaryImg = getImg(p.images && p.images[0]);
  const secondaryImg = getImg(p.images && p.images[1] ? p.images[1] : (p.images && p.images[0]));

  let badgeHtml = '';
  if (options.badge) {
    const formatSingleBadge = (b) => {
      if (!b) return '';
      if (b.includes('%')) return `<span class="badge badge-sale">${b}</span>`;
      if (b === 'BEST SELLER' || b === 'BÁN CHẠY') return `<span class="badge badge-bestseller">BÁN CHẠY</span>`;
      return `<span class="badge badge-new">${b}</span>`;
    };
    if (Array.isArray(options.badge)) {
      badgeHtml = options.badge.map(formatSingleBadge).join('');
    } else {
      badgeHtml = formatSingleBadge(options.badge);
    }
  }

  const priceHtml = p.originalPrice
    ? `<div class="product-price-box">
         <span class="product-price sale-price">${formatPrice(p.price)}</span>
         <span class="product-original-price">${formatPrice(p.originalPrice)}</span>
       </div>`
    : `<div class="product-price-box">
         <span class="product-price">${formatPrice(p.price)}</span>
       </div>`;

  return `
    <div class="product-card">
      <div class="product-thumb-wrapper">
        <a href="${path}product-detail.html?id=${p.id}" class="thumb-link" aria-label="${p.name}">
          <img src="${primaryImg}" alt="${p.name}" class="product-thumb thumb-primary" loading="lazy" />
          <img src="${secondaryImg}" alt="${p.name} góc khác" class="product-thumb thumb-secondary" loading="lazy" />
        </a>
        <div class="card-badges">
          ${badgeHtml}
        </div>
        <button class="btn-wishlist ${isWish ? 'active' : ''}" data-id="${p.id}" title="Lưu vào danh sách yêu thích" aria-label="Yêu thích">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <div class="card-actions">
          <button class="btn-quick-add" data-id="${p.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Thêm nhanh
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category-tag">${p.categoryName || ''}</span>
        <h3 class="product-name">
          <a href="${path}product-detail.html?id=${p.id}">${p.name}</a>
        </h3>
        ${priceHtml}
      </div>
    </div>
  `;
}
