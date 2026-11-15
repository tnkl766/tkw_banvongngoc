/* ==========================================================================
   JADE - PRODUCTS & CATEGORY CONTROLLER
   FILTERING, SORTING, SEARCH & PAGINATION
   ========================================================================== */

// Hàm hỗ trợ tự động chuẩn hoá đường dẫn ảnh khi chạy từ thư mục con /pages/
function fixImgPath(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('../')) {
    return url;
  }
  if (url.startsWith('assets/')) {
    return '../' + url;
  }
  return url;
}

// Danh mục sản phẩm trung tâm dùng làm hình ảnh & banner trang sản phẩm
const PRODUCT_CATEGORIES = [
  {
    slug: 'all',
    name: 'Tất Cả Sản Phẩm',
    shortName: 'Tất Cả',
    subtitle: 'BỘ SƯU TẬP TOÀN DIỆN',
    desc: 'Trọn bộ 36 tuyệt tác trang sức ngọc thiên nhiên tuyển chọn độc bản, thấu quang và tinh tế.',
    image: 'assets/images/product/pb.jpg',
    bannerImage: 'assets/images/product/pb.jpg',
    itemCount: 36
  },
  {
    slug: 'vong-ban',
    name: 'Vòng Bản',
    shortName: 'Vòng Bản',
    subtitle: 'NGỌC LIỀN KHỐI BẢN TRÒN & BẢN HẸ',
    desc: 'Tuyệt tác vòng ngọc bản tròn, bản hẹ Jadeite thiên nhiên tuyển chọn, thấu quang và ngậm sắc ngọc thanh tao.',
    image: 'assets/images/itm12.jpg',
    bannerImage: 'assets/images/itm12.jpg',
    itemCount: 10
  },
  {
    slug: 'vong-hat',
    name: 'Vòng Hạt',
    shortName: 'Vòng Hạt',
    subtitle: 'CHUỖI HẠT NGỌC THUẦN KHIẾT',
    desc: 'Chuỗi vòng ngọc hạt tròn, chuỗi 108 hạt thuần khiết, mang năng lượng phong thuỷ bình an trường cửu.',
    image: 'assets/images/itm8.jpg',
    bannerImage: 'assets/images/itm8.jpg',
    itemCount: 4
  },
  {
    slug: 'nhan-ngoc',
    name: 'Nhẫn Ngọc',
    shortName: 'Nhẫn Ngọc',
    subtitle: 'CABOCHON HOÀNG GIA',
    desc: 'Nhẫn đính ngọc Jadeite mài cabochon giác tròn kết hợp vàng hồng 18K và kim cương thiên nhiên tinh xảo.',
    image: 'assets/images/itm10.jpg',
    bannerImage: 'assets/images/itm10.jpg',
    itemCount: 7
  },
  {
    slug: 'day-chuyen',
    name: 'Dây Chuyền Ngọc',
    shortName: 'Dây Chuyền',
    subtitle: 'MẶT NGỌC PHONG THUỶ',
    desc: 'Mặt dây chuyền ngọc tự nhiên chạm khắc Như Ý, Hồ Lô và giọt ngọc lục đế vương thanh lịch.',
    image: 'assets/images/itm9.jpg',
    bannerImage: 'assets/images/itm9.jpg',
    itemCount: 7
  },
  {
    slug: 'bong-tai',
    name: 'Bông Tai Ngọc',
    shortName: 'Bông Tai',
    subtitle: 'NỤ NGỌC & GIỌT NƯỚC',
    desc: 'Điểm xuyết vẻ đẹp quý phái cho gương mặt với hoa tai ngọc phỉ thúy dáng giọt nước đung đưa kiêu kỳ.',
    image: 'assets/images/itm(8).jpg',
    bannerImage: 'assets/images/itm(8).jpg',
    itemCount: 5
  },
  {
    slug: 'trang-suc-da-quy',
    name: 'Trang Sức Đá Quý',
    shortName: 'Đá Quý & Charm',
    subtitle: 'NĂNG LƯỢNG THIÊN NHIÊN',
    desc: 'Sự kết hợp hoàn mỹ giữa ngọc quý, ngọc trai biển Nam và các dòng đá quý năng lượng cao cấp.',
    image: 'assets/images/itm7.jpg',
    bannerImage: 'assets/images/itm7.jpg',
    itemCount: 3
  }
];

// Hàm tự động đồng bộ 100% với JADE_DATA trong js/data.js (Tránh mọi xung đột dữ liệu)
function syncCategoriesFromData() {
  const dataset = (typeof JADE_DATA !== 'undefined') ? JADE_DATA : (typeof window !== 'undefined' ? window.JADE_DATA : null);
  if (!dataset || !dataset.categories) return;

  dataset.categories.forEach(cat => {
    const pc = PRODUCT_CATEGORIES.find(c => c.slug === cat.slug || c.slug === cat.id);
    if (pc) {
      pc.name = cat.name;
      pc.desc = cat.desc;
      if (cat.image) {
        pc.image = fixImgPath(cat.image);
        pc.bannerImage = fixImgPath(cat.image);
      }
      if (cat.itemCount) pc.itemCount = cat.itemCount;
    }
  });

  if (dataset.images && dataset.images.productsHero) {
    PRODUCT_CATEGORIES[0].image = fixImgPath(dataset.images.productsHero);
    PRODUCT_CATEGORIES[0].bannerImage = fixImgPath(dataset.images.productsHero);
  }
}
syncCategoriesFromData();

// Số lượng sản phẩm hiển thị trên mỗi trang (21 sản phẩm / trang)
const ITEMS_PER_PAGE = 21;

let currentFilters = {
  category: 'all',
  priceRange: 'all',
  material: 'all',
  color: 'all',
  tag: 'all',
  sortBy: 'default',
  searchQuery: '',
  page: 1
};

document.addEventListener('DOMContentLoaded', () => {
  parseUrlParams();
  renderCategoryVisualStrip();
  setupFilterListeners();
  setupSortListener();
  applyFiltersAndRender();
  setupMobileFilterDrawer();
});

// Hỗ trợ nút Back / Forward trên trình duyệt
window.addEventListener('popstate', () => {
  parseUrlParams();
  applyFiltersAndRender();
});

// Render thanh danh mục bằng hình ảnh thu nhỏ ở đầu trang sản phẩm
function renderCategoryVisualStrip() {
  const container = document.getElementById('products-category-strip');
  if (!container) return;

  // Luôn đảm bảo đồng bộ mới nhất từ JADE_DATA.categories
  syncCategoriesFromData();

  container.innerHTML = PRODUCT_CATEGORIES.map(cat => {
    const isActive = (currentFilters.category || 'all') === cat.slug;
    return `
      <div class="cat-strip-item ${isActive ? 'active' : ''}" data-cat="${cat.slug}" title="${cat.name}">
        <div class="cat-strip-img-wrapper">
          <img src="${fixImgPath(cat.image)}" alt="${cat.name}" class="cat-strip-img" loading="lazy" />
        </div>
        <span class="cat-strip-title">${cat.shortName || cat.name}</span>
      </div>
    `;
  }).join('');

  // Bắt sự kiện khi click vào từng ảnh danh mục
  container.querySelectorAll('.cat-strip-item').forEach(item => {
    item.addEventListener('click', () => {
      const selectedSlug = item.getAttribute('data-cat');
      currentFilters.category = selectedSlug;
      currentFilters.page = 1;

      // Đồng bộ với nút radio ở thanh bộ lọc sidebar
      const catRadio = document.querySelector(`input[name="catFilter"][value="${selectedSlug}"]`);
      if (catRadio) catRadio.checked = true;

      // Cập nhật URL trình duyệt
      const newUrl = new URL(window.location);
      if (selectedSlug === 'all') {
        newUrl.searchParams.delete('cat');
      } else {
        newUrl.searchParams.set('cat', selectedSlug);
      }
      newUrl.searchParams.delete('page');
      window.history.pushState({}, '', newUrl);

      // Render lại danh sách sản phẩm và ảnh banner
      applyFiltersAndRender();
    });
  });
}

// Parse query params like ?cat=vong-cam-thach or ?filter=sale
function parseUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.has('cat')) {
    currentFilters.category = urlParams.get('cat');
    const catRadio = document.querySelector(`input[name="catFilter"][value="${currentFilters.category}"]`);
    if (catRadio) catRadio.checked = true;
  }

  if (urlParams.has('filter')) {
    currentFilters.tag = urlParams.get('filter');
    const tagRadio = document.querySelector(`input[name="tagFilter"][value="${currentFilters.tag}"]`);
    if (tagRadio) tagRadio.checked = true;
  }

  if (urlParams.has('sort')) {
    currentFilters.sortBy = urlParams.get('sort');
    const sortSelect = document.getElementById('sort-products-select');
    if (sortSelect) sortSelect.value = currentFilters.sortBy;
  }

  if (urlParams.has('q')) {
    currentFilters.searchQuery = urlParams.get('q').toLowerCase();
  }

  if (urlParams.has('page')) {
    const pageNum = parseInt(urlParams.get('page'), 10);
    if (!isNaN(pageNum) && pageNum > 0) {
      currentFilters.page = pageNum;
    }
  }
}

function setupFilterListeners() {
  // Category Radios
  document.querySelectorAll('input[name="catFilter"]').forEach(el => {
    el.addEventListener('change', (e) => {
      currentFilters.category = e.target.value;
      currentFilters.page = 1;
      applyFiltersAndRender();
    });
  });

  // Price Radios
  document.querySelectorAll('input[name="priceFilter"]').forEach(el => {
    el.addEventListener('change', (e) => {
      currentFilters.priceRange = e.target.value;
      currentFilters.page = 1;
      applyFiltersAndRender();
    });
  });

  // Color Radios
  document.querySelectorAll('input[name="colorFilter"]').forEach(el => {
    el.addEventListener('change', (e) => {
      currentFilters.color = e.target.value;
      currentFilters.page = 1;
      applyFiltersAndRender();
    });
  });

  // Tag Radios (New, Best Seller, Sale)
  document.querySelectorAll('input[name="tagFilter"]').forEach(el => {
    el.addEventListener('change', (e) => {
      currentFilters.tag = e.target.value;
      currentFilters.page = 1;
      applyFiltersAndRender();
    });
  });

  // Reset Filters Button
  const resetBtn = document.getElementById('btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFilters = {
        category: 'all',
        priceRange: 'all',
        material: 'all',
        color: 'all',
        tag: 'all',
        sortBy: 'default',
        searchQuery: '',
        page: 1
      };
      
      // Reset DOM inputs
      document.querySelectorAll('.filter-sidebar input[type="radio"]').forEach(r => {
        if (r.value === 'all') r.checked = true;
        else r.checked = false;
      });
      const sortSelect = document.getElementById('sort-products-select');
      if (sortSelect) sortSelect.value = 'default';

      // Clear search and page from URL
      const newUrl = new URL(window.location);
      newUrl.searchParams.delete('cat');
      newUrl.searchParams.delete('filter');
      newUrl.searchParams.delete('sort');
      newUrl.searchParams.delete('q');
      newUrl.searchParams.delete('page');
      window.history.pushState({}, '', newUrl);

      applyFiltersAndRender();
    });
  }
}

function setupSortListener() {
  const sortSelect = document.getElementById('sort-products-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentFilters.sortBy = e.target.value;
      currentFilters.page = 1;
      applyFiltersAndRender();
    });
  }
}

function applyFiltersAndRender() {
  let list = [...JADE_DATA.products];

  // Dynamically update Page Hero Banner, Image & Breadcrumbs based on selected category or tag
  const heroSection = document.getElementById('products-category-hero') || document.querySelector('.category-banner-hero');
  const heroTitleEl = document.getElementById('products-hero-title') || document.querySelector('.section-title');
  const heroSubtitleEl = document.getElementById('products-hero-subtitle') || document.querySelector('.category-banner-hero .section-subtitle');
  const heroDescEl = document.getElementById('products-hero-desc') || document.querySelector('.section-desc');
  const breadcrumbActive = document.getElementById('products-breadcrumb-active') || document.querySelector('.breadcrumb .breadcrumb-item.active');

  syncCategoriesFromData();
  const selectedCat = PRODUCT_CATEGORIES.find(c => c.slug === (currentFilters.category || 'all')) || PRODUCT_CATEGORIES[0];

  // Update Hero Banner Background Image & Content
  if (heroSection && selectedCat) {
    let bg = selectedCat.bannerImage || selectedCat.image;
    if (selectedCat.slug === 'all' && typeof JADE_DATA !== 'undefined' && JADE_DATA.images && JADE_DATA.images.productsHero) {
      bg = JADE_DATA.images.productsHero;
    }
    heroSection.style.backgroundImage = `url('${fixImgPath(bg)}')`;
  }

  if (currentFilters.category && currentFilters.category !== 'all') {
    if (heroTitleEl) heroTitleEl.textContent = selectedCat.name.toUpperCase();
    if (heroSubtitleEl) heroSubtitleEl.textContent = selectedCat.subtitle || 'DANH MỤC TRANG SỨC NGỌC';
    if (heroDescEl) heroDescEl.textContent = selectedCat.desc;
    if (breadcrumbActive) breadcrumbActive.textContent = selectedCat.name;
    document.title = `${selectedCat.name} | JADE – Trang Sức Ngọc Thiên Nhiên`;
  } else if (currentFilters.tag === 'sale') {
    if (heroTitleEl) heroTitleEl.textContent = "ƯU ĐÃI ĐẶC QUYỀN";
    if (heroSubtitleEl) heroSubtitleEl.textContent = "GIÁ TRỊ VƯỢT THỜI GIAN";
    if (heroDescEl) heroDescEl.textContent = "Những tuyệt tác ngọc thiên nhiên ưu đãi giá đặc biệt dành riêng cho khách hàng JADE.";
    if (breadcrumbActive) breadcrumbActive.textContent = "Ưu Đãi Đặc Quyền";
    document.title = `Ưu Đãi Đặc Quyền | JADE – Trang Sức Ngọc Thiên Nhiên`;
  } else if (currentFilters.tag === 'new') {
    if (heroTitleEl) heroTitleEl.textContent = "SẢN PHẨM MỚI NHẤT";
    if (heroSubtitleEl) heroSubtitleEl.textContent = "TUYỆT TÁC MỚI RA MẮT";
    if (heroDescEl) heroDescEl.textContent = "Những tuyệt tác ngọc Jadeite vừa được các nghệ nhân hoàn thiện trong tuần này.";
    if (breadcrumbActive) breadcrumbActive.textContent = "Sản Phẩm Mới";
    document.title = `Sản Phẩm Mới | JADE – Trang Sức Ngọc Thiên Nhiên`;
  } else {
    if (heroTitleEl) heroTitleEl.textContent = selectedCat.name.toUpperCase();
    if (heroSubtitleEl) heroSubtitleEl.textContent = selectedCat.subtitle || 'BỘ SƯU TẬP TOÀN DIỆN';
    if (heroDescEl) heroDescEl.textContent = selectedCat.desc;
    if (breadcrumbActive) breadcrumbActive.textContent = "Tất Cả Sản Phẩm";
    document.title = `Tất Cả Sản Phẩm | JADE – Trang Sức Ngọc Thiên Nhiên`;
  }

  // Update Category Thumbnails Strip Active Class
  document.querySelectorAll('.cat-strip-item').forEach(el => {
    const slug = el.getAttribute('data-cat');
    if (slug === (currentFilters.category || 'all')) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // 1. Search Query Filter (Hỗ trợ tiếng Việt không dấu & tìm kiếm mờ / chống gõ nhầm)
  if (currentFilters.searchQuery) {
    if (typeof calculateProductMatchScore === 'function') {
      list = list.filter(p => {
        const res = calculateProductMatchScore(p, currentFilters.searchQuery);
        return res && (res.score > 0 || res > 0);
      });
    } else {
      const q = currentFilters.searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }
  }

  // 2. Category Filter
  if (currentFilters.category !== 'all') {
    list = list.filter(p => p.category === currentFilters.category);
  }

  // 3. Price Filter
  if (currentFilters.priceRange !== 'all') {
    if (currentFilters.priceRange === 'under-10') {
      list = list.filter(p => p.price < 10000000);
    } else if (currentFilters.priceRange === '10-20') {
      list = list.filter(p => p.price >= 10000000 && p.price <= 20000000);
    } else if (currentFilters.priceRange === '20-35') {
      list = list.filter(p => p.price > 20000000 && p.price <= 35000000);
    } else if (currentFilters.priceRange === 'over-35') {
      list = list.filter(p => p.price > 35000000);
    }
  }

  // 4. Color Filter
  if (currentFilters.color !== 'all') {
    const colFilter = currentFilters.color.toLowerCase();
    if (colFilter === 'xanh') {
      list = list.filter(p => {
        const c = (p.color || '').toLowerCase();
        return c.includes('xanh') || c.includes('lục') || c.includes('rêu') || c.includes('ngọc bích');
      });
    } else if (colFilter === 'trắng') {
      list = list.filter(p => {
        const c = (p.color || '').toLowerCase();
        return c.includes('trắng') || c.includes('bạch') || c.includes('mỡ cừu') || c.includes('sữa');
      });
    } else if (colFilter === 'huyết') {
      list = list.filter(p => {
        const c = (p.color || '').toLowerCase();
        return c.includes('huyết') || c.includes('cam') || c.includes('vàng') || c.includes('đỏ') || c.includes('ruby') || c.includes('tím') || c.includes('tam sắc');
      });
    } else {
      list = list.filter(p => (p.color || '').toLowerCase().includes(colFilter));
    }
  }

  // 5. Tag Filter
  if (currentFilters.tag !== 'all') {
    if (currentFilters.tag === 'new') {
      list = list.filter(p => p.isNew);
    } else if (currentFilters.tag === 'bestseller') {
      list = list.filter(p => p.isBestSeller);
    } else if (currentFilters.tag === 'sale') {
      list = list.filter(p => p.discountPercent && p.discountPercent > 0);
    }
  }

  // 6. Sorting
  if (currentFilters.sortBy === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sortBy === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sortBy === 'bestseller') {
    list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || (b.rating - a.rating));
  } else if (currentFilters.sortBy === 'new') {
    list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  // Phân trang: 21 sản phẩm / trang
  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  if (currentFilters.page > totalPages) {
    currentFilters.page = totalPages;
  }
  if (currentFilters.page < 1) {
    currentFilters.page = 1;
  }

  const startIndex = (currentFilters.page - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const pagedList = list.slice(startIndex, endIndex);

  // Render to container
  const container = document.getElementById('products-catalog-container');
  const countLabel = document.getElementById('products-count-num');
  
  if (countLabel) {
    if (totalItems === 0) {
      countLabel.textContent = 'Hiển thị 0 sản phẩm';
    } else if (totalPages > 1) {
      countLabel.textContent = `Hiển thị ${startIndex + 1}–${endIndex} trong ${totalItems} sản phẩm (Trang ${currentFilters.page}/${totalPages})`;
    } else {
      countLabel.textContent = `Hiển thị ${totalItems} sản phẩm`;
    }
  }

  if (!container) return;

  if (totalItems === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3 class="empty-state-title">Không tìm thấy sản phẩm phù hợp</h3>
        <p class="empty-state-desc">Rất tiếc, không có sản phẩm nào khớp với bộ lọc bạn đã chọn. Vui lòng thiết lập lại bộ lọc để xem toàn bộ bộ sưu tập.</p>
        <button id="btn-empty-reset" class="btn btn-primary btn-sm">Xóa Tất Cả Bộ Lọc</button>
      </div>
    `;
    const emptyReset = document.getElementById('btn-empty-reset');
    if (emptyReset) {
      emptyReset.addEventListener('click', () => {
        const resetBtn = document.getElementById('btn-reset-filters');
        if (resetBtn) resetBtn.click();
      });
    }
  } else {
    container.innerHTML = pagedList.map(p => {
      let badge = '';
      if (p.discountPercent) badge = `-${p.discountPercent}%`;
      else if (p.isNew) badge = 'MỚI';
      else if (p.isBestSeller) badge = 'BÁN CHẠY';

      return createProductCardHtml(p, { badge, relativePath: '' });
    }).join('');
  }

  updateWishlistUI();
  renderPagination(totalPages, currentFilters.page);
}

// Render Pagination Component (20 sản phẩm / trang)
function renderPagination(totalPages, currentPage) {
  const paginationContainer = document.getElementById('products-pagination') || document.querySelector('.pagination');
  if (!paginationContainer) return;

  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    paginationContainer.style.display = 'none';
    return;
  }

  paginationContainer.style.display = 'flex';
  let html = '';

  // Nút Trang trước
  const prevDisabled = currentPage <= 1;
  html += `
    <button class="page-btn page-prev" ${prevDisabled ? 'disabled style="opacity:0.35; cursor:not-allowed;"' : ''} aria-label="Trang trước" title="Trang trước">
      &lt;
    </button>
  `;

  // Các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage;
    html += `
      <button class="page-btn ${isActive ? 'active' : ''}" data-page="${i}" aria-label="Trang ${i}">
        ${i}
      </button>
    `;
  }

  // Nút Trang sau
  const nextDisabled = currentPage >= totalPages;
  html += `
    <button class="page-btn page-next" ${nextDisabled ? 'disabled style="opacity:0.35; cursor:not-allowed;"' : ''} aria-label="Trang sau" title="Trang sau">
      &gt;
    </button>
  `;

  paginationContainer.innerHTML = html;

  // Bắt sự kiện click vào từng số trang
  paginationContainer.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetPage = parseInt(e.currentTarget.getAttribute('data-page'), 10);
      if (targetPage !== currentFilters.page) {
        goToPage(targetPage);
      }
    });
  });

  // Bắt sự kiện click nút Trang trước
  const prevBtn = paginationContainer.querySelector('.page-prev');
  if (prevBtn && !prevDisabled) {
    prevBtn.addEventListener('click', () => {
      goToPage(currentPage - 1);
    });
  }

  // Bắt sự kiện click nút Trang sau
  const nextBtn = paginationContainer.querySelector('.page-next');
  if (nextBtn && !nextDisabled) {
    nextBtn.addEventListener('click', () => {
      goToPage(currentPage + 1);
    });
  }
}

// Chuyển trang và cuộn mượt lên đầu danh sách sản phẩm
function goToPage(page) {
  currentFilters.page = page;

  // Cập nhật tham số query ?page= trên URL mà không reload trang
  const newUrl = new URL(window.location);
  if (page === 1) {
    newUrl.searchParams.delete('page');
  } else {
    newUrl.searchParams.set('page', page);
  }
  window.history.pushState({}, '', newUrl);

  applyFiltersAndRender();

  // Cuộn mượt lên đầu danh mục sản phẩm
  const targetScrollEl = document.getElementById('products-catalog-container') || document.querySelector('.products-content');
  if (targetScrollEl) {
    const topPos = targetScrollEl.getBoundingClientRect().top + window.pageYOffset - 120;
    window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
  }
}

// Mobile Filter Drawer Toggle
function setupMobileFilterDrawer() {
  const trigger = document.querySelector('.mobile-filter-btn');
  const sidebar = document.querySelector('.filter-sidebar');
  if (!trigger || !sidebar) return;

  trigger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !trigger.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}
