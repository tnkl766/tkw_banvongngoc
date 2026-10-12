
/* =========================================================
   NGỌC YẾN - SANPHAM.JS
   ========================================================= */


/* =========================================================
   1. DỮ LIỆU SẢN PHẨM
   ========================================================= */

const products = [
    /* VÒNG BẢN */
    { id: 1, name: "Vòng Bạch Ngọc 339", price: 4600000, category: "vong-ban", material: "hoa-dien", color: "white", image: "AnhSanPham/p1.jpg" },
    { id: 2, name: "Vòng Bạch Ngọc 343", price: 4200000, category: "vong-ban", material: "hoa-dien", color: "white", image: "AnhSanPham/p2.jpg" },
    { id: 3, name: "Vòng Bạch Ngọc 088", price: 5400000, category: "vong-ban", material: "hoa-dien", color: "white", image: "AnhSanPham/p3.png" },
    { id: 4, name: "Vòng Bạch Ngọc 097", price: 5400000, category: "vong-ban", material: "hoa-dien", color: "white", image: "AnhSanPham/p4.png" },
    { id: 5, name: "Vòng Bạch Ngọc 337", price: 5200000, category: "vong-ban", material: "hoa-dien", color: "green", image: "AnhSanPham/p5.png" },
    { id: 6, name: "Vòng Bạch Ngọc 034", price: 5500000, category: "vong-ban", material: "hoa-dien", color: "white", image: "AnhSanPham/p6.jpg" },
    { id: 7, name: "Vòng Bạch Ngọc 068", price: 4600000, category: "vong-ban", material: "hoa-dien", color: "white", image: "AnhSanPham/p7.jpg" },
    { id: 8, name: "Vòng Bạch Ngọc 070", price: 6000000, category: "vong-ban", material: "hoa-dien", color: "green", image: "AnhSanPham/p8.jpg" },
    { id: 9, name: "Vòng Bạch Ngọc Ánh Tím 013", price: 5800000, category: "vong-ban", material: "hoa-dien", color: "purple", image: "AnhSanPham/p9.jpg" },
    { id: 10, name: "Vòng Bạch Ngọc 017", price: 4300000, category: "vong-ban", material: "hoa-dien", color: "green", image: "AnhSanPham/p10.jpg" },
    { id: 11, name: "Vòng Bạch Ngọc 102", price: 6500000, category: "vong-ban", material: "hoa-dien", color: "green", image: "AnhSanPham/p11.png" },
    { id: 12, name: "Vòng Bạch Ngọc 367", price: 6500000, category: "vong-ban", material: "hoa-dien", color: "green", image: "AnhSanPham/p12.jpg" },
    { id: 13, name: "Vòng Bạch Ngọc 044", price: 6500000, category: "vong-ban", material: "hoa-dien", color: "green", image: "AnhSanPham/p13.jpg" },
    { id: 14, name: "Vòng Bạch Ngọc Sơn Thủy 002", price: 6500000, category: "vong-ban", material: "hoa-dien", color: "green", image: "AnhSanPham/p14.jpg" },
    { id: 15, name: "Vòng Bạch Ngọc 006", price: 6500000, category: "vong-ban", material: "hoa-dien", color: "white", image: "AnhSanPham/p15.jpg" },

    /* VÒNG HẠT */
    { id: 50, name: "Chuỗi Ngọc Đeo Tay 003", price: 1500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p50.jpg" },
    { id: 51, name: "Chuỗi Ngọc Đeo Tay 004", price: 1500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p51.jpg" },
    { id: 52, name: "Chuỗi Ngọc Đeo Tay 006", price: 1500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p52.jpg" },
    { id: 53, name: "Chuỗi Ngọc Đeo Tay 008", price: 1500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p53.jpg" },
    { id: 54, name: "Chuỗi Ngọc Đeo Tay 009", price: 1500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p54.jpg" },
    { id: 55, name: "Chuỗi Ngọc Đeo Tay 010", price: 1500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p55.jpg" },
    { id: 56, name: "Chuỗi Ngọc Đeo Tay 013", price: 1500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p56.jpg" },
    { id: 57, name: "Chuỗi Ngọc Đeo Tay 017", price: 1500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p57.jpg" },
    { id: 58, name: "Chuỗi Ngọc Đeo Tay 001", price: 1750000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p58.jpg" },
    { id: 59, name: "Chuỗi Ngọc Đeo Tay 015", price: 1900000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p59.jpg" },
    { id: 60, name: "Chuỗi Ngọc Đeo Tay 016", price: 1500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p60.jpg" },
    { id: 61, name: "Chuỗi Ngọc Đeo Tay 014", price: 4500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p61.jpg" },
    { id: 62, name: "Chuỗi Ngọc Đeo Tay 018", price: 3500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p62.jpg" },
    { id: 63, name: "Chuỗi Ngọc Đeo Tay Quấn 3 Vòng 019", price: 3500000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p63.jpg" },
    { id: 64, name: "Chuỗi Ngọc Đeo Tay 007", price: 5400000, category: "vong-hat", material: "thach-anh", color: "green", image: "AnhSanPham/p64.jpg" },
    { id: 65, name: "Chuỗi Hổ Phách Đeo Tay 011", price: 5400000, category: "vong-hat", material: "ma-nao", color: "yellow", image: "AnhSanPham/p65.jpg" },

    /* NHẪN */
    { id: 100, name: "Nhẫn Ngọc Tài Lộc 005", price: 1500000, category: "nhan", material: "cam-thach", color: "white", image: "AnhSanPham/p100.jpg" },
    { id: 101, name: "Nhẫn Bạch Ngọc 007", price: 1500000, category: "nhan", material: "hoa-dien", color: "white", image: "AnhSanPham/p101.jpg" },
    { id: 102, name: "Nhẫn Ngọc Huyết 009", price: 1200000, category: "nhan", material: "cam-thach", color: "red", image: "AnhSanPham/p102.jpg" },
    { id: 103, name: "Nhẫn Ngọc Sơn Thủy 006", price: 1500000, category: "nhan", material: "cam-thach", color: "green", image: "AnhSanPham/p103.jpg" },
    { id: 104, name: "Nhẫn Ngọc Phỉ Thúy 008", price: 3500000, category: "nhan", material: "cam-thach", color: "green", image: "AnhSanPham/p104.jpg" },
    { id: 105, name: "Nhẫn Ngọc Sơn Thủy 001", price: 3500000, category: "nhan", material: "cam-thach", color: "green", image: "AnhSanPham/p105.jpg" },
    { id: 106, name: "Nhẫn Ngọc Tài Lộc 002", price: 1500000, category: "nhan", material: "cam-thach", color: "green", image: "AnhSanPham/p106.jpg" }
];


/* =========================================================
   2. BIẾN TOÀN CỤC
   ========================================================= */

let filteredProducts = [...products];
let currentPage = 1;
const itemsPerPage = 20;

let selectedColors = [];
let selectedCategories = [];
let selectedMaterials = [];

let minPrice = 0;
let maxPrice = 100000000;

// Từ khóa được chọn trong mega menu
let activeMenuKeyword = "";


/* =========================================================
   3. TIỆN ÍCH
   ========================================================= */

function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .trim();
}


/* =========================================================
   4. HIỂN THỊ SẢN PHẨM
   ========================================================= */

function renderProducts() {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const pageProducts = filteredProducts.slice(start, start + itemsPerPage);

    if (pageProducts.length === 0) {
        productList.innerHTML = `
            <div class="no-product">
                <p>Không tìm thấy sản phẩm phù hợp.</p>
            </div>
        `;
        updateProductCount();
        renderPagination();
        return;
    }

    pageProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const isFavorite = getFavorites().includes(product.id);

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80'"
                >

                <button
                    type="button"
                    class="favorite-btn ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${product.id}, this)"
                    aria-label="Yêu thích"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>
            </div>

            <div class="product-card-info">
                <span class="product-category">
                    ${getCategoryName(product.category)}
                </span>

                <h3>${product.name}</h3>
                <p>${formatPrice(product.price)}</p>
            </div>
        `;

        productList.appendChild(card);
    });

    updateProductCount();
    renderPagination();
}


/* =========================================================
   5. TÊN DÒNG SẢN PHẨM
   ========================================================= */

function getCategoryName(category) {
    const categoryNames = {
        "vong-ban": "Vòng bản",
        "vong-hat": "Vòng hạt",
        "nhan": "Nhẫn"
    };

    return categoryNames[category] || category;
}


/* =========================================================
   6. CẬP NHẬT SỐ LƯỢNG SẢN PHẨM
   ========================================================= */

function updateProductCount() {
    const range = document.getElementById("product-range");
    const total = document.getElementById("total-products");

    if (!range || !total) return;

    const totalProducts = filteredProducts.length;
    total.textContent = totalProducts;

    if (totalProducts === 0) {
        range.textContent = "0";
        return;
    }

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalProducts);

    range.textContent = `${start} - ${end}`;
}


/* =========================================================
   7. PHÂN TRANG
   ========================================================= */

function renderPagination() {
    const oldPagination = document.querySelector(".pagination");
    if (oldPagination) oldPagination.remove();

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (totalPages <= 1) return;

    const pagination = document.createElement("div");
    pagination.className = "pagination";

    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.textContent = "‹";
    previousButton.disabled = currentPage === 1;

    previousButton.onclick = function () {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            scrollToProducts();
        }
    };

    pagination.appendChild(previousButton);

    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = page;

        if (page === currentPage) {
            button.classList.add("active");
        }

        button.onclick = function () {
            currentPage = page;
            renderProducts();
            scrollToProducts();
        };

        pagination.appendChild(button);
    }

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "›";
    nextButton.disabled = currentPage === totalPages;

    nextButton.onclick = function () {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
            scrollToProducts();
        }
    };

    pagination.appendChild(nextButton);

    const productArea = document.querySelector(".product-area");
    if (productArea) productArea.appendChild(pagination);
}


/* =========================================================
   8. LỌC SẢN PHẨM
   ========================================================= */

function applyFilters() {
    filteredProducts = products.filter(product => {
        const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        const colorMatch =
            selectedColors.length === 0 ||
            selectedColors.includes(product.color);

        const materialMatch =
            selectedMaterials.length === 0 ||
            selectedMaterials.includes(product.material);

        const priceMatch =
            product.price >= minPrice &&
            product.price <= maxPrice;

        const keywordMatch =
            !activeMenuKeyword ||
            normalizeText(product.name).includes(
                normalizeText(activeMenuKeyword)
            );

        return (
            categoryMatch &&
            colorMatch &&
            materialMatch &&
            priceMatch &&
            keywordMatch
        );
    });

    currentPage = 1;
    sortFilteredProducts();
}


/* =========================================================
   9. SẮP XẾP DANH SÁCH ĐANG LỌC
   ========================================================= */

function sortFilteredProducts() {
    const select = document.getElementById("sort-products");
    const sortType = select ? select.value : "newest";

    switch (sortType) {
        case "price-low":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;

        case "price-high":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;

        case "name":
            filteredProducts.sort((a, b) =>
                a.name.localeCompare(b.name, "vi")
            );
            break;

        case "newest":
        default:
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
    }

    renderProducts();
}


/* =========================================================
   10. LỌC DANH MỤC TRONG SIDEBAR
   ========================================================= */

function setupCategoryFilters() {
    const filters = document.querySelectorAll(".category-filter");

    filters.forEach(filter => {
        filter.addEventListener("change", function () {
            activeMenuKeyword = "";

            if (this.value === "all") {
                if (this.checked) {
                    selectedCategories = [];

                    filters.forEach(item => {
                        if (item.value !== "all") {
                            item.checked = false;
                        }
                    });
                }
            } else {
                const allFilter = document.querySelector(
                    '.category-filter[value="all"]'
                );

                if (this.checked) {
                    if (!selectedCategories.includes(this.value)) {
                        selectedCategories.push(this.value);
                    }

                    if (allFilter) allFilter.checked = false;
                } else {
                    selectedCategories = selectedCategories.filter(
                        value => value !== this.value
                    );

                    if (selectedCategories.length === 0 && allFilter) {
                        allFilter.checked = true;
                    }
                }
            }

            applyFilters();
        });
    });
}


/* =========================================================
   11. LỌC MÀU
   ========================================================= */

function setupColorFilters() {
    document.querySelectorAll(".color").forEach(color => {
        color.addEventListener("click", function () {
            activeMenuKeyword = "";

            const value = this.dataset.color;

            if (selectedColors.includes(value)) {
                selectedColors = selectedColors.filter(
                    colorValue => colorValue !== value
                );

                this.classList.remove("active");
            } else {
                selectedColors.push(value);
                this.classList.add("active");
            }

            applyFilters();
        });
    });
}


/* =========================================================
   12. LỌC CHẤT LIỆU
   ========================================================= */

function setupMaterialFilters() {
    document.querySelectorAll(".material-filter").forEach(filter => {
        filter.addEventListener("change", function () {
            activeMenuKeyword = "";

            if (this.checked) {
                if (!selectedMaterials.includes(this.value)) {
                    selectedMaterials.push(this.value);
                }
            } else {
                selectedMaterials = selectedMaterials.filter(
                    value => value !== this.value
                );
            }

            applyFilters();
        });
    });
}


/* =========================================================
   13. LỌC GIÁ - MỘT THANH TRƯỢT
   ========================================================= */

function setupPriceFilters() {
    const maxRange = document.getElementById("max-price");
    const maxValue = document.getElementById("max-price-value");

    if (!maxRange) return;

    maxRange.min = 0;
    maxRange.max = 100000000;
    maxRange.step = 500000;
    maxRange.value = 100000000;

    function updatePrice() {
        activeMenuKeyword = "";
        minPrice = 0;
        maxPrice = Number(maxRange.value);

        if (maxValue) {
            maxValue.textContent = formatPrice(maxPrice);
        }

        applyFilters();
    }

    maxRange.addEventListener("input", updatePrice);

    // Cập nhật mức giá mặc định mà không cần chờ thao tác
    minPrice = 0;
    maxPrice = 100000000;

    if (maxValue) {
        maxValue.textContent = formatPrice(maxPrice);
    }
}


/* =========================================================
   14. SẮP XẾP
   ========================================================= */

function sortProducts() {
    sortFilteredProducts();
}


/* =========================================================
   15. ĐẶT LẠI BỘ LỌC
   ========================================================= */

function resetFilters() {
    selectedColors = [];
    selectedCategories = [];
    selectedMaterials = [];
    activeMenuKeyword = "";

    minPrice = 0;
    maxPrice = 100000000;

    document.querySelectorAll(".category-filter").forEach(input => {
        input.checked = input.value === "all";
    });

    document.querySelectorAll(".material-filter").forEach(input => {
        input.checked = false;
    });

    document.querySelectorAll(".color").forEach(color => {
        color.classList.remove("active");
    });

    const maxRange = document.getElementById("max-price");
    const maxValue = document.getElementById("max-price-value");

    if (maxRange) {
        maxRange.max = 100000000;
        maxRange.value = 100000000;
    }

    if (maxValue) {
        maxValue.textContent = formatPrice(100000000);
    }

    // Tương thích nếu HTML cũ còn thanh giá tối thiểu
    const minRange = document.getElementById("min-price");
    const minValue = document.getElementById("min-price-value");

    if (minRange) minRange.value = 0;
    if (minValue) minValue.textContent = "0";

    const sortSelect = document.getElementById("sort-products");
    if (sortSelect) sortSelect.value = "newest";

    filteredProducts = [...products];
    currentPage = 1;

    sortFilteredProducts();
}


/* =========================================================
   16. LỌC TỪ MEGA MENU
   ========================================================= */


function filterByName(keyword) {
    const normalizeText = (text) => {
        return String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .trim();
    };

    const key = normalizeText(keyword);

    // Xác định nhóm sản phẩm theo tên danh mục được bấm
    let category = "";

    if (key.startsWith("nhan")) {
        category = "nhan";
    } else if (key.startsWith("vong hat")) {
        category = "vong-hat";
    } else if (key.startsWith("vong")) {
        category = "vong-ban";
    }

    // Xóa các bộ lọc đang chọn
    selectedColors = [];
    selectedCategories = [];
    selectedMaterials = [];
    activeMenuKeyword = "";

    // Bỏ trạng thái chọn ở các bộ lọc
    document.querySelectorAll(".category-filter").forEach(input => {
        input.checked = input.value === "all";
    });

    document.querySelectorAll(".material-filter").forEach(input => {
        input.checked = false;
    });

    document.querySelectorAll(".color").forEach(button => {
        button.classList.remove("active");
    });

    // Đặt lại thanh giá
    minPrice = 0;
    maxPrice = 100000000;

    const maxRange = document.getElementById("max-price");
    const maxValue = document.getElementById("max-price-value");

    if (maxRange) {
        maxRange.max = 100000000;
        maxRange.value = 100000000;
    }

    if (maxValue) {
        maxValue.textContent = formatPrice(100000000);
    }

    // Lọc theo nhóm sản phẩm và từ khóa
    filteredProducts = products.filter(product => {
        const sameCategory = !category || product.category === category;
        const sameName = normalizeText(product.name).includes(key);

        return sameCategory && sameName;
    });

    // Cập nhật bộ lọc danh mục trên giao diện
    if (category) {
        const allFilter = document.querySelector(
            '.category-filter[value="all"]'
        );

        if (allFilter) allFilter.checked = false;

        const categoryFilter = document.querySelector(
            `.category-filter[value="${category}"]`
        );

        if (categoryFilter) categoryFilter.checked = true;

        selectedCategories = [category];
    }

    currentPage = 1;
    sortFilteredProducts();
    scrollToProducts();
}


/* =========================================================
   17. YÊU THÍCH
   ========================================================= */

function getFavorites() {
    try {
        return JSON.parse(
            localStorage.getItem("ngocYenFavorites")
        ) || [];
    } catch (error) {
        return [];
    }
}

function saveFavorites(favorites) {
    localStorage.setItem(
        "ngocYenFavorites",
        JSON.stringify(favorites)
    );
}

function toggleFavorite(productId, button) {
    let favorites = getFavorites();

    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
        button.classList.remove("active");
        button.textContent = "♡";
    } else {
        favorites.push(productId);
        button.classList.add("active");
        button.textContent = "♥";
    }

    saveFavorites(favorites);
}


/* =========================================================
   18. BỘ LỌC TRÊN MOBILE
   ========================================================= */

function toggleFilterPopup() {
    const filterSidebar = document.getElementById("filter-sidebar");
    const filterButton = document.querySelector(
        ".mobile-filter-button button"
    );

    if (!filterSidebar) return;

    filterSidebar.classList.toggle("show");

    if (filterButton) {
        filterButton.classList.toggle("active");
    }
}

function handleResize() {
    const filterSidebar = document.getElementById("filter-sidebar");
    if (!filterSidebar) return;

    if (window.innerWidth > 768) {
        filterSidebar.classList.remove("show");
    }
}


/* =========================================================
   19. CUỘN ĐẾN KHU VỰC SẢN PHẨM
   ========================================================= */

function scrollToProducts() {
    const productArea = document.querySelector(".product-area");
    if (!productArea) return;

    const top =
        productArea.getBoundingClientRect().top +
        window.scrollY -
        30;

    window.scrollTo({
        top,
        behavior: "smooth"
    });
}


/* =========================================================
   20. KHỞI TẠO
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    setupCategoryFilters();
    setupColorFilters();
    setupMaterialFilters();
    setupPriceFilters();

    sortFilteredProducts();

    window.addEventListener("resize", handleResize);
});
