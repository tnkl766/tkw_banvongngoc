(function () {
  "use strict";

  const shop = window.NgocYen;
  const form = document.querySelector("#profile-form");
  const message = document.querySelector("[data-profile-message]");
  const list = document.querySelector("[data-account-orders]");
  const empty = document.querySelector("[data-account-empty]");
  const emptyText = empty.querySelector("p");
  const count = document.querySelector("[data-orders-count]");

  function renderOrders() {
    try {
      const orders = shop.getOrders().sort((first, second) =>
        (Date.parse(second.createdAt) || 0) - (Date.parse(first.createdAt) || 0)
      );
      const rows = orders.map(order => {
        const row = shop.make("li", "", "ny-account-order");
        const meta = shop.make("div", "", "ny-account-order__meta");
        const code = shop.make("a", order.id, "ny-account-order__code");
        code.href = shop.href("order-detail", order.id);
        meta.append(code, shop.make("span", shop.dateText(order.createdAt), "ny-small ny-muted"));
        const state = shop.make("span", shop.statusText(order.status), "ny-status");
        const price = shop.make("strong", shop.money.format(shop.orderTotals(order).total), "ny-account-order__price");
        const detail = shop.make("a", "Xem chi tiết", "ny-text-link");
        detail.href = code.href;
        detail.setAttribute("aria-label", "Xem chi tiết đơn " + order.id);
        row.append(meta, state, price, detail);
        return row;
      });
      list.replaceChildren(...rows);
      count.textContent = orders.length + " đơn";
      emptyText.textContent = "Bạn chưa có đơn hàng trên trình duyệt này.";
      empty.hidden = orders.length !== 0;
    } catch {
      list.replaceChildren();
      count.textContent = "";
      emptyText.textContent = "Lịch sử đơn hàng hiện chưa đọc được trên trình duyệt này.";
      empty.hidden = false;
    }
  }

  try {
    shop.fillCustomer(form, shop.getProfile());
  } catch {
    message.textContent = "Thông tin tài khoản hiện chưa đọc được.";
    message.dataset.state = "error";
  }
  shop.clearErrorsOnInput(form);
  form.addEventListener("input", () => { message.textContent = ""; });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const profile = shop.validateCustomer(form);
    if (!profile) return;
    try {
      shop.saveProfile(profile);
      message.textContent = "Đã lưu thông tin nhận hàng.";
      message.dataset.state = "saved";
    } catch {
      message.textContent = "Chưa lưu được thông tin. Bạn hãy thử lại.";
      message.dataset.state = "error";
    }
  });
  window.addEventListener("storage", event => {
    if (event.key === shop.ordersKey || event.key === null) renderOrders();
  });
  window.addEventListener("pageshow", event => {
    if (event.persisted) renderOrders();
  });
  renderOrders();
}());
