/* PHỤ LỤC 3 - JAVASCRIPT BỔ SUNG.
   HTML/CSS đã tạo sẵn giao diện. File này thêm tính tiền và đặt hàng minh họa.
   Bài tập chạy ở trình duyệt, chưa kết nối máy chủ hoặc cổng thanh toán. */

// 1. Mảng là danh sách; mỗi cặp {} là một sản phẩm.
// Dữ liệu mẫu lấy từ cart.html được gửi kèm bài.
var gioHang = [
    { id: 1, name: "Vòng bản Ngọc hòa điền - Hoàng Khẩu Mật", description: "Size 56", price: 3200000, quantity: 1 },
    { id: 2, name: "Vòng tay ngọc lam băng", description: "Size 8 li", price: 1500000, quantity: 1 }
];
var maGiamGia = false;
var tamTinh = 0;
var phiShip = 0;
var tienGiam = 0;
var tongTien = 0;

// getItem đọc dữ liệu đã lưu. JSON.parse đổi chuỗi JSON thành mảng/đối tượng.
// try/catch giúp trang không hỏng nếu dữ liệu lỗi hoặc trình duyệt chặn lưu trữ.
try {
    var duLieu = localStorage.getItem("ngocyen_cart");
    if (duLieu !== null) {
        var danhSach = JSON.parse(duLieu);
        if (Array.isArray(danhSach)) {
            gioHang = [];
            for (var i = 0; i < danhSach.length; i++) {
                var sp = danhSach[i];
                if (sp && typeof sp.name === "string" && Number.isFinite(sp.price) && sp.price >= 0 && Number.isInteger(sp.quantity) && sp.quantity > 0) {
                    gioHang.push(sp); // push thêm sản phẩm vào cuối mảng.
                }
            }
        }
    }
} catch (loi) {
    // Giữ dữ liệu mẫu để vẫn xem được thiết kế nếu không đọc được bộ nhớ.
}

// 2. Đổi số 4700000 thành chuỗi dễ đọc: 4.700.000 ₫.
function dinhDangTien(soTien) {
    return soTien.toLocaleString("vi-VN") + " ₫";
}

// 3. Tạo một thẻ và thêm chữ vào thẻ.
// textContent chỉ thêm văn bản, không chạy nội dung như mã HTML.
function themChu(theCha, tenThe, noiDung) {
    var theMoi = document.createElement(tenThe);
    theMoi.textContent = noiDung;
    theCha.appendChild(theMoi);
}

function hienThiSanPham() {
    var khung = document.getElementById("order-products");
    khung.innerHTML = ""; // Xóa các dòng mẫu trước khi vẽ danh sách hiện tại.
    for (var i = 0; i < gioHang.length; i++) {
        var sp = gioHang[i];
        var dong = document.createElement("div");
        dong.className = "product";
        var anh = document.createElement("div");
        anh.className = "product-photo";
        anh.classList.add(sp.id === 1 ? "photo-amber" : "photo-jade");
        anh.setAttribute("aria-hidden", "true");
        var thongTin = document.createElement("div");
        themChu(thongTin, "h3", sp.name);
        themChu(thongTin, "p", sp.description || "Trang sức ngọc");
        themChu(thongTin, "p", "SL: " + sp.quantity);
        themChu(thongTin, "strong", dinhDangTien(sp.price * sp.quantity));
        dong.appendChild(anh);
        dong.appendChild(thongTin);
        khung.appendChild(dong);
    }
    if (gioHang.length === 0) {
        themChu(khung, "p", "Giỏ hàng đang trống. Vui lòng quay lại giỏ hàng.");
    }
    document.getElementById("place-order").disabled = gioHang.length === 0;
}

// 4. Tính tiền: tổng = tạm tính + vận chuyển - giảm giá.
function tinhTongTien() {
    tamTinh = 0;
    for (var i = 0; i < gioHang.length; i++) {
        tamTinh = tamTinh + gioHang[i].price * gioHang[i].quantity;
    }
    // Giữ quy tắc trong code giỏ hàng: đơn từ 2 triệu miễn giao tiêu chuẩn.
    var phiTieuChuan = tamTinh >= 2000000 ? 0 : 50000;
    var vanChuyen = document.querySelector('input[name="shipping"]:checked').value;
    phiShip = vanChuyen === "express" ? 80000 : phiTieuChuan;
    if (tamTinh === 0) phiShip = 0;
    tienGiam = maGiamGia ? Math.round(tamTinh * 0.1) : 0;
    tongTien = tamTinh + phiShip - tienGiam;

    document.getElementById("subtotal").textContent = dinhDangTien(tamTinh);
    document.getElementById("standard-fee").textContent = phiTieuChuan === 0 ? "Miễn phí" : dinhDangTien(phiTieuChuan);
    document.getElementById("shipping-fee").textContent = phiShip === 0 ? "Miễn phí" : dinhDangTien(phiShip);
    document.getElementById("discount").textContent = tienGiam > 0 ? "−" + dinhDangTien(tienGiam) : "—";
    document.getElementById("total").textContent = dinhDangTien(tongTien);
}

// 5. trim bỏ khoảng trắng hai đầu; toUpperCase đổi thành chữ in hoa.
function apDungMa() {
    var ma = document.getElementById("coupon").value.trim().toUpperCase();
    var thongBao = document.getElementById("coupon-message");
    maGiamGia = ma === "NGOCYEN10";
    thongBao.className = "message";
    if (maGiamGia) {
        thongBao.textContent = "Đã áp dụng mã giảm 10%.";
    } else if (ma === "") {
        thongBao.textContent = "Chưa áp dụng mã giảm giá.";
    } else {
        thongBao.textContent = "Mã chưa hợp lệ. Mã mẫu là NGOCYEN10.";
        thongBao.classList.add("error");
    }
    tinhTongTien();
}

// 6. Đặt hàng minh họa. preventDefault ngăn form tự tải trang ngay lập tức.
function datHang(suKien) {
    suKien.preventDefault();
    if (gioHang.length === 0) return;
    // required/type/pattern trong HTML đã kiểm tra các lỗi nhập cơ bản.
    var cacO = ["full-name", "city", "ward", "address"];
    for (var i = 0; i < cacO.length; i++) {
        var oNhap = document.getElementById(cacO[i]);
        if (oNhap.value.trim() === "") {
            oNhap.setCustomValidity("Vui lòng nhập thông tin, không chỉ nhập dấu cách.");
            oNhap.reportValidity();
            return;
        }
    }
    // Date.now lấy thời điểm hiện tại, dùng để tạo mã đơn minh họa.
    var donHang = {
        maDon: "NY" + Date.now(),
        hoTen: document.getElementById("full-name").value.trim(),
        dienThoai: document.getElementById("phone").value,
        diaChi: document.getElementById("address").value.trim() + ", " + document.getElementById("ward").value.trim() + ", " + document.getElementById("city").value.trim(),
        vanChuyen: document.querySelector('input[name="shipping"]:checked').value,
        thanhToan: document.querySelector('input[name="payment"]:checked').value,
        ghiChu: document.getElementById("note").value.trim(),
        sanPham: gioHang,
        tamTinh: tamTinh, phiShip: phiShip, tienGiam: tienGiam, tongTien: tongTien
    };
    try {
        // sessionStorage giữ dữ liệu trong phiên tab để trang xác nhận đọc lại.
        sessionStorage.setItem("ngocyen_order", JSON.stringify(donHang));
    } catch (loi) {
        var thongBao = document.getElementById("form-message");
        thongBao.className = "message error";
        thongBao.textContent = "Chưa lưu được đơn mẫu. Hãy mở bài bằng Live Server rồi thử lại.";
        return;
    }
    // Chỉ xóa giỏ sau khi đã lưu thành công đơn hàng.
    try { localStorage.setItem("ngocyen_cart", "[]"); } catch (loi) {}
    window.location.href = "order-success.html";
}

// 7. Gắn sự kiện: click là bấm nút, change là đổi lựa chọn, submit là gửi form.
document.getElementById("apply-coupon").addEventListener("click", apDungMa);
var cacLuaChon = document.querySelectorAll('input[name="shipping"]');
for (var i = 0; i < cacLuaChon.length; i++) {
    cacLuaChon[i].addEventListener("change", tinhTongTien);
}
document.getElementById("checkout-form").addEventListener("submit", datHang);
document.getElementById("checkout-form").addEventListener("input", function (suKien) {
    suKien.target.setCustomValidity(""); // Xóa lỗi cũ khi người dùng nhập lại.
});
document.getElementById("coupon").addEventListener("keydown", function (suKien) {
    if (suKien.key === "Enter") { suKien.preventDefault(); apDungMa(); }
});

// Chạy lần đầu khi mở trang.
hienThiSanPham();
tinhTongTien();
