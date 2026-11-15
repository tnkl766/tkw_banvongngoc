/* PHỤ LỤC 3 - HIỂN THỊ THÔNG TIN Ở TRANG XÁC NHẬN.
   Không có dữ liệu thì giữ nội dung mẫu HTML để xem thiết kế. */
var donHang = null;
try {
    donHang = JSON.parse(sessionStorage.getItem("ngocyen_order"));
} catch (loi) {
    donHang = null;
}

function hienChu(id, noiDung) {
    document.getElementById(id).textContent = noiDung;
}
function tien(soTien) {
    return soTien.toLocaleString("vi-VN") + " ₫";
}

if (donHang && typeof donHang.maDon === "string" && Number.isFinite(donHang.tongTien)) {
    hienChu("success-code", donHang.maDon);
    hienChu("success-name", donHang.hoTen);
    hienChu("success-phone", donHang.dienThoai);
    hienChu("success-address", donHang.diaChi);
    hienChu("success-subtotal", tien(donHang.tamTinh));
    hienChu("success-fee", donHang.phiShip === 0 ? "Miễn phí" : tien(donHang.phiShip));
    hienChu("success-discount", donHang.tienGiam > 0 ? "−" + tien(donHang.tienGiam) : "—");
    hienChu("success-total", tien(donHang.tongTien));

    if (donHang.vanChuyen === "express") {
        hienChu("success-shipping", "Giao nhanh · Dự kiến 1–2 ngày");
    }
    if (donHang.thanhToan === "bank") {
        hienChu("success-payment", "Chuyển khoản ngân hàng");
        hienChu("payment-status", "Chờ chuyển khoản");
    } else if (donHang.thanhToan === "card") {
        hienChu("success-payment", "Thẻ ngân hàng");
        hienChu("payment-status", "Chờ thanh toán");
    }
    // Không tự ghi "đã thanh toán": bài này chưa có cổng thanh toán thật.
    if (donHang.ghiChu) {
        document.getElementById("success-note-box").hidden = false;
        hienChu("success-note", donHang.ghiChu);
    }
    hienChu("demo-message", "Đơn hàng minh họa cho bài tập thiết kế web.");
}
