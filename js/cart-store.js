/* Dùng chung dữ liệu và quy tắc tính tiền cho giỏ hàng, checkout, xác nhận. */
(function () {
    "use strict";

    const CART_KEY = "ngocyen_cart";
    const COUPON_KEY = "ngocyen_coupon";
    const ORDER_KEY = "ngocyen_order";
    const projectRoot = new URL("../../", document.currentScript.src);
    const money = amount => amount.toLocaleString("vi-VN") + " ₫";

    function normalize(items) {
        if (!Array.isArray(items)) throw new Error("Dữ liệu giỏ hàng không hợp lệ.");
        let subtotal = 0;
        return items.map(item => {
            if (!item || !["string", "number"].includes(typeof item.id) ||
                !String(item.id).trim() || typeof item.name !== "string" || !item.name.trim() ||
                !Number.isSafeInteger(item.price) || item.price < 0 ||
                !Number.isSafeInteger(item.quantity) || item.quantity < 1 ||
                !Number.isSafeInteger(item.price * item.quantity)) {
                throw new Error("Có sản phẩm không hợp lệ trong giỏ hàng.");
            }
            subtotal += item.price * item.quantity;
            if (!Number.isSafeInteger(subtotal) || subtotal > Number.MAX_SAFE_INTEGER - 80000) {
                throw new Error("Giá trị giỏ hàng quá lớn.");
            }
            return {
                id: item.id, name: item.name.trim(), price: item.price, quantity: item.quantity,
                description: typeof item.description === "string" ? item.description : "Trang sức ngọc",
                image: typeof item.image === "string" ? item.image : ""
            };
        });
    }

    function read() {
        const raw = localStorage.getItem(CART_KEY);
        return raw === null ? [] : normalize(JSON.parse(raw));
    }

    function write(items) {
        const cleanItems = normalize(items);
        localStorage.setItem(CART_KEY, JSON.stringify(cleanItems));
        return cleanItems;
    }

    function totals(items, shipping = "standard", coupon = "") {
        const subtotal = normalize(items).reduce((sum, item) => sum + item.price * item.quantity, 0);
        const standardFee = items.length && subtotal < 2000000 ? 50000 : 0;
        const shippingFee = items.length ? (shipping === "express" ? 80000 : standardFee) : 0;
        const discount = coupon === "NGOCYEN10" ? Math.round(subtotal * 0.1) : 0;
        const total = subtotal + shippingFee - discount;
        if (!Number.isSafeInteger(total)) throw new Error("Tổng thanh toán không hợp lệ.");
        return { subtotal, standardFee, shippingFee, discount, total };
    }

    function imageUrl(path) {
        // Chuyển đường dẫn ổ D: của bản cũ thành đường dẫn dùng được trên mọi máy.
        const clean = String(path || "").replace(/\\/g, "/");
        const marker = clean.indexOf("NgocYen_image/");
        const relative = marker >= 0 ? clean.slice(marker) : clean;
        try {
            const url = new URL(relative || "NgocYen_image/logo.jpg", projectRoot);
            if (!["http:", "https:", "file:"].includes(url.protocol) || url.origin !== projectRoot.origin) {
                throw new Error("Đường dẫn ảnh không hợp lệ.");
            }
            return url.href;
        } catch (error) {
            return new URL("NgocYen_image/logo.jpg", projectRoot).href;
        }
    }

    function renderProducts(container, items) {
        container.replaceChildren();
        items.forEach(item => {
            const row = document.createElement("div");
            row.className = "product";
            const image = document.createElement("img");
            image.className = "product-photo";
            image.src = imageUrl(item.image);
            image.alt = item.name;
            image.width = 68;
            image.height = 74;
            image.addEventListener("error", function () {
                this.src = imageUrl("");
            }, { once: true });
            const details = document.createElement("div");
            details.className = "product-info";
            [["h3", item.name], ["p", item.description], ["p", "Số lượng: " + item.quantity],
                ["strong", money(item.price * item.quantity)]].forEach(([tag, value]) => {
                const element = document.createElement(tag);
                element.textContent = value;
                details.appendChild(element);
            });
            row.append(image, details);
            container.appendChild(row);
        });
    }

    window.NgocYenCart = { CART_KEY, COUPON_KEY, ORDER_KEY, read, write, normalize, totals, money, imageUrl, renderProducts };
})();
