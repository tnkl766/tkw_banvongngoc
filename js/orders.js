/* ==========================================================================
   JADE - ORDERS CONTROLLER (SUCCESS & ORDER DETAIL)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('id');

  // Check if we are on order-success page
  if (document.getElementById('order-success-content')) {
    initOrderSuccessPage(orderId);
  }

  // Check if we are on order-detail page
  if (document.getElementById('order-detail-content')) {
    initOrderDetailPage(orderId);
  }
});

function initOrderSuccessPage(orderId) {
  const container = document.getElementById('order-success-content');
  if (!container) return;

  let order = null;
  const orders = getStoredOrders();

  if (orderId) {
    order = orders.find(o => o.id === orderId);
  }
  if (!order) {
    try {
      const last = localStorage.getItem('jade_last_order');
      if (last) order = JSON.parse(last);
    } catch (e) {}
  }

  // Fallback demo order if visited directly
  if (!order) {
    order = {
      id: orderId || 'JADE-2026-8899',
      date: 'Vừa xong',
      customer: {
        fullName: 'Quý Khách Hàng',
        phone: '0988 888 888',
        email: 'quykhach@gmail.com',
        city: 'Hà Nội',
        address: 'TTTM Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm'
      },
      shippingMethod: 'Giao Tiêu Chuẩn (2-3 Ngày)',
      paymentMethod: 'Thanh Toán Khi Nhận Hàng (COD)',
      status: 'Đã xác nhận',
      items: [
        {
          id: 1,
          name: 'Vòng Ngọc Phỉ Thuý Băng Chủng Hoàng Gia',
          sku: 'JD-VT-001',
          price: 28500000,
          size: 'Ni 54',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1611591475871-331e8b2bf376?q=80&w=800&auto=format&fit=crop'
        }
      ],
      subtotal: 28500000,
      shippingFee: 0,
      grandTotal: 28500000
    };
  }

  container.innerHTML = `
    <div class="order-success-box">
      <div class="success-badge-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <span class="section-subtitle">ĐẶT HÀNG THÀNH CÔNG</span>
      <h1 class="section-title">CẢM ƠN QUÝ KHÁCH ĐÃ TIN CHỌN JADE</h1>
      <p class="section-desc" style="max-width: 540px; margin: 0 auto;">
        Đơn hàng của quý khách đã được ghi nhận. Chuyên viên tư vấn của JADE sẽ liên hệ qua điện thoại trong vòng 15 phút để xác nhận ni tay và chuẩn bị niêm phong bảo hiểm đá quý.
      </p>

      <div class="order-info-list">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.65rem;">
          <span class="text-muted">Mã đơn hàng:</span>
          <strong style="color: var(--color-primary);">${order.id}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.65rem;">
          <span class="text-muted">Thời gian đặt:</span>
          <span>${order.date}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.65rem;">
          <span class="text-muted">Người nhận:</span>
          <strong>${order.customer.fullName} - ${order.customer.phone}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.65rem;">
          <span class="text-muted">Địa chỉ nhận hàng:</span>
          <span>${order.customer.address}, ${order.customer.city}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.65rem;">
          <span class="text-muted">Phương thức thanh toán:</span>
          <span>${order.paymentMethod}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.65rem; border-top: 1px solid var(--color-border); padding-top: 0.65rem;">
          <span class="text-muted">Tổng thanh toán:</span>
          <strong style="font-size: 1.15rem; color: var(--color-primary);">${formatPrice(order.grandTotal)}</strong>
        </div>
      </div>

      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="order-detail.html?id=${order.id}" class="btn btn-outline">
          THEO DÕI ĐƠN HÀNG
        </a>
        <a href="products.html" class="btn btn-primary">
          TIẾP TỤC MUA SẮM &rarr;
        </a>
      </div>
    </div>
  `;
}

function initOrderDetailPage(orderId) {
  const container = document.getElementById('order-detail-content');
  if (!container) return;

  const orders = getStoredOrders();
  let order = orders.find(o => o.id === orderId);

  if (!order) {
    // Generate realistic demo order
    order = {
      id: orderId || 'JADE-2026-6789',
      date: '14:30 - 08/11/2026',
      customer: {
        fullName: 'Lê Hoàng Yến',
        phone: '0908 123 456',
        email: 'hoangyen@gmail.com',
        city: 'TP. Hồ Chí Minh',
        address: 'Số 68 Đồng Khởi, Phường Bến Nghé, Quận 1',
        notes: 'Giao giờ hành chính, bao bì hộp quà tặng nơ nhung'
      },
      shippingMethod: 'Giao Tiêu Chuẩn Bảo Hiểm Ngọc Quý',
      paymentMethod: 'Thanh Toán Khi Nhận Hàng (COD)',
      status: 'Đang giao hàng',
      items: [
        {
          id: 1,
          name: 'Vòng Ngọc Phỉ Thuý Băng Chủng Hoàng Gia',
          sku: 'JD-VT-001',
          price: 28500000,
          size: 'Ni 54 (Cổ tay 15-16cm)',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1611591475871-331e8b2bf376?q=80&w=800&auto=format&fit=crop'
        },
        {
          id: 3,
          name: 'Nhẫn Ngọc Jadeite Xanh Đế Vương Bọc Vàng 18K',
          sku: 'JD-RN-001',
          price: 18500000,
          size: 'Size 12',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'
        }
      ],
      subtotal: 47000000,
      shippingFee: 0,
      grandTotal: 47000000
    };
  }

  // Determine active step
  const statusStepMap = {
    'Chờ xác nhận': 1,
    'Đã xác nhận': 2,
    'Đang giao hàng': 3,
    'Đã giao hàng': 4
  };
  const activeStep = statusStepMap[order.status] || 2;

  container.innerHTML = `
    <div style="background: #FFFFFF; border-radius: 8px; border: 1px solid var(--color-border); padding: 2.5rem; box-shadow: var(--shadow-sm);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="text-muted" style="font-size: 0.85rem;">Chi tiết đơn hàng:</span>
          <h2 style="font-size: 1.6rem; color: var(--color-heading); font-family: var(--font-heading);">${order.id}</h2>
          <div style="font-size: 0.85rem; color: var(--color-text-light);">Ngày đặt: ${order.date}</div>
        </div>
        <div>
          <span class="badge badge-new" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">Trạng thái: ${order.status}</span>
        </div>
      </div>

      <!-- Tracking Timeline -->
      <div class="tracking-timeline">
        <div class="timeline-step ${activeStep >= 1 ? 'completed' : ''}">
          <div class="step-bubble">1</div>
          <span class="step-label">Chờ xác nhận</span>
        </div>
        <div class="timeline-step ${activeStep >= 2 ? 'completed' : ''}">
          <div class="step-bubble">2</div>
          <span class="step-label">Đã xác nhận</span>
        </div>
        <div class="timeline-step ${activeStep >= 3 ? 'completed active' : ''}">
          <div class="step-bubble">3</div>
          <span class="step-label">Đang giao hàng</span>
        </div>
        <div class="timeline-step ${activeStep >= 4 ? 'completed' : ''}">
          <div class="step-bubble">4</div>
          <span class="step-label">Đã giao hàng</span>
        </div>
      </div>

      <!-- Customer & Shipping info -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0; padding: 1.5rem; background: #FAF9F6; border-radius: 6px;">
        <div>
          <h4 style="font-size: 1rem; margin-bottom: 0.5rem;">Thông Tin Nhận Hàng</h4>
          <p style="margin-bottom: 0.25rem;"><strong>${order.customer.fullName}</strong> (${order.customer.phone})</p>
          <p style="margin-bottom: 0.25rem;">${order.customer.address}, ${order.customer.city}</p>
          <p style="margin-bottom: 0; color: var(--color-text-light);">Email: ${order.customer.email}</p>
        </div>
        <div>
          <h4 style="font-size: 1rem; margin-bottom: 0.5rem;">Vận Chuyển & Thanh Toán</h4>
          <p style="margin-bottom: 0.25rem;"><strong>Vận chuyển:</strong> ${order.shippingMethod}</p>
          <p style="margin-bottom: 0.25rem;"><strong>Thanh toán:</strong> ${order.paymentMethod}</p>
          ${order.customer.notes ? `<p style="margin-bottom: 0; color: var(--color-text-light);"><strong>Ghi chú:</strong> ${order.customer.notes}</p>` : ''}
        </div>
      </div>

      <!-- Product List -->
      <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">Sản Phẩm Trong Đơn Hàng</h3>
      <div style="border-top: 1px solid var(--color-border); margin-bottom: 1.5rem;">
        ${order.items.map(item => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--color-border-subtle);">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; border: 1px solid var(--color-border);" />
              <div>
                <a href="product-detail.html?id=${item.id}" style="font-weight: 500; font-family: var(--font-heading); font-size: 1rem; color: var(--color-heading);">${item.name}</a>
                <div style="font-size: 0.8rem; color: var(--color-text-light);">Mã SP: ${item.sku} &bull; Ni: ${item.size}</div>
              </div>
            </div>
            <div style="text-align: right;">
              <div>${formatPrice(item.price)} &times; <strong>${item.quantity}</strong></div>
              <div style="font-weight: 600; color: var(--color-primary); font-size: 1rem;">${formatPrice(item.price * item.quantity)}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Total Breakdown -->
      <div style="max-width: 360px; margin-left: auto;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Tạm tính:</span>
          <strong>${formatPrice(order.subtotal)}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Phí vận chuyển:</span>
          <span>${order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--color-border); padding-top: 0.75rem; font-size: 1.2rem; font-weight: bold; color: var(--color-heading);">
          <span>Tổng thanh toán:</span>
          <span style="color: var(--color-primary);">${formatPrice(order.grandTotal)}</span>
        </div>
      </div>

      <div style="margin-top: 2.5rem; text-align: center;">
        <a href="products.html" class="btn btn-outline btn-sm">&larr; QUAY LẠI MUA SẮM</a>
        <a href="contact.html" class="btn btn-primary btn-sm" style="margin-left: 0.75rem;">LIÊN HỆ HỖ TRỢ ĐƠN NÀY</a>
      </div>
    </div>
  `;
}
