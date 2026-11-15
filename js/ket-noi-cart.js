/* Nối giỏ hàng gốc với checkout. Không cần script nội tuyến trong cart.html. */
(function () {
    "use strict";

    const cart = window.NgocYenCart;
    const container = document.getElementById("cart-items-container");
    const button = document.getElementById("checkout-button");
    let items = [];
    const sample = [
        { id: 1, name: "Vòng bản Ngọc hòa điền - Hoàng Khẩu Mật", description: "Ngọc thiên nhiên A-grade, size 56.",
            price: 3200000, quantity: 1, image: "NgocYen_image/Vòng bản/Ngọc hòa điền - Hoàng Khẩu Mật/2.jpg" },
        { id: 2, name: "Vòng tay ngọc lam băng", description: "Thu hút may mắn và tài lộc, size 8 li.",
            price: 1500000, quantity: 1, image: "NgocYen_image/Vòng hạt/ngọc lam băng/vong-tay-bang-lam-ngoc-7-8-ly-4.webp" }
    ];

    function message(text) {
        document.getElementById("cart-message").textContent = text;
    }

    function save(nextItems) {
        try {
            items = cart.write(nextItems);
            message("");
            render();
        } catch (error) {
            message("Chưa lưu được thay đổi. Hãy cho phép lưu trữ hoặc mở bài bằng Live Server rồi thử lại.");
        }
    }

    function makeButton(text, label, action, className) {
        const control = document.createElement("button");
        control.type = "button";
        control.className = className;
        control.textContent = text;
        control.setAttribute("aria-label", label);
        control.addEventListener("click", action);
        return control;
    }

    function render() {
        cart.renderProducts(container, items);
        items.forEach((item, index) => {
            const controls = document.createElement("div");
            controls.className = "cart-controls";
            const quantity = document.createElement("div");
            quantity.className = "quantity-controls";
            const decrease = makeButton("−", "Giảm số lượng " + item.name, () => {
                save(items.map((entry, i) => i === index ? { ...entry, quantity: entry.quantity - 1 } : entry));
            }, "quantity-button");
            decrease.disabled = item.quantity === 1;
            const count = document.createElement("span");
            count.textContent = item.quantity;
            count.setAttribute("aria-label", "Số lượng");
            const increase = makeButton("+", "Tăng số lượng " + item.name, () => {
                save(items.map((entry, i) => i === index ? { ...entry, quantity: entry.quantity + 1 } : entry));
            }, "quantity-button");
            quantity.append(decrease, count, increase);
            const remove = makeButton("Xóa", "Xóa " + item.name + " khỏi giỏ hàng", () => {
                save(items.filter((entry, i) => i !== index));
            }, "remove-button");
            controls.append(quantity, remove);
            container.children[index].appendChild(controls);
        });
        if (!items.length) {
            const empty = document.createElement("p");
            empty.className = "empty-state";
            empty.textContent = "Giỏ hàng đang trống. Bạn có thể nạp giỏ mẫu để thử luồng thanh toán.";
            container.appendChild(empty);
        }
        const amounts = cart.totals(items);
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cart-badge").textContent = totalItems;
        document.getElementById("subtotal").textContent = cart.money(amounts.subtotal);
        document.getElementById("shipping-fee").textContent = amounts.shippingFee ? cart.money(amounts.shippingFee) : "Miễn phí";
        document.getElementById("total-price").textContent = cart.money(amounts.total);
        const remaining = Math.max(2000000 - amounts.subtotal, 0);
        document.getElementById("progress-text").textContent = remaining ?
            "Mua thêm " + cart.money(remaining) + " để được miễn phí giao tiêu chuẩn." :
            "Bạn đã được miễn phí giao tiêu chuẩn!";
        const percent = Math.min(amounts.subtotal / 2000000 * 100, 100);
        document.getElementById("progress-bar").style.width = percent + "%";
        document.getElementById("shipping-progress").setAttribute("aria-valuenow", Math.round(percent));
        button.disabled = !items.length;
    }

    function reload() {
        try {
            items = cart.read();
            message("");
        } catch (error) {
            items = [];
            message("Không đọc được giỏ hàng. Bạn có thể bấm Nạp giỏ mẫu để khôi phục dữ liệu minh họa.");
        }
        render();
    }

    button.addEventListener("click", () => {
        if (!items.length) return;
        try {
            const latest = cart.read();
            if (JSON.stringify(latest) !== JSON.stringify(items)) {
                reload();
                message("Giỏ hàng vừa thay đổi. Vui lòng kiểm tra lại trước khi thanh toán.");
                return;
            }
            window.location.href = "NgocYen_Checkout/checkout.html";
        } catch (error) {
            message("Không đọc được giỏ hàng. Vui lòng kiểm tra lại trước khi thanh toán.");
        }
    });
    document.getElementById("sample-cart").addEventListener("click", () => save(sample));
    window.addEventListener("storage", event => {
        if (event.key === cart.CART_KEY || event.key === null) reload();
    });
    window.addEventListener("pageshow", event => { if (event.persisted) reload(); });

    try {
        // Chỉ nạp mẫu lần đầu. Giỏ [] sau khi đặt hàng sẽ không tự có hàng trở lại.
        if (localStorage.getItem(cart.CART_KEY) === null) cart.write(sample);
    } catch (error) { /* reload bên dưới sẽ hiển thị lỗi lưu trữ. */ }
    reload();
})();
