(function () {
  "use strict";

  const root = new URL("../", document.currentScript.src);
  const params = new URLSearchParams(location.search);
  const rootCart = params.get("cart") === "ngocyen_cart";
  const cartKey = rootCart ? "ngocyen_cart" : "cart";
  const profileKey = "ngocyen.profile";
  const ordersKey = "orders";
  const freeShipping = 2000000;
  const shipping = {
    standard: { name: "Giao tiêu chuẩn", fee: 30000, time: "Dự kiến 2–4 ngày làm việc" },
    express: { name: "Giao hỏa tốc", fee: 65000, time: "Dự kiến trong 2 giờ" }
  };
  const payment = { cod: "Thanh toán khi nhận hàng (COD)", vietqr: "Chuyển khoản VietQR (demo)" };
  const steps = [
    { key: "received", title: "Đã tiếp nhận", description: "Đơn hàng đã được ghi nhận.", icon: "check" },
    { key: "packing", title: "Đang chuẩn bị", description: "Kiểm tra và đóng gói sản phẩm.", icon: "box" },
    { key: "shipping", title: "Đang giao", description: "Vận chuyển đến địa chỉ nhận hàng.", icon: "truck" },
    { key: "delivered", title: "Đã giao", description: "Bàn giao cho người nhận.", icon: "pin" }
  ];

  const icons = {
    account: '<circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/>',
    arrow: '<path d="M4.5 12h14m-6-6 6 6-6 6"/>',
    bag: '<path d="M5 7h14l2 14H3L5 7Z"/><path d="M8.5 9V5.5a3.5 3.5 0 0 1 7 0V9"/>',
    box: '<path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z"/><path d="m3.5 7.5 8.5 4.7 8.5-4.7M12 12.2V21M7.7 5.3l8.6 4.6"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18m-14 6h4"/>',
    check: '<path d="m5 12 4.2 4.2L19 6.5"/>',
    chevron: '<path d="m10 6 6 6-6 6"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.7"/>',
    pin: '<path d="M19 10c0 5-7 10.5-7 10.5S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/>',
    qr: '<path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM13 13h4v4h4v4h-4m-4-2v2m8-8v1"/>',
    truck: '<path d="M2.5 5h12v12h-12zM14.5 10h4l3 3v4h-7"/><circle cx="6.5" cy="17" r="2" fill="var(--ny-icon-fill,white)"/><circle cx="17.5" cy="17" r="2" fill="var(--ny-icon-fill,white)"/>'
  };

  const money = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
  const localZone = "Asia/Ho_Chi_Minh";
  const dates = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: localZone
  });
  const year = new Intl.DateTimeFormat("vi-VN", { year: "numeric", timeZone: localZone });

  function icon(name) {
    return '<svg class="ny-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (icons[name] || "") + "</svg>";
  }

  function make(tag, value = "", className = "") {
    const node = document.createElement(tag);
    node.textContent = value;
    node.className = className;
    return node;
  }

  function href(page, id) {
    if (page === "home") return new URL(rootCart ? "trangchu.html" : "index.html", root).href;
    if (page === "cart" && rootCart) return new URL("cart.html", root).href;
    const url = new URL("pages/" + page + ".html", root);
    if (id) url.searchParams.set("id", id);
    if (rootCart) url.searchParams.set("cart", cartKey);
    return url.href;
  }

  function dateText(value) {
    const date = value ? new Date(value) : null;
    return date && Number.isFinite(date.getTime()) ? dates.format(date) : "—";
  }

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return { raw, value: raw === null ? fallback : JSON.parse(raw) };
    } catch {
      throw new Error("Dữ liệu lưu trên trình duyệt hiện chưa đọc được.");
    }
  }

  function priceNumber(value) {
    if (typeof value === "number") return value;
    if (typeof value !== "string") return NaN;
    const text = value.trim().replace(/\s*(?:₫|đ|VND|VNĐ)$/i, "");
    if (/^\d{1,3}(?:[.,]\d{3})+$/.test(text)) return Number(text.replace(/[.,]/g, ""));
    return /^\d+$/.test(text) ? Number(text) : NaN;
  }

  function normalizeItem(entry) {
    if (!entry || typeof entry !== "object") return null;
    const product = entry.product || entry;
    const name = String(entry.name ?? product.name ?? product.title ?? "").trim();
    const price = priceNumber(entry.price ?? product.price);
    const quantity = Number(entry.quantity ?? entry.qty ?? 1);
    if (!name || !Number.isSafeInteger(price) || price < 0 || !Number.isSafeInteger(quantity) || quantity < 1) {
      return null;
    }
    return {
      id: String(entry.id ?? product.id ?? ""),
      name,
      variant: String(entry.variant ?? entry.size ?? product.variant ?? ""),
      price,
      quantity,
      image: String(entry.image ?? product.image ?? product.img ?? "")
    };
  }

  function getCart() {
    const { raw, value } = read(cartKey, []);
    const lines = Array.isArray(value) ? value : value?.items;
    const items = Array.isArray(lines) ? lines.map(normalizeItem) : null;
    if (!items || items.some(item => item === null)) {
      throw new Error("Giỏ hàng có dữ liệu chưa hợp lệ. Vui lòng kiểm tra giá và số lượng sản phẩm.");
    }
    return { raw, value, items };
  }

  function getAllOrders() {
    const { value } = read(ordersKey, []);
    if (!Array.isArray(value)) throw new Error("Lịch sử đơn hàng có dữ liệu chưa hợp lệ.");
    return value;
  }

  function getOrders() {
    return getAllOrders()
      .filter(order => order && (order.id || order.code) && !order.demo)
      .map(order => ({
        ...order,
        id: String(order.id || order.code),
        createdAt: order.createdAt || order.date,
        items: Array.isArray(order.items) ? order.items.map(normalizeItem).filter(Boolean) : [],
        customer: order.customer || {}
      }));
  }

  function getProfile() {
    const { value } = read(profileKey, {});
    return value && typeof value === "object" ? value : {};
  }

  function saveProfile(profile) {
    localStorage.setItem(profileKey, JSON.stringify(profile));
  }

  function amounts(items, method) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const fee = method === "standard" && subtotal >= freeShipping ? 0 : shipping[method].fee;
    if (!Number.isSafeInteger(subtotal + fee)) throw new Error("Tổng tiền giỏ hàng vượt giới hạn.");
    return { subtotal, shippingFee: fee, total: subtotal + fee };
  }

  function orderTotals(order) {
    const method = Object.hasOwn(shipping, order.shippingMethod) ? order.shippingMethod : "standard";
    const calculated = amounts(order.items, method);
    const subtotal = priceNumber(order.subtotal);
    const fee = priceNumber(order.shippingFee);
    const total = priceNumber(order.total);
    const shippingFee = Number.isFinite(fee) ? fee : calculated.shippingFee;
    const itemTotal = Number.isFinite(subtotal) ? subtotal : calculated.subtotal;
    return { subtotal: itemTotal, shippingFee, total: Number.isFinite(total) ? total : itemTotal + shippingFee };
  }

  function makeCode(orders, date) {
    let code;
    do {
      const suffix = crypto.getRandomValues(new Uint32Array(1))[0].toString(36).toUpperCase().padStart(6, "0").slice(-6);
      code = "JADE-" + year.format(date) + "-" + suffix;
    } while (orders.some(order => order?.id === code || order?.code === code));
    return code;
  }

  async function placeOrder(snapshot, customer, shippingMethod, paymentMethod) {
    const commit = () => {
      const cart = getCart();
      if (!cart.items.length || cart.raw !== snapshot) {
        throw new Error("Giỏ hàng vừa thay đổi. Hãy kiểm tra lại đơn trước khi đặt.");
      }
      const previous = getAllOrders();
      const date = new Date();
      const order = {
        id: makeCode(previous, date),
        createdAt: date.toISOString(),
        status: "received",
        customer,
        items: cart.items,
        shippingMethod,
        paymentMethod,
        ...amounts(cart.items, shippingMethod)
      };
      const cleared = Array.isArray(cart.value) ? [] : { ...cart.value, items: [] };
      localStorage.setItem(ordersKey, JSON.stringify([order, ...previous]));
      try {
        localStorage.setItem(cartKey, JSON.stringify(cleared));
      } catch (error) {
        localStorage.setItem(ordersKey, JSON.stringify(previous));
        throw error;
      }
      return order;
    };
    return navigator.locks ? navigator.locks.request("ngocyen-checkout", commit) : commit();
  }

  function fillCustomer(form, profile) {
    for (const key of ["name", "phone", "address"]) {
      if (!form.elements[key].value) form.elements[key].value = profile[key] || "";
    }
  }

  function setFieldError(field, error) {
    const message = document.getElementById(field.id + "-error");
    if (message) message.textContent = error || "";
    if (error) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }

  function validateCustomer(form) {
    const data = new FormData(form);
    const customer = { name: data.get("name").trim(), phone: data.get("phone").trim(), address: data.get("address").trim() };
    if (data.has("note")) customer.note = data.get("note").trim();
    const compactPhone = customer.phone.replace(/[\s().-]/g, "");
    const errors = {
      name: customer.name.length < 2 ? "Hãy nhập họ và tên người nhận." : "",
      phone: !/^(?:\+?84|0)[1-9]\d{8,9}$/.test(compactPhone) ? "Hãy nhập số điện thoại hợp lệ." : "",
      address: !customer.address ? "Hãy nhập địa chỉ nhận hàng." : ""
    };
    for (const [name, error] of Object.entries(errors)) setFieldError(form.elements[name], error);
    const firstError = Object.keys(errors).find(name => errors[name]);
    if (firstError) {
      form.elements[firstError].focus();
      return null;
    }
    return customer;
  }

  function clearErrorsOnInput(form) {
    form.addEventListener("input", event => {
      if (event.target.hasAttribute("aria-invalid")) setFieldError(event.target, "");
    });
  }

  function imageHref(value) {
    if (!value) return "";
    try {
      const url = new URL(value.replace(/^(?:\.{1,2}\/)+/, ""), root);
      if (["http:", "https:"].includes(url.protocol) || (root.protocol === "file:" && url.protocol === "file:")) return url.href;
    } catch {
      return "";
    }
    return "";
  }

  function renderItems(list, items) {
    const rows = items.map(item => {
      const row = make("li", "", "ny-product");
      const thumb = make("span", "", "ny-product__image");
      thumb.innerHTML = icon("bag");
      const image = imageHref(item.image);
      if (image) {
        const img = document.createElement("img");
        img.alt = "";
        img.addEventListener("load", () => thumb.replaceChildren(img), { once: true });
        img.src = image;
      }
      const description = make("div", "", "ny-product__copy");
      description.append(
        make("strong", item.name, "ny-product__name"),
        make("span", [item.variant, "SL " + item.quantity].filter(Boolean).join(" · "), "ny-muted ny-small")
      );
      row.append(thumb, description, make("strong", money.format(item.price * item.quantity), "ny-product__price"));
      return row;
    });
    list.replaceChildren(...rows);
  }

  function statusIndex(status) {
    return Math.max(0, steps.findIndex(step => step.key === status || step.title === status));
  }

  function statusText(status) {
    return steps[statusIndex(status)].title;
  }

  function renderTimeline(list, order) {
    const current = statusIndex(order.status);
    list.replaceChildren(...steps.map((step, index) => {
      const item = make("li", "", "ny-timeline__step");
      if (index <= current) item.classList.add("is-reached");
      if (index === current) item.setAttribute("aria-current", "step");
      const mark = make("span", "", "ny-timeline__mark");
      mark.innerHTML = icon(step.icon);
      item.append(mark, make("strong", step.title), make("span", step.description, "ny-muted ny-small"));
      return item;
    }));
  }

  function renderOrder() {
    const section = document.querySelector("[data-order-content]");
    if (!section) return;
    const empty = document.querySelector("[data-order-missing]");
    try {
      const order = getOrders().find(entry => entry.id === params.get("id"));
      if (!order) {
        empty.hidden = false;
        return;
      }
      const cost = orderTotals(order);
      const values = {
        code: order.id,
        date: dateText(order.createdAt),
        status: statusText(order.status),
        name: order.customer.name || order.customer.fullName || "—",
        phone: order.customer.phone || "—",
        address: order.customer.address || "—",
        note: order.customer.note || "—",
        shipping: shipping[order.shippingMethod]?.name || "—",
        payment: payment[order.paymentMethod] || "—",
        subtotal: money.format(cost.subtotal),
        fee: cost.shippingFee ? money.format(cost.shippingFee) : "Miễn phí",
        total: money.format(cost.total)
      };
      section.querySelectorAll("[data-order-value]").forEach(node => {
        node.textContent = values[node.dataset.orderValue];
      });
      const detail = section.querySelector("[data-detail-link]");
      if (detail) detail.href = href("order-detail", order.id);
      const note = section.querySelector("[data-success-note]");
      if (note) {
        note.textContent = order.paymentMethod === "vietqr"
          ? "Đơn hàng đã được ghi nhận với phương thức VietQR demo."
          : "Bạn sẽ thanh toán khi nhận hàng.";
      }
      const list = section.querySelector("[data-order-items]");
      if (list) renderItems(list, order.items);
      section.querySelectorAll("[data-timeline]").forEach(list => renderTimeline(list, order));
      section.hidden = false;
    } catch {
      empty.querySelector("p").textContent = "Lịch sử đơn hàng hiện chưa đọc được trên trình duyệt này.";
      empty.hidden = false;
    }
  }

  function renderShell() {
    const header = document.querySelector("[data-site-header]");
    const footer = document.querySelector("[data-site-footer]");
    header.innerHTML = '<div class="ny-wrap ny-site-header__inner">' +
      '<a class="ny-brand" data-home>Jade</a>' +
      '<nav aria-label="Điều hướng chính" class="ny-site-nav">' +
      '<a class="ny-site-nav__shipping" data-link="shipping">Giao hàng</a>' +
      '<a data-link="account">' + icon("account") + '<span>Tài khoản</span></a>' +
      '<a class="ny-site-nav__cart" data-cart-link>' + icon("bag") + '<span data-cart-label>Giỏ hàng</span></a>' +
      '</nav></div>';
    const home = header.querySelector("[data-home]");
    home.href = href("home");
    const cart = header.querySelector("[data-cart-link]");
    cart.href = href("cart");
    const label = cart.querySelector("[data-cart-label]");
    try {
      const count = getCart().items.reduce((sum, item) => sum + item.quantity, 0);
      if (count > 0) label.textContent += " (" + count + ")";
    } catch {
      // Giữ liên kết giỏ hàng để người dùng xem và kiểm tra lại dữ liệu.
    }
    footer.innerHTML = '<div class="ny-wrap ny-site-footer__inner">' +
      '<span>© 2026 Jade</span><div><a data-link="shipping">Chính sách vận chuyển</a>' +
      '<a href="tel:0909123456">0909 123 456</a></div></div>';
    document.querySelectorAll("[data-link]").forEach(link => {
      const page = link.dataset.link;
      link.href = href(page);
      if (document.body.dataset.page === page) link.setAttribute("aria-current", "page");
    });
    document.querySelectorAll("[data-icon]").forEach(node => { node.innerHTML = icon(node.dataset.icon); });
    document.querySelectorAll("[data-shipping-price]").forEach(node => { node.textContent = money.format(shipping[node.dataset.shippingPrice].fee); });
    document.querySelectorAll("[data-shipping-time]").forEach(node => { node.textContent = shipping[node.dataset.shippingTime].time; });
    document.querySelectorAll("[data-free-shipping]").forEach(node => { node.textContent = money.format(freeShipping); });
  }

  window.NgocYen = {
    cartKey, ordersKey, shipping, freeShipping, money, href, make, dateText, statusText,
    getCart, getOrders, getProfile, saveProfile, orderTotals, amounts, placeOrder,
    fillCustomer, validateCustomer, clearErrorsOnInput, renderItems
  };

  renderShell();
  renderOrder();
}());
