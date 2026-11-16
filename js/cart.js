/* ==========================================================================
   JADE - SHOPPING CART CONTROLLER
   ========================================================================== */

let appliedDiscountPercent = 0;
let appliedDiscountAmount = 0;
let activePromoCode = '';

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();
  setupCartEventListeners();
});

function renderCartPage() {
  const container = document.getElementById('cart-page-content');
  const cart = getStoredCart();

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <h2 class="empty-state-title">Giỏ hàng của bạn đang trống</h2>
        <p class="empty-state-desc">Hãy khám phá bộ sưu tập ngọc quý thiên nhiên và chọn cho mình món trang sức ưng ý nhất.</p>
        <a href="products.html" class="btn btn-primary btn-lg">TIẾP TỤC MUA SẮM &rarr;</a>
      </div>
    `;
    return;
  }

  // Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeShip = subtotal >= 2000000 || activePromoCode === 'FREESHIP';
  const shippingFee = isFreeShip ? 0 : 30000;
  
  if (appliedDiscountPercent > 0) {
    appliedDiscountAmount = Math.round(subtotal * (appliedDiscountPercent / 100));
  }
  const grandTotal = Math.max(0, subtotal - appliedDiscountAmount + shippingFee);

  container.innerHTML = `
    <div class="cart-layout">
      <!-- Left: Item Table -->
      <div class="cart-items-wrapper">
        <table class="cart-items-table">
          <thead class="cart-table-head">
            <tr>
              <th>Sản Phẩm</th>
              <th>Đơn Giá</th>
              <th>Số Lượng</th>
              <th>Thành Tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr class="cart-row" data-id="${item.id}" data-size="${item.size}">
                <td>
                  <div class="cart-product-cell">
                    <img src="${typeof resolveProductImg === 'function' ? resolveProductImg(item.image) : item.image}" alt="${item.name}" class="cart-item-img" />
                    <div class="cart-item-info">
                      <h4><a href="product-detail.html?id=${item.id}">${item.name}</a></h4>
                      <div class="cart-item-variant">Mã SP: ${item.sku} &bull; Ni/Size: <strong>${item.size}</strong></div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="cart-item-price">${formatPrice(item.price)}</span>
                </td>
                <td>
                  <div class="quantity-stepper">
                    <button type="button" class="stepper-btn btn-cart-minus" aria-label="Giảm">&minus;</button>
                    <input type="number" class="stepper-input cart-qty-input" value="${item.quantity}" min="1" readonly />
                    <button type="button" class="stepper-btn btn-cart-plus" aria-label="Tăng">&#43;</button>
                  </div>
                </td>
                <td>
                  <span class="cart-item-total">${formatPrice(item.price * item.quantity)}</span>
                </td>
                <td>
                  <button type="button" class="btn-remove-item" title="Xóa món này" aria-label="Xóa">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <a href="products.html" class="btn btn-outline btn-sm">
            &larr; TIẾP TỤC CHỌN THÊM SẢN PHẨM
          </a>
          <button id="btn-clear-cart" class="btn btn-outline btn-sm" style="color: var(--color-sale); border-color: rgba(183, 50, 37, 0.3);">
            XÓA HẾT GIỎ HÀNG
          </button>
        </div>
      </div>

      <!-- Right: Summary Box -->
      <div class="cart-summary-wrapper">
        <div class="order-summary-card">
          <h3 class="summary-title">TỔNG KẾT ĐƠN HÀNG</h3>
          
          <div class="summary-row">
            <span>Tạm tính tiền hàng:</span>
            <strong>${formatPrice(subtotal)}</strong>
          </div>

          <div class="summary-row">
            <span>Phí vận chuyển:</span>
            <span>${isFreeShip ? '<strong style="color: var(--color-success)">Miễn phí vận chuyển</strong>' : formatPrice(shippingFee)}</span>
          </div>

          ${appliedDiscountAmount > 0 ? `
            <div class="summary-row" style="color: var(--color-sale)">
              <span>Giảm giá khuyến mại (${activePromoCode}):</span>
              <strong>-${formatPrice(appliedDiscountAmount)}</strong>
            </div>
          ` : ''}

          <!-- Coupon Code Box -->
          <div style="margin: 1.25rem 0; padding: 1rem 0; border-top: 1px dashed var(--color-border); border-bottom: 1px dashed var(--color-border);">
            <div style="font-size: var(--font-size-xs); font-weight: 600; color: var(--color-heading); margin-bottom: 0.5rem; text-transform: uppercase;">
              MÃ ƯU ĐÃI / GIẢM GIÁ
            </div>
            <div class="coupon-box" style="margin: 0;">
              <input type="text" id="coupon-code-input" class="coupon-input" placeholder="Mã: JADEVIP10" value="${activePromoCode}" />
              <button type="button" id="btn-apply-coupon" class="btn btn-primary btn-sm">ÁP DỤNG</button>
            </div>
            <div style="font-size: 0.72rem; color: var(--color-accent); margin-top: 0.35rem;">
              * Nhập <strong>JADEVIP10</strong> để giảm 10% đơn hàng.
            </div>
          </div>

          <div class="summary-row total-row">
            <span>Tổng thanh toán:</span>
            <span class="summary-total-price">${formatPrice(grandTotal)}</span>
          </div>

          <div style="margin-top: 1.5rem;">
            <a href="checkout.html" class="btn btn-primary btn-full btn-lg">
              TIẾN HÀNH ĐẶT HÀNG &rarr;
            </a>
          </div>

          <div style="text-align: center; margin-top: 1rem; font-size: 0.75rem; color: var(--color-text-light);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:-2px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Bảo mật thanh toán & thông tin 100%
          </div>
        </div>
      </div>
    </div>
  `;

  attachCartItemListeners();
}

function attachCartItemListeners() {
  // Stepper plus/minus
  document.querySelectorAll('.cart-row').forEach(row => {
    const id = parseInt(row.getAttribute('data-id'), 10);
    const size = row.getAttribute('data-size');
    const input = row.querySelector('.cart-qty-input');
    const btnMinus = row.querySelector('.btn-cart-minus');
    const btnPlus = row.querySelector('.btn-cart-plus');
    const btnRemove = row.querySelector('.btn-remove-item');

    if (btnMinus) {
      btnMinus.addEventListener('click', () => {
        let val = parseInt(input.value, 10);
        if (val > 1) {
          updateCartItemQuantity(id, size, val - 1);
          renderCartPage();
        }
      });
    }

    if (btnPlus) {
      btnPlus.addEventListener('click', () => {
        let val = parseInt(input.value, 10);
        updateCartItemQuantity(id, size, val + 1);
        renderCartPage();
      });
    }

    if (btnRemove) {
      btnRemove.addEventListener('click', () => {
        removeCartItem(id, size);
        renderCartPage();
      });
    }
  });

  // Apply Coupon button
  const couponBtn = document.getElementById('btn-apply-coupon');
  if (couponBtn) {
    couponBtn.addEventListener('click', () => {
      const codeInput = document.getElementById('coupon-code-input');
      const code = codeInput ? codeInput.value.trim().toUpperCase() : '';

      if (code === 'JADEVIP10') {
        appliedDiscountPercent = 10;
        activePromoCode = 'JADEVIP10';
        showToast('Áp dụng thành công!', 'Bạn được giảm 10% trên tổng giá trị đơn hàng.', 'success');
        renderCartPage();
      } else if (code === 'FREESHIP') {
        appliedDiscountPercent = 0;
        activePromoCode = 'FREESHIP';
        showToast('Áp dụng thành công!', 'Bạn được miễn phí vận chuyển.', 'success');
        renderCartPage();
      } else if (code === '') {
        appliedDiscountPercent = 0;
        activePromoCode = '';
        renderCartPage();
      } else {
        showToast('Mã không hợp lệ', 'Mã giảm giá không chính xác hoặc đã hết hạn.', 'error');
      }
    });
  }

  // Clear Cart
  const clearBtn = document.getElementById('btn-clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn làm trống giỏ hàng?')) {
        saveCart([]);
        renderCartPage();
        showToast('Giỏ hàng đã xóa', 'Đã làm trống giỏ hàng.', 'info');
      }
    });
  }

  // Intercept checkout button if user is not logged in
  const checkoutBtn = document.querySelector('a[href="checkout.html"]');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      if (!isUserLoggedIn()) {
        e.preventDefault();
        openAuthRequiredModal({ type: 'checkout' });
      }
    });
  }
}

function setupCartEventListeners() {
  // Empty or general handlers
}
