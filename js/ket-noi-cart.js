/* PHỤ LỤC 3 - ĐOẠN NỐI VỚI CART.HTML CỦA THÀNH VIÊN TRƯỚC.
   Thêm <script src="js/ket-noi-cart.js"></script> vào cuối cart.html,
   SAU script cũ và TRƯỚC </body>. Không thêm file này vào checkout.html.
   cartItems và renderCart là hai tên có sẵn trong code giỏ hàng đã gửi. */

// Nếu từng lưu giỏ, đọc lại để không tự phục hồi hàng đã đặt.
try {
    var gioDaLuu = JSON.parse(localStorage.getItem("ngocyen_cart"));
    if (Array.isArray(gioDaLuu)) {
        cartItems = gioDaLuu;
        renderCart();
    }
} catch (loi) {
    // Nếu chưa có dữ liệu thì giữ hai sản phẩm mẫu của code cũ.
}

// Chọn đúng nút cũ đang gọi openCheckoutModal().
var nutThanhToan = document.querySelector('button[onclick="openCheckoutModal()"]');
if (nutThanhToan) {
    // Bỏ cách mở thông báo cũ, thay bằng lưu giỏ và sang checkout.html.
    nutThanhToan.removeAttribute("onclick");
    nutThanhToan.addEventListener("click", function () {
        if (cartItems.length === 0) {
            alert("Giỏ hàng đang trống.");
            return;
        }
        try {
            localStorage.setItem("ngocyen_cart", JSON.stringify(cartItems));
            window.location.href = "checkout.html";
        } catch (loi) {
            alert("Chưa lưu được giỏ hàng. Hãy mở bài bằng Live Server rồi thử lại.");
        }
    });
}
