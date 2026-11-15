/* ==========================================================================
   JADE - SMART FUZZY SEARCH CONTROLLER
   - Không phân biệt chữ hoa / thường
   - Không phân biệt tiếng Việt có dấu / không dấu (vd: "vong ban", "nhan ngoc")
   - Chế độ tìm kiếm mờ (Fuzzy Search / Damerau-Levenshtein) chống gõ nhầm (vd: "vògn", "vongg", "nhãnn")
   - Mở rộng từ đồng nghĩa trang sức ngọc (phỉ thúy, cẩm thạch, bạch ngọc, lục đế vương,...)
   - Kích thước thẻ và lưới sản phẩm đồng bộ chuẩn với trang sản phẩm
   ========================================================================== */

let currentSearchState = {
  query: '',
  sortBy: 'relevance'
};

function initSearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialSort = urlParams.get('sort') || 'relevance';

  currentSearchState.query = initialQuery;
  currentSearchState.sortBy = initialSort;

  const inputEl = document.getElementById('search-page-input');
  const formEl = document.getElementById('search-page-form');
  const sortSelect = document.getElementById('sort-search-select');

  if (inputEl) {
    inputEl.value = initialQuery;
  }

  if (sortSelect) {
    sortSelect.value = initialSort;
    sortSelect.addEventListener('change', (e) => {
      currentSearchState.sortBy = e.target.value;
      const newUrl = new URL(window.location);
      if (e.target.value !== 'relevance') {
        newUrl.searchParams.set('sort', e.target.value);
      } else {
        newUrl.searchParams.delete('sort');
      }
      window.history.pushState({}, '', newUrl);
      performSearch(currentSearchState.query, currentSearchState.sortBy);
    });
  }

  performSearch(initialQuery, initialSort);

  if (formEl) {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = inputEl ? inputEl.value.trim() : '';
      currentSearchState.query = q;

      const newUrl = new URL(window.location);
      if (q) {
        newUrl.searchParams.set('q', q);
      } else {
        newUrl.searchParams.delete('q');
      }
      window.history.pushState({}, '', newUrl);
      performSearch(q, currentSearchState.sortBy);
    });
  }

  // Bắt sự kiện click vào các thẻ từ khóa gợi ý phổ biến
  document.querySelectorAll('.search-suggest-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.preventDefault();
      const kw = tag.getAttribute('data-keyword') || tag.textContent.trim();
      if (inputEl) inputEl.value = kw;
      currentSearchState.query = kw;

      const newUrl = new URL(window.location);
      newUrl.searchParams.set('q', kw);
      window.history.pushState({}, '', newUrl);

      performSearch(kw, currentSearchState.sortBy);
    });
  });
}

// Khởi chạy ngay lập tức nếu DOM đã sẵn sàng (script đặt ở cuối trang)
if (document.getElementById('search-results-grid')) {
  initSearchPage();
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearchPage);
} else {
  initSearchPage();
}

// Hỗ trợ nút Back / Forward trên trình duyệt
window.addEventListener('popstate', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q') || '';
  const sort = urlParams.get('sort') || 'relevance';

  const inputEl = document.getElementById('search-page-input');
  const sortSelect = document.getElementById('sort-search-select');

  if (inputEl) inputEl.value = q;
  if (sortSelect) sortSelect.value = sort;

  currentSearchState.query = q;
  currentSearchState.sortBy = sort;

  performSearch(q, sort);
});

/* --------------------------------------------------------------------------
   THỰC THI TÌM KIẾM VÀ RENDER KẾT QUẢ
   (Sử dụng calculateProductMatchScore được khai báo từ js/data.js)
   -------------------------------------------------------------------------- */
function performSearch(query, sortBy = 'relevance') {
  const q = (query || '').trim();
  const summaryEl = document.getElementById('search-summary-text');
  const gridEl = document.getElementById('search-results-grid');

  const dataset = (typeof JADE_DATA !== 'undefined') ? JADE_DATA : (typeof window !== 'undefined' ? window.JADE_DATA : null);
  if (!dataset || !dataset.products) return;

  const scoreFunc = (typeof calculateProductMatchScore === 'function')
    ? calculateProductMatchScore
    : (typeof window !== 'undefined' && window.calculateProductMatchScore ? window.calculateProductMatchScore : null);

  let scoredList = [];
  let hasAnyFuzzy = false;

  if (!q) {
    // Không có từ khóa -> Hiển thị toàn bộ sản phẩm
    scoredList = dataset.products.map(p => ({ product: p, score: 100 }));
  } else {
    dataset.products.forEach(p => {
      const result = scoreFunc ? scoreFunc(p, q) : (p.name.toLowerCase().includes(q.toLowerCase()) ? { score: 50, isExactOrSubMatch: true, hasFuzzy: false } : null);
      if (result && (result.score > 0 || (typeof result === 'number' && result > 0))) {
        const numericScore = typeof result === 'number' ? result : result.score;
        if (result.hasFuzzy) hasAnyFuzzy = true;
        scoredList.push({
          product: p,
          score: numericScore,
          isExact: result.isExactOrSubMatch
        });
      }
    });
  }

  // Sắp xếp kết quả
  if (sortBy === 'price-asc') {
    scoredList.sort((a, b) => a.product.price - b.product.price);
  } else if (sortBy === 'price-desc') {
    scoredList.sort((a, b) => b.product.price - a.product.price);
  } else if (sortBy === 'bestseller') {
    scoredList.sort((a, b) => (b.product.isBestSeller ? 1 : 0) - (a.product.isBestSeller ? 1 : 0) || (b.product.rating - a.product.rating));
  } else if (sortBy === 'new') {
    scoredList.sort((a, b) => (b.product.isNew ? 1 : 0) - (a.product.isNew ? 1 : 0));
  } else {
    // Mặc định: 'relevance' (Điểm phù hợp cao nhất lên trước)
    scoredList.sort((a, b) => b.score - a.score);
  }

  const results = scoredList.map(item => item.product);

  // Cập nhật dòng tóm tắt thông báo kết quả
  if (summaryEl) {
    if (q) {
      if (results.length > 0) {
        if (hasAnyFuzzy) {
          summaryEl.innerHTML = `Tìm thấy <strong>${results.length}</strong> sản phẩm phù hợp & gợi ý gần giống nhất cho từ khóa: <em>"${query}"</em>`;
        } else {
          summaryEl.innerHTML = `Tìm thấy <strong>${results.length}</strong> sản phẩm cho từ khóa: <em>"${query}"</em>`;
        }
      } else {
        summaryEl.innerHTML = `Không tìm thấy sản phẩm nào khớp với từ khóa: <em>"${query}"</em>`;
      }
    } else {
      summaryEl.innerHTML = `Hiển thị tất cả <strong>${results.length}</strong> tuyệt tác trang sức ngọc thiên nhiên JADE`;
    }
  }

  if (!gridEl) return;

  // Hiển thị trạng thái rỗng khi không có kết quả
  if (results.length === 0) {
    gridEl.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 4rem 1.5rem; text-align: center;">
        <div class="empty-state-icon" style="margin-bottom: 1.25rem;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.75">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </div>
        <h3 class="empty-state-title" style="font-size: 1.4rem; color: var(--color-heading); margin-bottom: 0.75rem;">Không tìm thấy món trang sức nào phù hợp</h3>
        <p class="empty-state-desc" style="color: var(--color-text); max-width: 540px; margin: 0 auto 1.75rem auto; line-height: 1.7;">
          Rất tiếc, chưa tìm thấy sản phẩm khớp với từ khóa "<strong>${query}</strong>". Bạn có thể thử tìm theo dòng sản phẩm (vòng bản, vòng hạt, nhẫn ngọc, hoa tai) hoặc chất liệu (phỉ thúy, bạch ngọc, huyết ngọc).
        </p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <a href="products.html" class="btn btn-primary btn-sm">Xem Toàn Bộ 36 Sản Phẩm</a>
          <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('search-page-input').value=''; performSearch('');">Xóa Bộ Lọc Tìm Kiếm</button>
        </div>
      </div>
    `;
  } else {
    // Render thẻ sản phẩm đồng bộ chuẩn 100% với trang sản phẩm
    gridEl.innerHTML = results.map(p => {
      let badge = '';
      if (p.discountPercent) badge = `-${p.discountPercent}%`;
      else if (p.isNew) badge = 'MỚI';
      else if (p.isBestSeller) badge = 'BÁN CHẠY';

      return createProductCardHtml(p, { badge, relativePath: '' });
    }).join('');

    updateWishlistUI();
  }
}
