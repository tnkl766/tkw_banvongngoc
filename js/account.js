/* ==========================================================================
   JADE - ACCOUNT & DEMO AUTH CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupAuthTabs();
  checkAuthState();
  setupLoginForm();
  setupRegisterForm();
  setupForgotPassword();
});

function checkAuthState() {
  const user = getCurrentUser();
  const authSection = document.getElementById('account-auth-section');
  const dashboardSection = document.getElementById('account-dashboard-section');

  if (user && user.loggedIn) {
    if (authSection) authSection.style.display = 'none';
    if (dashboardSection) {
      dashboardSection.style.display = 'block';
      renderUserDashboard(user);
    }
  } else {
    if (authSection) authSection.style.display = 'block';
    if (dashboardSection) dashboardSection.style.display = 'none';
  }
}

function setupAuthTabs() {
  const tabLogin = document.getElementById('tab-btn-login');
  const tabRegister = document.getElementById('tab-btn-register');
  const formLogin = document.getElementById('form-login-box');
  const formRegister = document.getElementById('form-register-box');

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      formLogin.style.display = 'block';
      formRegister.style.display = 'none';
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      formLogin.style.display = 'none';
      formRegister.style.display = 'block';
    });
  }
}

function setupLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value.trim();

    if (!email || !pass) {
      showToast('Lỗi đăng nhập', 'Vui lòng nhập email và mật khẩu.', 'error');
      return;
    }

    // Demo successful login
    const user = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      phone: '0988 888 888',
      address: '24 Hai Bà Trưng, Hoàn Kiếm, Hà Nội',
      loggedIn: true
    };

    saveCurrentUser(user);
    showToast('Đăng nhập thành công', `Chào mừng trở lại, ${user.name}!`, 'success');
    checkAuthState();

    // Check redirect param
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect');
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = decodeURIComponent(redirectUrl);
      }, 700);
    }
  });
}

function setupRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const pass = document.getElementById('reg-password').value.trim();

    if (!name || !email || !phone || !pass) {
      showToast('Lỗi đăng ký', 'Vui lòng điền đầy đủ các trường thông tin.', 'error');
      return;
    }

    const user = {
      name: name,
      email: email,
      phone: phone,
      address: 'Chưa cập nhật địa chỉ mặc định',
      loggedIn: true
    };

    saveCurrentUser(user);
    showToast('Đăng ký thành công!', `Chào mừng quý khách ${name} gia nhập thành viên VIP của JADE.`, 'success');
    checkAuthState();

    // Check redirect param
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect');
    if (redirectUrl) {
      setTimeout(() => {
        window.location.href = decodeURIComponent(redirectUrl);
      }, 700);
    }
  });
}

function setupForgotPassword() {
  const forgotLink = document.getElementById('link-forgot-pass');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = prompt('Vui lòng nhập email của quý khách để nhận liên kết khôi phục mật khẩu demo:');
      if (email) {
        showToast('Đã gửi liên kết', `Hướng dẫn đặt lại mật khẩu đã được gửi tới ${email}. Vui lòng kiểm tra hộp thư đến.`, 'info');
      }
    });
  }
}

function renderUserDashboard(user) {
  const nameEl = document.getElementById('dash-user-name');
  const emailEl = document.getElementById('dash-user-email');
  const phoneEl = document.getElementById('dash-user-phone');
  const addressEl = document.getElementById('dash-user-address');
  const ordersListEl = document.getElementById('dash-orders-list');

  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = user.email;
  if (phoneEl) phoneEl.textContent = user.phone;
  if (addressEl) addressEl.textContent = user.address;

  // Render orders
  let orders = getStoredOrders();
  if (orders.length === 0) {
    // Inject mock demo order
    orders = [
      {
        id: 'JADE-2026-8899',
        date: '08/11/2026',
        grandTotal: 28500000,
        status: 'Đang giao hàng',
        items: [{ name: 'Vòng Ngọc Phỉ Thuý Băng Chủng Hoàng Gia', size: 'Ni 54' }]
      }
    ];
  }

  if (ordersListEl) {
    ordersListEl.innerHTML = orders.map(o => `
      <div class="order-history-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <strong>Mã: ${o.id}</strong>
            <span class="text-muted" style="font-size: 0.8rem; margin-left: 0.5rem;">(${o.date})</span>
          </div>
          <span class="badge badge-subtle">${o.status}</span>
        </div>
        <div style="font-size: 0.85rem; color: var(--color-text); margin-bottom: 0.75rem;">
          ${o.items.map(i => `${i.name} (Ni: ${i.size})`).join(', ')}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-subtle); padding-top: 0.5rem;">
          <span style="font-weight: 600; color: var(--color-primary);">${formatPrice(o.grandTotal)}</span>
          <a href="order-detail.html?id=${o.id}" class="btn btn-outline btn-sm">Xem Chi Tiết</a>
        </div>
      </div>
    `).join('');
  }

  // Logout button
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      saveCurrentUser(null);
      showToast('Đã đăng xuất', 'Quý khách đã đăng xuất an toàn.', 'info');
      checkAuthState();
    });
  }
}
