(function () {
  "use strict";

  const shop = window.NgocYen;
  const form = document.querySelector("#checkout-form");
  const layout = document.querySelector("[data-checkout-layout]");
  const empty = document.querySelector("[data-checkout-empty]");
  const emptyHeading = empty.querySelector("h2");
  const emptyCopy = empty.querySelector("p");
  const submit = document.querySelector("[data-place-order]");
  const submitLabel = submit.querySelector("[data-button-label]");
  const message = document.querySelector("[data-checkout-message]");
  const itemList = document.querySelector("[data-checkout-items]");
  const qr = document.querySelector("[data-vietqr]");
  const prices = Object.fromEntries(
    Array.from(document.querySelectorAll("[data-amount]"), node => [node.dataset.amount, node])
  );
  let cart;

  function refreshTotals() {
    const method = form.elements.shippingMethod.value;
    const payment = form.elements.paymentMethod.value;
    const total = shop.amounts(cart.items, method);
    prices.subtotal.textContent = shop.money.format(total.subtotal);
    prices.shippingFee.textContent = total.shippingFee ? shop.money.format(total.shippingFee) : "Miễn phí";
    prices.total.textContent = shop.money.format(total.total);
    const standard = shop.amounts(cart.items, "standard");
    prices.standard.textContent = standard.shippingFee ? shop.money.format(standard.shippingFee) : "Miễn phí";
    qr.hidden = payment !== "vietqr";
    document.querySelector("[data-vietqr-total]").textContent = shop.money.format(total.total);
  }

  function refreshCart() {
    try {
      cart = shop.getCart();
      if (!cart.items.length) {
        emptyHeading.textContent = "Giỏ hàng đang trống";
        emptyCopy.textContent = "Thêm sản phẩm vào giỏ để tiếp tục thanh toán.";
        layout.hidden = true;
        empty.hidden = false;
        return;
      }
      shop.renderItems(itemList, cart.items);
      const quantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      document.querySelector("[data-cart-quantity]").textContent = quantity + " sản phẩm";
      refreshTotals();
      layout.hidden = false;
      empty.hidden = true;
    } catch (error) {
      emptyHeading.textContent = "Cần kiểm tra giỏ hàng";
      emptyCopy.textContent = error.message;
      layout.hidden = true;
      empty.hidden = false;
    }
  }

  try {
    shop.fillCustomer(form, shop.getProfile());
  } catch {
    // Khách có thể điền thông tin nhận hàng trực tiếp.
  }
  refreshCart();
  shop.clearErrorsOnInput(form);
  form.addEventListener("change", event => {
    if (["shippingMethod", "paymentMethod"].includes(event.target.name)) refreshTotals();
  });
  window.addEventListener("storage", event => {
    if (event.key === shop.cartKey || event.key === null) refreshCart();
  });
  window.addEventListener("pageshow", event => {
    if (event.persisted) {
      submit.disabled = false;
      submitLabel.textContent = "Đặt hàng";
      refreshCart();
    }
  });
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (submit.disabled) return;
    message.textContent = "";
    const customer = shop.validateCustomer(form);
    if (!customer) return;

    submit.disabled = true;
    submitLabel.textContent = "Đang đặt hàng…";
    try {
      const order = await shop.placeOrder(
        cart.raw, customer, form.elements.shippingMethod.value, form.elements.paymentMethod.value
      );
      location.assign(shop.href("order-success", order.id));
    } catch (error) {
      refreshCart();
      const storageFailure = error instanceof DOMException;
      const text = storageFailure ? "Chưa thể lưu đơn trên trình duyệt. Bạn hãy thử lại." : error.message;
      if (layout.hidden) emptyCopy.textContent += " " + text;
      else message.textContent = text;
      submit.disabled = false;
      submitLabel.textContent = "Đặt hàng";
    }
  });
}());
