/* ==========================================================================
   JADE - WISHLIST PAGE CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderWishlistPage();
});

function renderWishlistPage() {
  const container = document.getElementById('wishlist-table-container');
  const countEl = document.getElementById('wishlist-count-header');

  // Kiểm tra đăng nhập
  if (typeof isUserLoggedIn === 'function' && !isUserLoggedIn()) {
    if (countEl) countEl.textContent = '(0 sản phẩm)';
    if (!container) return;

    container.innerHTML = `
      <div class="empty-state" style="padding: 4rem 1.5rem; text-align: center;">
        <div class="empty-state-icon" style="margin-bottom: 1.25rem;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.75">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h3 class="empty-state-title" style="font-size: 1.45rem; color: var(--color-heading); margin-bottom: 0.75rem;">Đăng Nhập Để Xem Danh Sách Yêu Thích</h3>
        <p class="empty-state-desc" style="color: var(--color-text); max-width: 540px; margin: 0 auto 1.75rem auto; line-height: 1.7;">
          Quý khách vui lòng đăng nhập hoặc đăng ký tài khoản thành viên JADE để đồng bộ, bảo lưu danh sách trang sức ngọc thiên nhiên ưng ý nhất và nhận thông báo ưu đãi độc quyền.
        </p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary btn-sm" onclick="openAuthRequiredModal({ type: 'view_wishlist', title: 'ĐĂNG NHẬP ĐỂ XEM YÊU THÍCH', desc: 'Đăng nhập tài khoản để xem các tuyệt tác ngọc đã lưu trong danh sách yêu thích của bạn.' })">
            ĐĂNG NHẬP / ĐĂNG KÝ NGAY
          </button>
          <a href="products.html" class="btn btn-secondary btn-sm">Xem Toàn Bộ Sản Phẩm</a>
        </div>
      </div>
    `;
    return;
  }

  const wishlist = getStoredWishlist();

  if (countEl) {
    countEl.textContent = `(${wishlist.length} sản phẩm)`;
  }

  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 4rem 1.5rem; text-align: center;">
        <div class="empty-state-icon" style="margin-bottom: 1.25rem;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h3 class="empty-state-title" style="font-size: 1.45rem; color: var(--color-heading); margin-bottom: 0.75rem;">Danh Sách Yêu Thích Đang Trống</h3>
        <p class="empty-state-desc" style="color: var(--color-text); max-width: 540px; margin: 0 auto 1.75rem auto; line-height: 1.7;">
          Hãy lưu lại những món trang sức ngọc thiên nhiên ưng ý nhất để dễ dàng theo dõi và lựa chọn khi bạn sẵn sàng.
        </p>
        <a href="products.html" class="btn btn-primary btn-sm">Khám Phá Tuyệt Tác Ngọc Ngay</a>
      </div>
    `;
    return;
  }

  const products = wishlist.map(id => getProductById(id)).filter(p => !!p);

  container.innerHTML = `
    <div class="products-catalog-grid wishlist-catalog-grid">
      ${products.map(p => {
        let badge = '';
        if (p.discountPercent) badge = `-${p.discountPercent}%`;
        else if (p.isNew) badge = 'MỚI';
        else if (p.isBestSeller) badge = 'BÁN CHẠY';

        return createProductCardHtml(p, { badge, relativePath: '' });
      }).join('')}
    </div>
  `;

  updateWishlistUI();
}
