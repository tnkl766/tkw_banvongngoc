/* Checkout chạy ở trình duyệt, chưa kết nối máy chủ hoặc cổng thanh toán. */
(function () {
    "use strict";

    const cart = window.NgocYenCart;
    const form = document.getElementById("checkout-form");
    const button = document.getElementById("place-order");
    const couponInput = document.getElementById("coupon");
    let items = [];
    let coupon = "";
    let submitting = false;

    function message(text) {
        const element = document.getElementById("form-message");
        element.className = "message error";
        element.textContent = text;
    }

    function recalculate() {
        const shipping = form.querySelector('input[name="shipping"]:checked');
        const amounts = cart.totals(items, shipping ? shipping.value : "standard", coupon);
        document.getElementById("subtotal").textContent = cart.money(amounts.subtotal);
        document.getElementById("standard-fee").textContent = amounts.standardFee ? cart.money(amounts.standardFee) : "Miễn phí";
        document.getElementById("shipping-fee").textContent = amounts.shippingFee ? cart.money(amounts.shippingFee) : "Miễn phí";
        document.getElementById("discount").textContent = amounts.discount ? "−" + cart.money(amounts.discount) : "—";
        document.getElementById("total").textContent = cart.money(amounts.total);
        return amounts;
    }

    function refreshCart() {
        let error = "";
        try {
            items = cart.read();
        } catch (failure) {
            items = [];
            error = "Không đọc được giỏ hàng. Hãy quay lại giỏ hàng để kiểm tra, hoặc mở bài bằng Live Server.";
        }
        cart.renderProducts(document.getElementById("order-products"), items);
        if (!items.length) {
            const empty = document.createElement("p");
            empty.className = "empty-state";
            empty.textContent = "Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.";
            document.getElementById("order-products").appendChild(empty);
        }
        button.disabled = submitting || !items.length;
        document.getElementById("apply-coupon").disabled = !items.length;
        message(error);
        recalculate();
    }

    function applyCoupon() {
        if (!items.length) return;
        const code = couponInput.value.trim().toUpperCase();
        const feedback = document.getElementById("coupon-message");
        coupon = code === "NGOCYEN10" ? code : "";
        feedback.className = "message" + (code && !coupon ? " error" : "");
        feedback.textContent = coupon ? "Đã áp dụng mã giảm 10% tiền hàng." :
            (code ? "Mã giảm giá không hợp lệ." : "Đã bỏ mã giảm giá.");
        couponInput.value = code;
        try { sessionStorage.setItem(cart.COUPON_KEY, coupon); } catch (error) { /* Vẫn tính đúng trong lần xem này. */ }
        recalculate();
    }

    function validateForm() {
        ["full-name", "city", "ward", "address", "email", "phone"].forEach(id => {
            const field = document.getElementById(id);
            field.setCustomValidity("");
            field.value = field.value.trim();
            if (field.required && !field.value) field.setCustomValidity("Vui lòng điền thông tin này.");
        });
        const name = document.getElementById("full-name");
        if (name.value && name.value.length < 2) name.setCustomValidity("Vui lòng nhập họ tên ít nhất 2 ký tự.");
        const phone = document.getElementById("phone");
        const normalizedPhone = phone.value.replace(/[\s().-]/g, "").replace(/^(\+84|84)/, "0");
        if (!/^0[0-9]{9}$/.test(normalizedPhone)) {
            phone.setCustomValidity("Nhập 10 chữ số bắt đầu bằng 0, hoặc số điện thoại có mã +84.");
        } else {
            phone.value = normalizedPhone;
        }
        return form.reportValidity();
    }

    function placeOrder(event) {
        event.preventDefault();
        if (submitting || !items.length || !validateForm()) return;
        let currentItems;
        try {
            currentItems = cart.read();
        } catch (error) {
            message("Không đọc được giỏ hàng. Đơn hàng chưa được tạo.");
            return;
        }
        // Kiểm tra lại giỏ, tránh đặt theo số tiền cũ sau khi sửa ở tab khác.
        if (JSON.stringify(currentItems) !== JSON.stringify(items)) {
            refreshCart();
            message("Giỏ hàng vừa thay đổi. Vui lòng kiểm tra lại số tiền rồi đặt hàng.");
            return;
        }
        const payment = form.querySelector('input[name="payment"]:checked');
        const shipping = form.querySelector('input[name="shipping"]:checked');
        if (!payment || !["cod", "bank"].includes(payment.value) || !shipping || !["standard", "express"].includes(shipping.value)) {
            message("Vui lòng chọn phương thức vận chuyển và thanh toán được hỗ trợ.");
            return;
        }
        const amounts = recalculate();
        const value = id => document.getElementById(id).value.trim();
        const order = {
            maDon: "NY" + Date.now() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
            ngayDat: new Date().toISOString(), hoTen: value("full-name"),
            dienThoai: value("phone"), email: value("email"),
            diaChi: [value("address"), value("ward"), value("city")].join(", "),
            vanChuyen: shipping.value, thanhToan: payment.value, ghiChu: value("note"),
            sanPham: currentItems, maGiamGia: coupon,
            tamTinh: amounts.subtotal, phiShip: amounts.shippingFee,
            tienGiam: amounts.discount, tongTien: amounts.total
        };
        submitting = true;
        button.disabled = true;
        button.textContent = "Đang tạo đơn…";
        let previousOrder = null;
        let orderSaved = false;
        try {
            previousOrder = sessionStorage.getItem(cart.ORDER_KEY);
            sessionStorage.setItem(cart.ORDER_KEY, JSON.stringify(order));
            orderSaved = true;
            cart.write([]);
        } catch (error) {
            // Nếu chưa xóa được giỏ thì hủy bản lưu đơn mới để có thể thử lại.
            if (orderSaved) {
                try {
                    if (previousOrder === null) sessionStorage.removeItem(cart.ORDER_KEY);
                    else sessionStorage.setItem(cart.ORDER_KEY, previousOrder);
                } catch (rollbackError) { /* Trình duyệt đang chặn lưu trữ. */ }
            }
            submitting = false;
            button.disabled = false;
            button.textContent = "Đặt hàng →";
            message("Chưa lưu được đơn hàng. Giỏ hàng được giữ lại; hãy cho phép lưu trữ hoặc mở bài bằng Live Server rồi thử lại.");
            return;
        }
        try { sessionStorage.removeItem(cart.COUPON_KEY); } catch (error) { /* Đơn đã được lưu. */ }
        window.location.href = "order-success.html";
    }

    document.getElementById("apply-coupon").addEventListener("click", applyCoupon);
    couponInput.addEventListener("keydown", event => {
        if (event.key === "Enter") { event.preventDefault(); applyCoupon(); }
    });
    form.addEventListener("submit", placeOrder);
    form.addEventListener("input", event => {
        if (typeof event.target.setCustomValidity === "function") event.target.setCustomValidity("");
    });
    form.querySelectorAll('input[name="shipping"]').forEach(input => input.addEventListener("change", recalculate));
    form.querySelectorAll('input[name="payment"]').forEach(input => input.addEventListener("change", () => {
        document.getElementById("payment-help").textContent = input.value === "bank" ?
            "Lựa chọn này chỉ minh họa trạng thái chờ thanh toán; chưa thực hiện chuyển khoản." :
            "Thanh toán khi nhận hàng; chưa thu tiền khi đặt đơn.";
    }));
    window.addEventListener("storage", event => {
        if (event.key === cart.CART_KEY || event.key === null) {
            refreshCart();
            message("Giỏ hàng đã được cập nhật. Vui lòng kiểm tra lại trước khi đặt hàng.");
        }
    });
    window.addEventListener("pageshow", event => {
        if (event.persisted) {
            submitting = false;
            button.textContent = "Đặt hàng →";
            refreshCart();
        }
    });
    try {
        coupon = sessionStorage.getItem(cart.COUPON_KEY) === "NGOCYEN10" ? "NGOCYEN10" : "";
    } catch (error) { /* Không bắt buộc khôi phục mã giảm giá. */ }
    refreshCart();
    if (coupon) { couponInput.value = coupon; applyCoupon(); }
})();
