/*checkout*/

let selectedShippingMethod = 'standard';
let selectedPaymentMethod = 'cod';

document.addEventListener('DOMContentLoaded', () => {
  // Enforce authentication on checkout page
  if (!isUserLoggedIn()) {
    openAuthRequiredModal({ type: 'checkout' });
    showToast('Yêu cầu đăng nhập', 'Quý khách vui lòng đăng nhập tài khoản để đặt hàng và bảo hành sản phẩm.', 'info');
  } else {
    // Autofill user info if available
    const user = getCurrentUser();
    if (user) {
      const nameInput = document.getElementById('checkout-name');
      const phoneInput = document.getElementById('checkout-phone');
      const emailInput = document.getElementById('checkout-email');
      const addressInput = document.getElementById('checkout-address');

      if (nameInput && !nameInput.value) nameInput.value = user.name || '';
      if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
      if (emailInput && !emailInput.value) emailInput.value = user.email || '';
      if (addressInput && !addressInput.value) addressInput.value = user.address || '';
    }
  }

  renderCheckoutSummary();
  setupCheckoutListeners();
});

function renderCheckoutSummary() {
  const cart = getStoredCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  const itemsContainer = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const totalEl = document.getElementById('checkout-total');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let shippingFee = 0;
  if (selectedShippingMethod === 'express') {
    shippingFee = 50000;
  } else {
    shippingFee = subtotal >= 2000000 ? 0 : 30000;
  }

  const grandTotal = subtotal + shippingFee;

  if (itemsContainer) {
    itemsContainer.innerHTML = cart.map(item => `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem; font-size: var(--font-size-sm);">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${typeof resolveProductImg === 'function' ? resolveProductImg(item.image) : item.image}" alt="${item.name}" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover; border: 1px solid var(--color-border);" />
          <div>
            <div style="font-weight: 500; color: var(--color-heading);">${item.name}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-light);">Ni: ${item.size} &times; ${item.quantity}</div>
          </div>
        </div>
        <strong>${formatPrice(item.price * item.quantity)}</strong>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee);
  if (totalEl) totalEl.textContent = formatPrice(grandTotal);
}

function setupCheckoutListeners() {
  // Shipping choice
  document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      selectedShippingMethod = e.target.value;
      renderCheckoutSummary();
    });
  });

  // Payment choice
  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      selectedPaymentMethod = e.target.value;
      const bankDetails = document.getElementById('bank-transfer-info');
      if (bankDetails) {
        if (selectedPaymentMethod === 'bank') {
          bankDetails.classList.add('show');
        } else {
          bankDetails.classList.remove('show');
        }
      }
    });
  });

  // Form submit
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('checkout-name').value.trim();
      const phone = document.getElementById('checkout-phone').value.trim();
      const email = document.getElementById('checkout-email').value.trim();
      const city = document.getElementById('checkout-city').value.trim();
      const address = document.getElementById('checkout-address').value.trim();
      const notes = document.getElementById('checkout-notes') ? document.getElementById('checkout-notes').value.trim() : '';

      // Basic validation
      if (!fullName || !phone || !email || !city || !address) {
        showToast('Thiếu thông tin', 'Vui lòng điền đầy đủ các thông tin giao hàng bắt buộc.', 'error');
        return;
      }

      if (phone.length < 9) {
        showToast('Số điện thoại không đúng', 'Vui lòng nhập số điện thoại hợp lệ.', 'error');
        return;
      }

      const cart = getStoredCart();
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shippingFee = (selectedShippingMethod === 'express') ? 50000 : (subtotal >= 2000000 ? 0 : 30000);
      const grandTotal = subtotal + shippingFee;

      const orderId = 'JADE-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        customer: {
          fullName,
          phone,
          email,
          city,
          address,
          notes
        },
        shippingMethod: selectedShippingMethod === 'express' ? 'Giao Hỏa Tốc (2 Giờ)' : 'Giao Tiêu Chuẩn (2-3 Ngày)',
        paymentMethod: selectedPaymentMethod === 'bank' ? 'Chuyển Khoản Ngân Hàng' : 'Thanh Toán Khi Nhận Hàng (COD)',
        status: 'Chờ xác nhận',
        items: cart,
        subtotal,
        shippingFee,
        grandTotal
      };

      // Save order
      const orders = getStoredOrders();
      orders.unshift(newOrder);
      saveOrders(orders);

      // Save last order
      localStorage.setItem('jade_last_order', JSON.stringify(newOrder));

      // Clear cart
      saveCart([]);

      // Redirect to success
      window.location.href = `order-success.html?id=${orderId}`;
    });
  }
}
