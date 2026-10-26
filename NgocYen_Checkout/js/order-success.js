/* Chỉ hiển thị đơn thực sự đã tạo trong phiên, không tự dựng đơn mẫu. */
(function () {
    "use strict";
    const cart = window.NgocYenCart;
    const text = (id, value) => { document.getElementById(id).textContent = value; };

    function render() {
        let order;
        let items;
        try {
            order = JSON.parse(sessionStorage.getItem(cart.ORDER_KEY));
            if (!order || typeof order.maDon !== "string" || !order.maDon.trim() ||
                !["hoTen", "dienThoai", "diaChi"].every(key => typeof order[key] === "string" && order[key].trim()) ||
                !["standard", "express"].includes(order.vanChuyen) || !["cod", "bank"].includes(order.thanhToan) ||
                !["", "NGOCYEN10"].includes(order.maGiamGia) ||
                !Number.isFinite(Date.parse(order.ngayDat))) throw new Error("Không có đơn hợp lệ.");
            items = cart.normalize(order.sanPham);
            const amounts = cart.totals(items, order.vanChuyen, order.maGiamGia);
            if (!items.length || order.tamTinh !== amounts.subtotal || order.phiShip !== amounts.shippingFee ||
                order.tienGiam !== amounts.discount || order.tongTien !== amounts.total) throw new Error("Số tiền không khớp.");
        } catch (error) {
            document.getElementById("empty-order").hidden = false;
            document.getElementById("order-confirmation").hidden = true;
            document.title = "Chưa có đơn hàng - Ngọc Yến";
            return;
        }

        text("success-code", order.maDon);
        text("success-date", "Thời gian tạo: " + new Date(order.ngayDat).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }));
        text("success-name", order.hoTen);
        text("success-phone", order.dienThoai);
        text("success-address", order.diaChi);
        text("success-subtotal", cart.money(order.tamTinh));
        text("success-fee", order.phiShip ? cart.money(order.phiShip) : "Miễn phí");
        text("success-discount", order.tienGiam ? "−" + cart.money(order.tienGiam) : "—");
        text("success-discount-label", order.maGiamGia ? "Giảm giá (" + order.maGiamGia + ")" : "Giảm giá");
        text("success-total", cart.money(order.tongTien));
        text("success-shipping", order.vanChuyen === "express" ? "Giao nhanh · Dự kiến 1–2 ngày" : "Giao tiêu chuẩn · Dự kiến 3–5 ngày");
        text("success-payment", order.thanhToan === "bank" ? "Chuyển khoản ngân hàng" : "Thanh toán khi nhận hàng (COD)");
        text("payment-status", order.thanhToan === "bank" ? "Chờ thanh toán · Chưa thực hiện chuyển khoản" : "Chưa thanh toán · Thanh toán khi nhận hàng");
        const email = typeof order.email === "string" ? order.email : "";
        const note = typeof order.ghiChu === "string" ? order.ghiChu : "";
        document.getElementById("success-email-box").hidden = !email;
        document.getElementById("success-note-box").hidden = !note;
        text("success-email", email);
        text("success-note", note);
        cart.renderProducts(document.getElementById("success-products"), items);
        document.getElementById("empty-order").hidden = true;
        document.getElementById("order-confirmation").hidden = false;
        document.title = "Đã tạo đơn minh họa - Ngọc Yến";
    }

    render();
    window.addEventListener("pageshow", event => { if (event.persisted) render(); });
})();
