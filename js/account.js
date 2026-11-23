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


/* ĐĂNG NHẬP VÀ ĐĂNG KÝ - BẢN DEMO JADE */
const JADE_ACCOUNTS_KEY = 'jade_demo_accounts';

function getDemoAccounts() {
  try {
    const accounts = JSON.parse(
      localStorage.getItem(JADE_ACCOUNTS_KEY) || '[]'
    );
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
}

async function hashDemoPassword(password, salt) {
  const bytes = new TextEncoder().encode(salt + ':' + password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);

  return Array.from(
    new Uint8Array(digest),
    b => b.toString(16).padStart(2, '0')
  ).join('');
}

function finishAccountLogin(account) {
  const user = {
    name: account.name,
    email: account.email,
    phone: account.phone || '',
    address: account.address || 'Chưa cập nhật địa chỉ mặc định',
    loggedIn: true
  };

  saveCurrentUser(user);
  checkAuthState();

  if (typeof updateAccountHeaderUI === 'function') {
    updateAccountHeaderUI();
  }

  showToast(
    'Đăng nhập thành công',
    'Xin chào ' + user.name + '!',
    'success'
  );

  const redirect = new URLSearchParams(location.search).get('redirect');

  if (redirect) {
    const destination = new URL(redirect, location.href);

    if (
      destination.origin === location.origin &&
      /^https?:$/.test(destination.protocol)
    ) {
      setTimeout(() => location.assign(destination.href), 500);
    }
  }
}

function setupLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const identifier = document.getElementById('login-email')
      .value.trim().toLowerCase();

    const password = document.getElementById('login-password').value;

    if (!identifier || !password) {
      showToast(
        'Thiếu thông tin',
        'Nhập email/số điện thoại và mật khẩu.',
        'error'
      );
      return;
    }

    // Tài khoản thử nghiệm
    if (
      identifier === 'khachhang.vip@gmail.com' &&
      password === 'demo1234'
    ) {
      finishAccountLogin({
        name: 'Khách Hàng VIP',
        email: identifier,
        phone: '0988 888 888',
        address: '24 Hai Bà Trưng, Hoàn Kiếm, Hà Nội'
      });
      return;
    }

    const account = getDemoAccounts().find(a =>
      a.email.toLowerCase() === identifier ||
      a.phone === identifier
    );

    if (
      !account ||
      await hashDemoPassword(password, account.salt) !== account.passwordHash
    ) {
      showToast(
        'Đăng nhập thất bại',
        'Email/số điện thoại hoặc mật khẩu không đúng.',
        'error'
      );
      return;
    }

    finishAccountLogin(account);
  });
}

function setupRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email')
      .value.trim().toLowerCase();
    const phone = document.getElementById('reg-phone').value.trim();
    const password = document.getElementById('reg-password').value;

    if (!name || !email || !phone || !password) {
      showToast(
        'Thiếu thông tin',
        'Vui lòng nhập đủ thông tin.',
        'error'
      );
      return;
    }

    if (password.length < 6) {
      showToast(
        'Mật khẩu quá ngắn',
        'Mật khẩu phải có ít nhất 6 ký tự.',
        'error'
      );
      return;
    }

    const accounts = getDemoAccounts();

    if (
      email === 'khachhang.vip@gmail.com' ||
      accounts.some(a => a.email === email || a.phone === phone)
    ) {
      showToast(
        'Đăng ký thất bại',
        'Email hoặc số điện thoại đã được sử dụng.',
        'error'
      );
      return;
    }

    const salt = Array.from(
      crypto.getRandomValues(new Uint8Array(16)),
      b => b.toString(16).padStart(2, '0')
    ).join('');

    const account = {
      name,
      email,
      phone,
      salt,
      passwordHash: await hashDemoPassword(password, salt)
    };

    accounts.push(account);

    localStorage.setItem(
      JADE_ACCOUNTS_KEY,
      JSON.stringify(accounts)
    );

    finishAccountLogin(account);
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
