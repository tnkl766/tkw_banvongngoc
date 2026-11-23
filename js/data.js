/* ==========================================================================
   JADE - NATURAL GEMSTONE JEWELRY
   CENTRAL DATASET (IMAGES, PRODUCTS, CATEGORIES, COLLECTIONS, REVIEWS)
   TẤT CẢ HÌNH ẢNH TOÀN BỘ WEBSITE ĐƯỢC QUẢN LÝ TẬP TRUNG TẠI FILE NÀY
   ========================================================================== */

const JADE_DATA = {
  /* ========================================================================
     BẢNG QUẢN LÝ HÌNH ẢNH TOÀN BỘ WEBSITE (DỄ DÀNG TÌM & THAY THẾ TẠI ĐÂY)
     ======================================================================== */
  images: {
    // Logo thương hiệu
    logo: 'assets/images/logo.png',

    // 1. BANNER SLIDER ĐẦU TRANG CHỦ (Tự động lướt mỗi 2.5s)
    heroSlides: [
  {
    image: "assets/images/Index/bn1.jpg",
    alt: "Người mẫu diện trang sức ngọc JADE",
    title: "Chạm Ngọc",
    subtitle: "Chạm vào những rung cảm thanh tao của đất trời.",
    buttonText: "MUA NGAY",
    buttonLink: "pages/products.html"
  },
  {
    image: "assets/images/Index/banner2.jpg",
    alt: "Bộ sưu tập ngọc phỉ thuý Emerald Elegance",
    title: "Thanh Tao",
    subtitle: "Lưu giữ nét kiêu kỳ và vượng khí trường tồn.",
    buttonText: "KHÁM PHÁ NGAY",
    buttonLink: "pages/collections.html"
  },
  {
    image: "assets/images/Index/banner3.jpg",
    objectPosition: "center 60%",
    alt: "Tạo tác ngọc tự nhiên nghệ thuật",
    title: "Duyên Khởi",
    subtitle: "Vẻ đẹp thuần khiết, bảo bọc bình an trường cửu.",
    buttonText: "BỘ SƯU TẬP",
    buttonLink: "pages/collection-detail.html?col=timeless-jade"
  }
],

    // 2. ẢNH CÂU CHUYỆN THƯƠNG HIỆU Ở TRANG CHỦ (Brand Story Strip)
    brandStory: "assets/images/thuonghieu.jpg",
    brandStoryAlt: "Câu chuyện thương hiệu",

    // 3. ẢNH BANNER ĐẦU TRANG DANH MỤC SẢN PHẨM & BỘ SƯU TẬP
    productsHero: "assets/images/product/pb.jpg",
    productsHeroAlt: "banner products",
    collectionsHero: "assets/images/product/pb.jpg",
    collectionsHeroAlt: "banner collections",

    // 4. ẢNH 3 BƯỚC HÀNH TRÌNH CHẾ TÁC Ở TRANG GIỚI THIỆU (About Page Journey)
    aboutJourney: [
      "assets/images/story/p1.jpg", // Bước 1: Khai thác ngọc
      "assets/images/story/p2.jpg", // Bước 2: Nghệ nhân chế tác
      "assets/images/story/p3.jpg"  // Bước 3: Tôn vinh vẻ đẹp
    ],

    // 5. CÁC ẢNH BANNER CỤC BỘ DỰ PHÒNG (Nằm trong thư mục assets/images/Index/)
    localBanners: {
      slide1: 'assets/images/Index/i11.jpg',
      slide2: 'assets/images/Index/i2.jpg',
      slide3: 'assets/images/Index/i3.jpg'
    }
  },

  categories: [
    {
      id: "vong-ban",
      name: "Vòng Bản",
      slug: "vong-ban",
      desc: "Tuyệt tác vòng ngọc bản tròn, bản hẹ Jadeite thiên nhiên tuyển chọn, thấu quang và ngậm sắc ngọc lục bảo thanh tao.",
      image: "assets/images/itm12.jpg",
      itemCount: 10
    },
    {
      id: "vong-hat",
      name: "Vòng Hạt",
      slug: "vong-hat",
      desc: "Chuỗi vòng ngọc hạt tròn, chuỗi 108 hạt Bạch Ngọc Hoà Điền, Ngọc Bích thuần khiết mang năng lượng bình an trường cửu.",
      image: "assets/images/itm8.jpg",
      itemCount: 4
    },
    {
      id: "nhan-ngoc",
      name: "Nhẫn Ngọc",
      slug: "nhan-ngoc",
      desc: "Nhẫn đính ngọc Jadeite mài cabochon giác tròn kết hợp vàng hồng 18K và kim cương thiên nhiên tinh xảo.",
      image: "assets/images/itm10.jpg",
      itemCount: 7
    },
    {
      id: "day-chuyen",
      name: "Dây Chuyền Ngọc",
      slug: "day-chuyen",
      desc: "Mặt dây chuyền ngọc tự nhiên chạm khắc Như Ý, Hồ Lô và giọt ngọc lục đế vương thanh lịch.",
      image: "assets/images/itm9.jpg",
      itemCount: 7
    },
    {
      id: "bong-tai",
      name: "Bông Tai Ngọc",
      slug: "bong-tai",
      desc: "Điểm xuyết vẻ đẹp quý phái cho gương mặt với hoa tai ngọc phỉ thúy dáng giọt nước đung đưa kiêu kỳ.",
      image: "assets/images/itm(8).jpg",
      itemCount: 5
    },
    {
      id: "trang-suc-da-quy",
      name: "Trang Sức Đá Quý",
      slug: "trang-suc-da-quy",
      desc: "Sự kết hợp hoàn mỹ giữa ngọc quý, ngọc trai biển Nam và các dòng đá quý năng lượng cao cấp.",
      image: "assets/images/itm7.jpg",
      itemCount: 3
    }
  ],

  collections: [
    {
      id: "timeless-jade",
      name: "Timeless Jade",
      tagline: "Vẻ Đẹp Vĩnh Cửu",
      desc: "Tôn vinh sắc xanh nguyên bản trường tồn của ngọc cẩm thạch Myanmar loại A cao cấp nhất, kết hợp giác cắt đương đại.",
      image: "assets/images/collection/cl1.jpg",
      bannerImage: "assets/images/collection/cl1-1.jpg",
      story: "Lấy cảm hứng từ những bậc vương giả xưa cùng nét đẹp thanh tao bất biến của phụ nữ Á Đông. Bộ sưu tập Timeless Jade là tuyên ngôn của giá trị trường cửu."
    },
    {
      id: "emerald-elegance",
      name: "Emerald Elegance",
      tagline: "Xanh Lục Bảo Kiêu Kỳ",
      desc: "Những tuyệt tác ngọc phỉ thuý mang sắc xanh lý thấu quang, bọc vàng 18K và đính kết đá quý rực rỡ.",
      image: "assets/images/collection/cl2.jpg",
      bannerImage: "assets/images/collection/cl2-2.jpg",
      story: "Màu xanh ngọc lục bảo không chỉ đại diện cho sự sang trọng vương giả mà còn tượng trưng cho sức sống dồi dào, thu hút tài lộc và thanh lọc tâm trí."
    },
    {
      id: "natural-harmony",
      name: "Natural Harmony",
      tagline: "Giao Hoà Bản Thể Thiên Nhiên",
      desc: "Đường nét uốn lượn hữu cơ lấy cảm hứng từ dòng chảy suối nguồn ngọc bích và sự mộc mạc nguyên sơ.",
      image:"assets/images/collection/cl3.jpg",
      bannerImage: "assets/images/collection/cl3-3.jpg",
      story: "Thiên nhiên là nghệ sĩ vĩ đại nhất. Mỗi phiến ngọc trong Natural Harmony được giữ trọn vẹn đường vân tự nhiên, khẳng định tính độc bản duy nhất."
    },
    {
      id: "the-art-of-jade",
      name: "The Art of Jade",
      tagline: "Nghệ Thuật Chế Tác Đỉnh Cao",
      desc: "Các thiết kế độc bản kết hợp giữa kỹ thuật kim hoàn thủ công hàng trăm giờ và triết lý điêu khắc ngọc truyền thống.",
      image: "assets/images/collection/cl4.jpg",
      bannerImage: "assets/images/collection/cl4-4.jpg",
      story: "Mỗi nhát mài, mỗi đường dũa là sự kiên định của nghệ nhân bậc thầy để đưa tinh hoa đất trời tỏa sáng lộng lẫy trên đôi tay quý cô."
    }
  ],

  /* ========================================================================
     DANH SÁCH SẢN PHẨM (DỮ LIỆU ĐỘC LẬP TẬP TRUNG TẠI JS)
     Khi bạn thêm sản phẩm mới vào mảng này, hệ thống sẽ TỰ ĐỘNG hiển thị trên:
     1. Trang chủ: Sản phẩm mới, Bán chạy, Ưu đãi đặc quyền.
     2. Trang danh mục sản phẩm (Lọc theo danh mục, giá, màu sắc).
     3. Trang chi tiết sản phẩm (gallery ảnh, chọn ni tay, số lượng).
     4. Tìm kiếm, Danh sách yêu thích, Giỏ hàng và Thanh toán.
     
     MẪU THÊM NHANH SẢN PHẨM MỚI:
     {
       id: 37, // Tăng dần ID
       name: "Tên Sản Phẩm Mới",
       slug: "ten-san-pham-moi",
       sku: "JD-VT-037",
       category: "vong-ban", // Một trong 6 danh mục: "vong-ban" | "vong-hat" | "nhan-ngoc" | "day-chuyen" | "bong-tai" | "trang-suc-da-quy"
       categoryName: "Vòng Bản",
       collection: "timeless-jade",
       collectionName: "Timeless Jade",
       price: 25000000,
       originalPrice: 28000000,
       discountPercent: 10,
       isNew: true,        // true: tự động lên mục SẢN PHẨM MỚI trang chủ
       isBestSeller: true, // true: tự động lên mục SẢN PHẨM BÁN CHẠY trang chủ
       isFeatured: true,
       rating: 5.0,
       reviewCount: 15,
       stock: 5,
       color: "Xanh lý băng chủng",
       material: "Ngọc Jadeite tự nhiên Type A 100%",
       sizes: ["Ni 52", "Ni 54", "Ni 56"],
       images: ["link_anh_1", "link_anh_2", "link_anh_3"],
       description: "Mô tả chi tiết sản phẩm...",
       features: ["Đặc điểm 1", "Đặc điểm 2", "Đặc điểm 3", "Đặc điểm 4"],
       care: "Hướng dẫn bảo dưỡng..."
     },
     ======================================================================== */
  products: [
    {
      id: 1,
      name: "Vòng Ngọc Phỉ Thuý Băng Chủng Hoàng Gia",
      slug: "vong-ngoc-phi-thuy-bang-chung-hoang-gia",
      sku: "JD-VT-001",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "timeless-jade",
      collectionName: "Timeless Jade",
      price: 28500000,
      originalPrice: 32000000,
      discountPercent: 11,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 38,
      stock: 3,
      color: "Xanh lý băng chủng",
      material: "Ngọc Jadeite tự nhiên Type A 100% (Myanmar), kèm chứng thư kiểm định SJC/PNJ",
      sizes: ["Ni 52 (Cổ tay 14-15cm)", "Ni 54 (Cổ tay 15-16cm)", "Ni 56 (Cổ tay 16-17cm)"],
      images: [
        "assets/images/product/id1.jpg"
      ],
      description: "Chiếc vòng ngọc Phỉ Thuý dòng Băng Chủng (Icy Jadeite) đạt độ trong suốt tự nhiên hiếm có, thấu quang rạng rỡ dưới ánh sáng ban ngày. Sắc xanh lục dịu mắt xen lẫn vân hoa tuyết độc bản tượng trưng cho phúc lộc và sự trường thọ viên mãn.",
      features: [
        "Chất ngọc Băng Chủng thấu quang sâu, bề mặt bóng mướt như lụa",
        "100% không xử lý nhiệt, không tẩm màu nhân tạo (Chuẩn Type A)",
        "Thiết kế bản tròn thanh thoát, êm tay khi đeo hằng ngày",
        "Bảo hành làm bóng và kiểm định trọn đời tại JADE"
      ],
      care: "Tránh tiếp xúc trực tiếp với hóa chất tẩy rửa mạnh, axit hoặc cồn. Vệ sinh nhẹ nhàng bằng khăn vải mềm và nước ấm định kỳ."
    },
    {
      id: 2,
      name: "Vòng Cẩm Thạch Huyết Ngọc Tự Nhiên Quý Hiếm",
      slug: "vong-cam-thach-huyet-ngoc-tu-nhien",
      sku: "JD-VT-002",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 36800000,
      originalPrice: null,
      discountPercent: null,
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 22,
      stock: 2,
      color: "Xanh ngọc điểm huyết cam vàng",
      material: "Ngọc Jadeite tự nhiên Type A đa sắc",
      sizes: ["Ni 54", "Ni 56"],
      images: [
       "assets/images/product/id2.jpg",
      ],
      description: "Tuyệt phẩm vòng ngọc Jadeite sở hữu dải màu tự nhiên chuyển tiếp ngoạn mục từ xanh lục thanh mát sang vệt huyết ngọc cam vàng vương giả. Một tạo tác hiếm gặp của đất trời được chế tác nguyên khối.",
      features: [
        "Vệt huyết ngọc tự nhiên mang lại vượng khí và may mắn dồi dào",
        "Chất ngọc mịn màng, độ bắt sáng tinh khôi",
        "Dáng vòng dẹp (bản hẹ) ôm khít cổ tay nữ tính",
        "Kèm hộp nhung cao cấp và chứng thư giám định độc lập"
      ],
      care: "Tháo vòng khi vận động mạnh hoặc tắm suối khoáng nóng chứa lưu huỳnh cao."
    },
    {
      id: 3,
      name: "Nhẫn Ngọc Jadeite Xanh Đế Vương Bọc Vàng 18K",
      slug: "nhan-ngoc-jadeite-xanh-de-vuong",
      sku: "JD-RN-001",
      category: "nhan-ngoc",
      categoryName: "Nhẫn Ngọc",
      collection: "emerald-elegance",
      collectionName: "Emerald Elegance",
      price: 18500000,
      originalPrice: 21000000,
      discountPercent: 12,
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 45,
      stock: 5,
      color: "Xanh Lục Đế Vương (Imperial Green)",
      material: "Ngọc Jadeite Type A mài giọt Cabochon, ổ vàng vàng 18K đính kim cương tự nhiên 0.25ct",
      sizes: ["Size 10 (Đường kính 15.6mm)", "Size 12 (Đường kính 16.5mm)", "Size 14 (Đường kính 17.3mm)"],
      images: [
        "assets/images/product/id3.jpg",
      ],
      description: "Viên chủ ngọc Jadeite sở hữu sắc xanh Imperial Green quý giá nhất trong thang phân loại ngọc, mài nổi hình oval căng bóng. Ổ nhẫn bằng vàng 18K chạm khắc hoa văn hoa sen cách điệu đính viền kim cương tấm lấp lánh.",
      features: [
        "Ngọc chủ chuẩn màu Imperial Green đạt cấp độ trưng bày bảo tàng",
        "Vàng 18K tiêu chuẩn Châu Âu chống oxi hóa cao",
        "Đính 24 viên kim cương thiên nhiên tuyển chọn giác cắt tròn",
        "Khắc tên thương hiệu JADE tinh xảo lòng nhẫn"
      ],
      care: "Dùng khăn mềm làm khô sau khi rửa tay. Tránh va quẹt mặt ngọc vào các bề mặt kim loại thô ráp."
    },
    {
      id: 4,
      name: "Dây Chuyền Mặt Ngọc Như Ý Phỉ Thuý Bọc Vàng Trắng",
      slug: "day-chuyen-mat-ngoc-nhu-y-phi-thuy",
      sku: "JD-NK-001",
      category: "day-chuyen",
      categoryName: "Dây Chuyền Ngọc",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 15200000,
      originalPrice: 17500000,
      discountPercent: 13,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 4.8,
      reviewCount: 31,
      stock: 7,
      color: "Xanh lý thanh thoát",
      material: "Ngọc Jadeite tự nhiên chạm khắc Như Ý thủ công, móc treo vàng trắng Ý 750",
      sizes: ["Dây 42cm", "Dây 45cm", "Mặt lẻ không dây"],
      images: [
        "assets/images/product/id4.jpg",
      
      ],
      description: "Biểu tượng gậy Như Ý cát tường được chạm khắc mềm mại từ phiến ngọc phỉ thuý xanh trong vắt. Thiết kế mang ý nghĩa cầu chúc mọi sự hanh thông, bình an và tâm hồn thanh tịnh cho người sở hữu.",
      features: [
        "Đường nét chạm khắc thủ công sống động từng đường viền mây",
        "Chất ngọc mịn màng, thấu quang nhẹ nhàng dưới ánh mặt trời",
        "Đi kèm dây chuyền vàng trắng Ý 750 chống đứt gãy",
        "Món quà ý nghĩa dành tặng mẹ, người thương hoặc đối tác"
      ],
      care: "Cất giữ trong hộp đựng có lót vải mềm riêng biệt để tránh cọ xát với các trang sức khác."
    },
    {
      id: 5,
      name: "Bông Tai Ngọc Jadeite Giọt Nước Thanh Tao",
      slug: "bong-tai-ngoc-jadeite-giot-nuoc",
      sku: "JD-ER-001",
      category: "bong-tai",
      categoryName: "Bông Tai Ngọc",
      collection: "emerald-elegance",
      collectionName: "Emerald Elegance",
      price: 9800000,
      originalPrice: 11500000,
      discountPercent: 15,
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 29,
      stock: 6,
      color: "Xanh ngọc lục bảo",
      material: "Cặp ngọc Jadeite mài giọt nước đều màu, chấu khuyên vàng 18K",
      sizes: ["Chiều dài 3.2cm"],
      images: [
        "assets/images/product/id5.jpg"
      ],
      description: "Cặp bông tai dáng giọt ngọc đung đưa theo từng nhịp bước của quý cô. Độ đồng đều về màu sắc và chất thấu quang giữa hai viên ngọc đạt tỷ lệ tuyển chọn 1 trên 50 phiến ngọc thô.",
      features: [
        "Độ cân xứng hoàn hảo giữa hai viên ngọc giọt nước",
        "Chuôi vặn chắc chắn, an toàn khi sử dụng hàng ngày",
        "Tôn vinh đường nét thanh tú của bờ vai và gương mặt",
        "Trọng lượng nhẹ, tạo cảm giác êm ái thoải mái"
      ],
      care: "Lau sạch bằng khăn bông ẩm sau mỗi lần đeo để giữ bề mặt ngọc luôn sáng bóng tự nhiên."
    },
    {
      id: 6,
      name: "Vòng Ngọc Bích Bạch Ngọc Hoà Điền Thuần Khiết",
      slug: "vong-ngoc-bach-ngoc-hoa-dien",
      sku: "JD-VT-003",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 24500000,
      originalPrice: null,
      discountPercent: null,
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 19,
      stock: 4,
      color: "Trắng sữa mỡ cừu (Mutton Fat Jade)",
      material: "Bạch Ngọc Hoà Điền tự nhiên Tân Cương nguyên khối",
      sizes: ["Ni 53", "Ni 55", "Ni 57"],
      images: [
        "assets/images/product/id6.jpg"
      ],
      description: "Bạch Ngọc Hoà Điền sở hữu chất ngọc dẻo quánh, mịn màng và ấm áp như mỡ cừu thượng phẩm. Mang nguồn năng lượng ôn hoà, giúp điều dưỡng khí huyết và dưỡng tâm an lạc.",
      features: [
        "Chất ngọc 'dưỡng người' càng đeo lâu càng lên nước bóng mượt",
        "Độ cứng cao, bề mặt hoàn thiện không vết trầy xước",
        "Màu trắng ngà sang trọng, dễ phối mọi trang phục từ áo dài đến đầm dạ hội",
        "Được phong thuỷ gia khuyên dùng để hộ thân hộ mệnh"
      ],
      care: "Nên đeo thường xuyên để ngọc hấp thụ tinh khí và tăng cường độ bóng tự nhiên."
    },
    {
      id: 7,
      name: "Vòng Tay Ngọc Phỉ Thuý Phối Charm Hoa Sen Vàng 18K",
      slug: "vong-tay-ngoc-phi-thuy-charm-hoa-sen",
      sku: "JD-VT-004",
      category: "vong-hat",
      categoryName: "Vòng Hạt",
      collection: "timeless-jade",
      collectionName: "Timeless Jade",
      price: 13900000,
      originalPrice: 15500000,
      discountPercent: 10,
      isNew: false,
      isBestSeller: true,
      isFeatured: false,
      rating: 4.9,
      reviewCount: 52,
      stock: 8,
      color: "Xanh đậu ngọt ngào",
      material: "Hạt ngọc Phỉ Thuý 8mm kết hợp charm Hoa Sen vàng 18K đúc rỗng cao cấp",
      sizes: ["Size tay 14cm", "Size tay 15cm", "Size tay 16cm (Dây co giãn siêu bền)"],
      images: [
        "assets/images/product/id7.jpg"
      ],
      description: "Sự kết hợp tinh tế giữa chuỗi hạt ngọc phỉ thuý tròn đều và biểu tượng hoa sen thanh cao bằng vàng 18K. Mang đến nét duyên ngầm trẻ trung hiện đại nhưng vẫn đượm hồn phương Đông.",
      features: [
        "Chuỗi 18 hạt ngọc tuyển chọn đồng đều về đường kính và độ bóng",
        "Charm vàng 18K có dấu kiểm định độ tinh khiết",
        "Dây xỏ sợi thun Nhật Bản 4 lớp chống dão và đứt bất ngờ",
        "Đổi size dây miễn phí trọn đời"
      ],
      care: "Tháo vòng khi thoa kem dưỡng da hoặc xịt nước hoa để giữ độ trong của hạt ngọc."
    },
    {
      id: 8,
      name: "Mặt Dây Chuyền Hồ Lô Ngọc Bích Đính Kim Cương",
      slug: "mat-day-chuyen-ho-lo-ngoc-bich",
      sku: "JD-NK-002",
      category: "day-chuyen",
      categoryName: "Dây Chuyền Ngọc",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 12600000,
      originalPrice: null,
      discountPercent: null,
      isNew: true,
      isBestSeller: false,
      isFeatured: false,
      rating: 4.8,
      reviewCount: 16,
      stock: 4,
      color: "Xanh lá mạ rực rỡ",
      material: "Ngọc Jadeite dáng Hồ Lô mập mạp thấu quang, khoen vàng hồng 18K",
      sizes: ["Kích thước mặt 22x14mm"],
      images: [
        "assets/images/product/id8.jpg"
      ],
      description: "Hình tượng Hồ Lô phong thuỷ tích tụ tài lộc, hoá giải điềm hung được tạc từ phiến ngọc xanh tươi mát. Phần eo hồ lô thắt nơ đính dải kim cương tấm tăng thêm vẻ lộng lẫy.",
      features: [
        "Ý nghĩa chiêu tài tấn bảo và tích tụ sinh khí tích cực",
        "Kỹ thuật cắt mài 3D tạo chiều sâu phản chiếu đa chiều",
        "Thích hợp diện đơn lẻ hoặc kết hợp theo phong cách layering",
        "Tặng kèm dây da cao cấp và dây chuyền bạc mạ vàng"
      ],
      care: "Vệ sinh nhẹ bằng nước ấm pha xà phòng loãng mỗi tháng một lần."
    },
    {
      id: 9,
      name: "Nhẫn Ngọc Bản Hẹ Nguyên Khối Tối Giản",
      slug: "nhan-ngoc-ban-he-nguyen-khoi",
      sku: "JD-RN-002",
      category: "nhan-ngoc",
      categoryName: "Nhẫn Ngọc",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 6800000,
      originalPrice: 7800000,
      discountPercent: 13,
      isNew: false,
      isBestSeller: true,
      isFeatured: false,
      rating: 4.7,
      reviewCount: 68,
      stock: 12,
      color: "Xanh ngọc nhạt tinh khôi",
      material: "Ngọc Jadeite tự nhiên nguyên khối không kim loại",
      sizes: ["Size 9", "Size 11", "Size 13", "Size 15"],
      images: [
        "assets/images/product/id9.jpg"
      ],
      description: "Thiết kế nhẫn bản hẹ thanh lịch tiện dụng cho sinh hoạt hàng ngày. Không chi tiết rườm rà, nhẫn khoe trọn vẹn vẻ đẹp mộc mạc và vân thớ độc đáo tự nhiên của khối ngọc.",
      features: [
        "Ngọc tiện nguyên khối liền lạc, cảm giác mát rượi trên ngón tay",
        "Dễ dàng phối cùng các trang phục công sở hiện đại",
        "Giá thành tiếp cận phù hợp cho người mới bắt đầu chơi ngọc",
        "Bảo dưỡng đánh bóng trọn đời"
      ],
      care: "Tháo nhẫn khi nâng vật nặng bằng kim loại để tránh va đập mạnh làm nứt ngọc."
    },
    {
      id: 10,
      name: "Bông Tai Nụ Ngọc Phỉ Thuý Đính Viền Kim Cương",
      slug: "bong-tai-nu-ngoc-phi-thuy",
      sku: "JD-ER-002",
      category: "bong-tai",
      categoryName: "Bông Tai Ngọc",
      collection: "timeless-jade",
      collectionName: "Timeless Jade",
      price: 11200000,
      originalPrice: null,
      discountPercent: null,
      isNew: false,
      isBestSeller: true,
      isFeatured: false,
      rating: 4.9,
      reviewCount: 34,
      stock: 5,
      color: "Xanh ngọc lục đậm",
      material: "Ngọc Jadeite cabochon tròn 6mm, viền vàng trắng 18K",
      sizes: ["Đường kính 9mm"],
      images: [
        "assets/images/product/id10.jpg"
      ],
      description: "Dáng khuyên nụ cổ điển sát dái tai đem lại vẻ đẹp tinh giản và quý phái. Viên ngọc tròn trịa được ôm ấp bởi vòng hào quang kim cương tấm rạng rỡ.",
      features: [
        "Phù hợp tuyệt đối cho môi trường văn phòng lẫn dạ tiệc sang trọng",
        "Chốt tai ốc vặn bằng vàng 18K an tâm không lo rơi rớt",
        "Chất ngọc xanh mướt nổi bật trên làn da phái đẹp",
        "Đầy đủ giấy tờ xuất xứ và kiểm định đá quý"
      ],
      care: "Bảo quản trong hộp trang trí có ngăn riêng."
    },
    {
      id: 11,
      name: "Chuỗi Vòng Tay Ngọc Bích Hetian Xanh Rêu Trầm 10mm",
      slug: "chuoi-vong-tay-ngoc-bich-hetian",
      sku: "JD-VT-005",
      category: "vong-hat",
      categoryName: "Vòng Hạt",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 17800000,
      originalPrice: 20000000,
      discountPercent: 11,
      isNew: true,
      isBestSeller: false,
      isFeatured: false,
      rating: 4.9,
      reviewCount: 18,
      stock: 5,
      color: "Xanh rêu ngọc bích (Spinach Green)",
      material: "Ngọc Bích Hetian tự nhiên chất ngọc dầu dẻo mịn",
      sizes: ["19 hạt (Cổ tay 15-16.5cm)"],
      images: [
        "assets/images/product/id11.jpg"
      ],
      description: "Sắc xanh rau chân vịt (Spinach Green) trầm ấm và tĩnh tại đặc trưng của dòng ngọc bích Tân Cương. Từng hạt ngọc được khoan lỗ tròn tinh xảo, chất ngọc mượt như bơ dầu thượng hạng.",
      features: [
        "Năng lượng điều hoà cảm xúc, xua tan căng thẳng mỏi mệt",
        "Hạt ngọc 10mm tròn đều tăm tắp",
        "Tone màu trầm quyền quý thích hợp cho cả nam và nữ",
        "Được chúc phúc bình an tại các ngôi chùa ngọc danh tiếng"
      ],
      care: "Thường xuyên xoa ngọc trong lòng bàn tay để chất ngọc ngày càng sáng bóng."
    },
    {
      id: 12,
      name: "Vòng Ngọc Phỉ Thuý Phối Charm Khóa Trường Mệnh Vàng",
      slug: "vong-ngoc-phi-thuy-khoa-truong-menh",
      sku: "JD-VT-006",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 19500000,
      originalPrice: 23000000,
      discountPercent: 15,
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 41,
      stock: 3,
      color: "Xanh ngọc lý trong vắt",
      material: "Ngọc Jadeite tự nhiên kết hợp khóa trường mệnh vàng 18K",
      sizes: ["Ni 53", "Ni 55"],
      images: [
        "assets/images/product/id12.jpg"
      ],
      description: "Khóa trường mệnh – biểu tượng dân gian sâu sắc về sự bảo bọc bình an và trường thọ viên mãn – được đúc vàng tinh xảo nằm nổi bật trên nền ngọc phỉ thuý xanh mướt.",
      features: [
        "Món bảo vật gia truyền gìn giữ qua nhiều thế hệ",
        "Thiết kế khoá đóng mở thuận tiện, an toàn",
        "Chất ngọc già tuổi đạt độ bóng tráng gương",
        "Tặng kèm hộp gỗ sơn mài cao cấp"
      ],
      care: "Bảo quản nơi khô ráo, tránh độ ẩm quá cao hoặc thay đổi nhiệt độ đột ngột."
    },
    {
      id: 13,
      name: "Bộ Trang Sức Ngọc Phỉ Thuý Dạ Yến Hoàng Gia",
      slug: "bo-trang-suc-ngoc-phi-thuy-da-yen",
      sku: "JD-ST-001",
      category: "trang-suc-da-quy",
      categoryName: "Trang Sức Đá Quý",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 58000000,
      originalPrice: 65000000,
      discountPercent: 11,
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 12,
      stock: 1,
      color: "Xanh Imperial Green thấu quang",
      material: "Bộ gồm Dây Chuyền, Nhẫn & Bông Tai bằng Ngọc Jadeite bọc vàng trắng 18K đính kim cương",
      sizes: ["Kích thước tiêu chuẩn dạ hội"],
      images: [
        "assets/images/product/id13.jpg",
      ],
      description: "Set trang sức đỉnh cao được chế tác cùng từ một phiến ngọc thô Imperial Green đồng chất. Dành riêng cho các quý cô yêu thích phong thái kiêu sa lộng lẫy tại những sự kiện trọng đại nhất đời.",
      features: [
        "Độ đồng nhất tuyệt đối về màu sắc và nước ngọc cả 3 món",
        "Đính kết hơn 120 viên kim cương tấm thiên nhiên tinh khiết",
        "Được chế tác thủ công hơn 160 giờ làm việc của nghệ nhân trưởng JADE",
        "Chứng thư kiểm định quốc tế GIA / PNJ đi kèm"
      ],
      care: "Được hưởng dịch vụ bảo dưỡng và kiểm định định kỳ miễn phí tại gia."
    },
    {
      id: 14,
      name: "Dây Chuyền Ngọc Bích Giọt Sương Mai Vàng 14K",
      slug: "day-chuyen-ngoc-bich-giot-suong-mai",
      sku: "JD-NK-003",
      category: "day-chuyen",
      categoryName: "Dây Chuyền Ngọc",
      collection: "emerald-elegance",
      collectionName: "Emerald Elegance",
      price: 8900000,
      originalPrice: 9900000,
      discountPercent: 10,
      isNew: false,
      isBestSeller: true,
      isFeatured: false,
      rating: 4.8,
      reviewCount: 27,
      stock: 8,
      color: "Xanh táo tươi mát",
      material: "Ngọc Jadeite cabochon giọt sương, dây chuyền vàng vàng 14K thanh mảnh",
      sizes: ["Dây dài 40cm + đoạn nối 5cm"],
      images: [
        "assets/images/product/id14.jpg"
      ],
      description: "Tựa như giọt sương mai đọng trên chiếc lá non đầu ngày, viên ngọc mang sắc xanh dịu ngọt thổi bùng nét trẻ trung tràn đầy sức sống cho người diện.",
      features: [
        "Thiết kế tối giản hiện đại cho nàng tiểu thư sành điệu",
        "Dây xích mắt xích thanh mảnh tôn bờ xương quai xanh quyến rũ",
        "Chất ngọc mọng nước phản chiếu ánh sáng dịu dàng",
        "Giá thành hợp lý, thích hợp làm quà tặng sinh nhật"
      ],
      care: "Lau khô sau khi tiếp xúc mồ hôi cơ thể."
    },
    {
      id: 15,
      name: "Nhẫn Ngọc Khắc Chữ Phúc Kim Cương Tinh Xảo",
      slug: "nhan-ngoc-khac-chu-phuc",
      sku: "JD-RN-003",
      category: "nhan-ngoc",
      categoryName: "Nhẫn Ngọc",
      collection: "timeless-jade",
      collectionName: "Timeless Jade",
      price: 14200000,
      originalPrice: 16500000,
      discountPercent: 14,
      isNew: true,
      isBestSeller: false,
      isFeatured: false,
      rating: 4.9,
      reviewCount: 20,
      stock: 4,
      color: "Xanh lục lý bóng",
      material: "Mặt ngọc Jadeite khắc chữ Phúc thư pháp, viền vàng 18K",
      sizes: ["Size 11", "Size 13", "Size 15"],
      images: [
        "assets/images/product/id15.jpg"
      ],
      description: "Chữ Phúc trong thư pháp Á Đông được điêu khắc thủ công tinh vi trên bề mặt ngọc cẩm thạch. Chiếc nhẫn gửi gắm ước nguyện vạn phúc lâm môn và tài lộc dồi dào.",
      features: [
        "Nét chữ thư pháp thanh thoát hài hòa phong thủy",
        "Vàng 18K hoàn thiện bóng mờ satin sang trọng",
        "Đeo ngón trỏ hoặc ngón giữa giúp củng cố bản lĩnh và sự nghiệp",
        "Bảo hành trọn đời độ bền mối chấu"
      ],
      care: "Tránh tiếp xúc chất tẩy rửa có clo."
    },
    {
      id: 16,
      name: "Bông Tai Dài Giọt Ngọc Bích Phối Ngọc Trai South Sea",
      slug: "bong-tai-ngoc-bich-phoi-ngoc-trai",
      sku: "JD-ER-003",
      category: "bong-tai",
      categoryName: "Bông Tai Ngọc",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 16800000,
      originalPrice: null,
      discountPercent: null,
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 15,
      stock: 3,
      color: "Xanh ngọc bích phối ánh ngọc trai vàng kim",
      material: "Ngọc Jadeite tự nhiên kết hợp ngọc trai biển South Sea 10mm và vàng 18K",
      sizes: ["Dài 4.8cm"],
      images: [
        "assets/images/product/id16.jpg"
      ],
      description: "Cuộc hạnh ngộ kỳ diệu giữa ngọc của đất và ngọc trai của biển cả bao la. Ánh xà cừ óng ả hoà cùng sắc xanh sâu thẳm tạo nên một tác phẩm nghệ thuật đeo tai độc đáo.",
      features: [
        "Ngọc trai South Sea ánh vàng kim tự nhiên không qua xử lý",
        "Thiết kế dạng dây dài tạo hiệu ứng thon gọn khuôn mặt",
        "Phù hợp cho các buổi dạ yến thảm đỏ và ngày cưới",
        "Kèm hộp nhung sang trọng đẳng cấp"
      ],
      care: "Tránh xịt keo xịt tóc trực tiếp vào ngọc trai và mặt ngọc."
    }
  
    ,
    {
      id: 17,
      name: "Vòng Cẩm Thạch Băng Tiêu Sơn Thuỷ Thượng Phẩm",
      slug: "vong-cam-thach-bang-tieu-son-thuy",
      sku: "JD-VT-004",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "timeless-jade",
      collectionName: "Timeless Jade",
      price: 42000000,
      originalPrice: 46000000,
      discountPercent: 9,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 29,
      stock: 2,
      color: "Xanh sơn thuỷ băng tiêu trong suốt",
      material: "Ngọc Jadeite tự nhiên Type A (Myanmar), kèm chứng thư SJC",
      sizes: ["Ni 52", "Ni 54", "Ni 55"],
      images: [
        "assets/images/product/id17.jpg"
      ],
      description: "Phiến ngọc Băng Tiêu ngậm nước trong vắt, ẩn hiện những dải mây xanh tựa bức tranh sơn thuỷ hữu tình. Nước ngọc già đanh, càng đeo càng lên nước bóng mịn theo thời gian.",
      features: [
        "Chất ngọc Băng Tiêu thấu quang tuyệt đối, không vết rạn nứt",
        "Tạo hình bản tròn cổ điển (vòng phúc lộc) mềm mại ôm tay",
        "Mang nguồn năng lượng an hoà và bảo hộ gia chủ",
        "Bảo hành dưỡng ngọc và kiểm định trọn đời"
      ],
      care: "Vệ sinh định kỳ bằng nước ấm và lau khô bằng khăn vải nhung mềm."
    },
    {
      id: 18,
      name: "Vòng Cẩm Thạch Lục Đậu Bản Hẹ Quý Phái",
      slug: "vong-cam-thach-luc-dau-ban-he",
      sku: "JD-VT-005",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "emerald-elegance",
      collectionName: "Emerald Elegance",
      price: 26500000,
      originalPrice: 29500000,
      discountPercent: 10,
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 34,
      stock: 4,
      color: "Xanh lục đậu thanh nhã",
      material: "Ngọc Jadeite tự nhiên Type A nguyên khối",
      sizes: ["Ni 53", "Ni 55", "Ni 57"],
      images: [
        "assets/images/product/id18.jpg"
      ],
      description: "Sắc xanh lục đậu ngọt ngào, chất ngọc dẻo quánh và hạt ngọc cực mịn. Dáng bản hẹ thanh lịch phù hợp với quý cô công sở và những buổi tiệc nhẹ nhàng.",
      features: [
        "Màu xanh lục đậu tự nhiên đồng đều toàn vòng",
        "Bản dẹp êm dịu, không cấn cổ tay khi thao tác máy tính",
        "Kèm hộp gấm cao cấp và khăn lau chuyên dụng",
        "Chứng nhận kiểm định đá quý độc lập PNJ Lab"
      ],
      care: "Tháo vòng khi làm việc nặng để bảo vệ độ bóng hoàn hảo."
    },
    {
      id: 19,
      name: "Vòng Cẩm Thạch Hoa Tiêu Hoàng Gia Độc Bản",
      slug: "vong-cam-thach-hoa-tieu-hoang-gia",
      sku: "JD-VT-006",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 58000000,
      originalPrice: null,
      discountPercent: null,
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 18,
      stock: 1,
      color: "Xanh lý rêu hoa tiêu nghệ thuật",
      material: "Ngọc Jadeite tự nhiên Type A độc bản Myanmar",
      sizes: ["Ni 54 (Duy nhất 1 chiếc)"],
      images: [
        "assets/images/product/id19.jpg"
      ],
      description: "Tuyệt phẩm vòng ngọc độc nhất vô nhị với hoạ tiết hoa tiêu tự nhiên tựa những cánh hoa bay trong sương sớm. Tác phẩm dành riêng cho nhà sưu tập trân quý giá trị độc bản của tạo hoá.",
      features: [
        "Mỗi chiếc vòng là một tác phẩm nghệ thuật duy nhất trên đời",
        "Độ thấu quang cao kết hợp vân ngọc kỳ vĩ",
        "Chế tác thủ công bởi nghệ nhân ngọc hàng đầu",
        "Khắc mã số kiểm định laser chống giả"
      ],
      care: "Bảo quản trong hộp lót nhung tơ tằm nguyên bản."
    },
    {
      id: 20,
      name: "Vòng Ngọc Phỉ Thuý Tam Sắc Phúc Lộc Thọ",
      slug: "vong-ngoc-phi-thuy-tam-sac",
      sku: "JD-VT-007",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 65000000,
      originalPrice: 72000000,
      discountPercent: 10,
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 42,
      stock: 2,
      color: "Tam sắc: Xanh lục - Trắng băng - Vàng mật",
      material: "Ngọc Jadeite tự nhiên Type A Tam Tài quý hiếm",
      sizes: ["Ni 53", "Ni 55"],
      images: [
        "assets/images/product/id20.jpg"
      ],
      description: "Chiếc vòng hội tụ trọn vẹn ba sắc thái phong thuỷ: Lục tượng trưng cho Lộc, Bạch tượng trưng cho Phúc và Hoàng mật tượng trưng cho Thọ. Vật phẩm cát tường mang lại thịnh vượng viên mãn.",
      features: [
        "Hội tụ ba sắc màu tự nhiên trên cùng một thân vòng",
        "Thấu quang đồng đều, chất ngọc sáng bừng",
        "Mang ý nghĩa phong thuỷ gia đạo bình an, hanh thông tài vận",
        "Giấy kiểm định vàng bạc đá quý Việt Nam kèm theo"
      ],
      care: "Thường xuyên đeo trên tay để dưỡng ngọc sáng đẹp tự nhiên."
    },
    {
      id: 21,
      name: "Vòng Bạch Ngọc Mỡ Cừu Tân Cương Khắc Chữ Phúc",
      slug: "vong-bach-ngoc-mo-cuu-chu-phuc",
      sku: "JD-VN-003",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "timeless-jade",
      collectionName: "Timeless Jade",
      price: 14800000,
      originalPrice: 16500000,
      discountPercent: 10,
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      rating: 4.8,
      reviewCount: 19,
      stock: 3,
      color: "Trắng sữa mỡ cừu ấm áp",
      material: "Bạch Ngọc Hoà Điền Tân Cương tự nhiên 100%",
      sizes: ["Ni 52", "Ni 54", "Ni 56"],
      images: [
        "assets/images/product/id21.jpg"
      ],
      description: "Chất ngọc trắng ngà như mỡ cừu, chạm khắc viền chữ Phúc cổ truyền tinh xảo. Cảm giác cầm nắm đầm tay, ấm áp và dưỡng tâm tịnh khí.",
      features: [
        "Ngọc Hoà Điền cổ truyền Tân Cương có tuổi đời ngàn năm",
        "Độ bôi nhờn tự nhiên cao, càng đeo càng bóng mượt",
        "Chữ Phúc viền thanh thoát mang năng lượng an lạc",
        "Phù hợp làm quà tặng báo hiếu ý nghĩa"
      ],
      care: "Tránh để vòng tiếp xúc với nước hoa hoặc mỹ phẩm chứa cồn."
    },
    {
      id: 22,
      name: "Vòng Ngọc Bích Nephrite Xanh Táo Thượng Phẩm",
      slug: "vong-ngoc-bich-nephrite-xanh-tao",
      sku: "JD-VN-004",
      category: "vong-ban",
      categoryName: "Vòng Bản",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 22000000,
      originalPrice: null,
      discountPercent: null,
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 27,
      stock: 3,
      color: "Xanh táo non tươi mát",
      material: "Ngọc Bích Nephrite Nga tự nhiên chất lượng cao",
      sizes: ["Ni 53", "Ni 55"],
      images: [
        "assets/images/product/id22.jpg"
      ],
      description: "Màu xanh táo trẻ trung tươi mát tràn đầy năng lượng thanh xuân. Chất ngọc Nephrite mịn màng không chút tì vết giúp thanh tẩy năng lượng tiêu cực.",
      features: [
        "Sắc xanh táo độc đáo cực kỳ hiếm trong dòng ngọc bích",
        "Thiết kế bản tròn thanh mảnh tôn vinh cổ tay thon gọn",
        "Độ bền cơ học cao, chống va đập tốt hơn các loại đá quý khác",
        "Bảo hành đánh bóng trọn đời"
      ],
      care: "Rửa sạch bụi bẩn bằng xà phòng trung tính định kỳ."
    },
    {
      id: 23,
      name: "Vòng Tay Ngọc Băng Chủng Phối Charm Hồ Lô Vàng 24K",
      slug: "vong-tay-ngoc-bang-chung-charm-ho-lo",
      sku: "JD-VN-005",
      category: "vong-hat",
      categoryName: "Vòng Hạt",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 19800000,
      originalPrice: 22000000,
      discountPercent: 10,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 36,
      stock: 5,
      color: "Băng chủng thấu quang phối vàng kim",
      material: "Ngọc Jadeite Băng Chủng tự nhiên phối vàng ròng 24K (9999)",
      sizes: ["Freesize dây co giãn cao cấp (15-18cm)"],
      images: [
        "assets/images/product/id23.jpg"
      ],
      description: "Sự kết hợp tinh tế giữa chuỗi hạt ngọc phỉ thúy thấu quang băng giá và charm Hồ Lô vàng 24K khắc chữ Phúc. Mang ý nghĩa chiêu tài tích lộc và xua đuổi tà khí.",
      features: [
        "Hạt ngọc băng chủng 8mm mài tròn bóng không gợn",
        "Charm hồ lô đúc vàng ròng 24K chuẩn tuổi",
        "Dây xỏ tơ Nhật 4 lớp siêu bền chịu lực tốt",
        "Phù hợp đeo đơn hoặc mix cùng đồng hồ hàng hiệu"
      ],
      care: "Tránh kéo giãn dây quá mức và tránh tiếp xúc nước nóng thường xuyên."
    },
    {
      id: 24,
      name: "Vòng Chuỗi Bạch Ngọc Niết Bàn 108 Hạt Bình An",
      slug: "vong-chuoi-bach-ngoc-108-hat",
      sku: "JD-VN-006",
      category: "vong-hat",
      categoryName: "Vòng Hạt",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 9800000,
      originalPrice: 11200000,
      discountPercent: 12,
      isNew: false,
      isBestSeller: false,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 15,
      stock: 6,
      color: "Bạch ngọc thuần khiết",
      material: "Bạch Ngọc Hoà Điền tự nhiên tuyển chọn 108 hạt 6mm",
      sizes: ["Chuỗi 108 hạt (quấn 3-4 vòng cổ tay hoặc đeo cổ)"],
      images: [
        "assets/images/product/id24.jpg"
      ],
      description: "108 hạt bạch ngọc tượng trưng cho việc đoạn trừ 108 phiền não trần thế. Mỗi lần lần chuỗi là một lần tâm an trí sáng, đón nhận an lành trong từng nhịp thở.",
      features: [
        "108 hạt đồng đều về kích thước và độ ngậm sắc",
        "Đầu chuỗi phối ngọc bích đỏ và tua rua tơ tằm mềm mại",
        "Thiết kế đa năng: quấn tay sang trọng hoặc đeo cổ thanh lịch",
        "Được tịnh sái trước khi gửi đến tay khách hàng"
      ],
      care: "Giữ chuỗi ở nơi trang trọng, sạch sẽ khi không sử dụng."
    },
    {
      id: 25,
      name: "Nhẫn Ngọc Cẩm Thạch Băng Chủng Đính Moissanite",
      slug: "nhan-ngoc-cam-thach-bang-chung-moissanite",
      sku: "JD-RN-004",
      category: "nhan-ngoc",
      categoryName: "Nhẫn Ngọc",
      collection: "emerald-elegance",
      collectionName: "Emerald Elegance",
      price: 15600000,
      originalPrice: 17500000,
      discountPercent: 11,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 31,
      stock: 4,
      color: "Xanh lục băng chủng trong vắt",
      material: "Ngọc Jadeite Type A kết hợp vàng trắng 14K và đá Moissanite cao cấp",
      sizes: ["Size 9 (Ni 49)", "Size 11 (Ni 51)", "Size 13 (Ni 53)", "Size 15 (Ni 55)"],
      images: [
        "assets/images/product/id25.jpg"
      ],
      description: "Viên chủ ngọc Jadeite mài cabochon bầu dục thấu quang ngậm sắc xanh lục dịu mắt, bao quanh bởi dải kim cương Moissanite lấp lánh như triệu vì sao.",
      features: [
        "Viên chủ ngọc tự nhiên thấu quang 100% không bọt khí",
        "Ổ nhẫn vàng trắng 14K chế tác vi mô theo tiêu chuẩn Haute Joaillerie",
        "Đá tấm Moissanite giác cắt Hearts & Arrows rực lửa",
        "Tặng kèm bộ đo size nhẫn chuyên nghiệp tại nhà"
      ],
      care: "Tránh tiếp xúc dung dịch cồn sát khuẩn mạnh để bảo vệ ngọc và vàng trắng."
    },
    {
      id: 26,
      name: "Nhẫn Đôi Ngọc Phỉ Thuý Hoàng Hạc Đồng Tâm",
      slug: "nhan-doi-ngoc-phi-thuy-dong-tam",
      sku: "JD-RN-005",
      category: "nhan-ngoc",
      categoryName: "Nhẫn Ngọc",
      collection: "timeless-jade",
      collectionName: "Timeless Jade",
      price: 21500000,
      originalPrice: 24500000,
      discountPercent: 12,
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 48,
      stock: 3,
      color: "Xanh ngọc bích phối vàng hồng 18K",
      material: "Cặp nhẫn ngọc Jadeite tự nhiên xẻ cùng một khối ngọc, vàng hồng 18K",
      sizes: ["Nhẫn Nữ: Ni 9-13", "Nhẫn Nam: Ni 16-20"],
      images: [
         "assets/images/product/id26.jpg"
      ],
      description: "Cặp nhẫn được cắt ra từ cùng một phiến ngọc cẩm thạch nguyên bản, minh chứng cho lời thề nguyền đồng tâm đồng ý trường tồn qua năm tháng.",
      features: [
        "Cắt cùng phiến ngọc tượng trưng cho duyên số bền chặt",
        "Khắc tên và ngày kỷ niệm miễn phí bên trong lòng nhẫn",
        "Vàng hồng 18K ấm áp nâng niu làn da châu Á",
        "Hộp gỗ bọc da nhung cao cấp dành cho ngày cưới"
      ],
      care: "Thường xuyên dùng khăn lau bạc và dung dịch chuyên dụng làm sạch ổ nhẫn."
    },
    {
      id: 27,
      name: "Nhẫn Bản Vuông Bạch Ngọc Khắc Triện Khang Hy",
      slug: "nhan-ban-vuong-bach-ngoc-khang-hy",
      sku: "JD-RN-006",
      category: "nhan-ngoc",
      categoryName: "Nhẫn Ngọc",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 13900000,
      originalPrice: null,
      discountPercent: null,
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      rating: 4.8,
      reviewCount: 14,
      stock: 2,
      color: "Bạch ngọc sữa tự nhiên",
      material: "Bạch Ngọc Hoà Điền nguyên khối mài thủ công",
      sizes: ["Ni 14", "Ni 16", "Ni 18", "Ni 20"],
      images: [
        "assets/images/product/id27.jpg"
      ],
      description: "Mẫu nhẫn bản vuông khí chất vương giả, mặt trên chạm khắc con dấu triện phong thuỷ mang ý nghĩa nắm giữ quyền uy và sự hanh thông trong sự nghiệp.",
      features: [
        "Chế tác nguyên khối từ phiến bạch ngọc không chắp vá",
        "Đường nét chạm khắc triện sắc sảo, dứt khoát",
        "Phù hợp cho cả nam giới phong thái đạo mạo và nữ giới cá tính",
        "Bảo hành đánh bóng miễn phí định kỳ"
      ],
      care: "Tránh va chạm mạnh góc cạnh với bề mặt kim loại hoặc đá hoa cương."
    },
    {
      id: 28,
      name: "Nhẫn Nữ Ngọc Jadeite Tím Lavender Ngọt Ngào",
      slug: "nhan-nu-ngoc-jadeite-tim-lavender",
      sku: "JD-RN-007",
      category: "nhan-ngoc",
      categoryName: "Nhẫn Ngọc",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 17200000,
      originalPrice: 19500000,
      discountPercent: 12,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 26,
      stock: 3,
      color: "Tím oải hương Lavender mộng mơ",
      material: "Ngọc Jadeite tự nhiên màu Lavender Type A, vàng hồng 18K",
      sizes: ["Ni 10", "Ni 12", "Ni 14"],
      images: [
       "assets/images/product/id28.jpg"
      ],
      description: "Sắc tím oải hương tự nhiên cực kỳ hiếm thấy trong ngọc phỉ thúy, biểu tượng của sự thuỷ chung và nét duyên ngầm đằm thắm của người phụ nữ hiện đại.",
      features: [
        "Chất ngọc Lavender tự nhiên 100% không nhuộm màu",
        "Đính dải kim cương thiên nhiên tấm hai bên đai nhẫn",
        "Thiết kế ổ nhẫn vương miện lộng lẫy",
        "Giấy kiểm định quốc tế khẳng định nguồn gốc tự nhiên"
      ],
      care: "Bảo quản tránh ánh nắng mặt trời gắt chiếu trực tiếp trong thời gian dài."
    },
    {
      id: 29,
      name: "Mặt Dây Chuyền Băng Chủng Chạm Khắc Phật Di Lặc Cười",
      slug: "mat-day-chuyen-bang-chung-di-lac",
      sku: "JD-NL-004",
      category: "day-chuyen",
      categoryName: "Dây Chuyền Ngọc",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 28000000,
      originalPrice: 32000000,
      discountPercent: 12,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 51,
      stock: 3,
      color: "Băng chủng thấu quang ánh lục dịu",
      material: "Ngọc Jadeite Băng Chủng tự nhiên, móc treo vàng 18K đính kim cương",
      sizes: ["Kích thước mặt: 32mm x 28mm"],
      images: [
        "assets/images/product/id29.jpg"
      ],
      description: "Hình tượng Phật Di Lặc với nụ cười hoan hỉ xua tan mọi âu lo muộn phiền, chiếc bụng to dung chứa những điều khó dung của thiên hạ. Nước ngọc băng chủng trong suốt toát lên thần thái an lạc lạ kỳ.",
      features: [
        "Chạm khắc diện Phật từ bi, sắc nét từng nếp gấp áo và nụ cười",
        "Chất ngọc già thấu quang chiếu sáng lấp lánh",
        "Móc treo vàng 18K cao cấp đính kim cương tự nhiên",
        "Tặng kèm dây chuyền vàng 18K ý thanh mảnh cao cấp"
      ],
      care: "Nên đeo thường xuyên bên mình, lau chùi bằng nước tinh khiết."
    },
    {
      id: 30,
      name: "Dây Chuyền Ngọc Phỉ Thuý Bọc Vàng Trắng 18K Đính Sapphire",
      slug: "day-chuyen-ngoc-phi-thuy-boc-vang-sapphire",
      sku: "JD-NL-005",
      category: "day-chuyen",
      categoryName: "Dây Chuyền Ngọc",
      collection: "emerald-elegance",
      collectionName: "Emerald Elegance",
      price: 29900000,
      originalPrice: 34000000,
      discountPercent: 12,
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 23,
      stock: 2,
      color: "Xanh lục bảo phối xanh hoàng gia",
      material: "Ngọc Jadeite tự nhiên mài giọt nước, Sapphire xanh tự nhiên, Vàng trắng 18K",
      sizes: ["Dây dài 45cm có nấc chỉnh 42cm"],
      images: [
       "assets/images/product/id30.jpg"
      ],
      description: "Thiết kế cách tân kết hợp giữa ngọc phỉ thúy phương Đông và đá Sapphire hoàng gia phương Tây. Tôn vinh nét đẹp kiêu sa, quyến rũ trên thềm ngực phái đẹp.",
      features: [
        "Mặt ngọc giọt nước xanh mướt ngậm no ánh sáng",
        "Viền đá Sapphire xanh hoàng gia nhập khẩu Sri Lanka",
        "Dây chuyền vàng trắng 18K khoá tròn chắc chắn",
        "Kèm hộp lụa tơ tằm sang trọng"
      ],
      care: "Tránh để dây bị rối hoặc cọ xát với các trang sức kim loại sắc nhọn."
    },
    {
      id: 31,
      name: "Mặt Dây Chuyền Bạch Ngọc Hoà Điền Hoa Sen Cát Tường",
      slug: "mat-day-chuyen-bach-ngoc-hoa-sen",
      sku: "JD-NL-006",
      category: "day-chuyen",
      categoryName: "Dây Chuyền Ngọc",
      collection: "timeless-jade",
      collectionName: "Timeless Jade",
      price: 14500000,
      originalPrice: null,
      discountPercent: null,
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 16,
      stock: 4,
      color: "Bạch ngọc mỡ cừu điểm chút ngọc bích",
      material: "Bạch Ngọc Hoà Điền tự nhiên Tân Cương",
      sizes: ["Đường kính 30mm x dày 7mm"],
      images: [
         "assets/images/product/id31.jpg"
      ],
      description: "Bông hoa sen thanh khiết vươn lên từ bùn lầy, biểu tượng của sự tinh khôi, giác ngộ và thanh tịnh tâm hồn. Từng cánh sen được chạm nổi 3D sống động như thật.",
      features: [
        "Chất bạch ngọc Hoà Điền mịn màng, ấm áp khi chạm vào da",
        "Kỹ thuật chạm khắc lộng gió 2 mặt tinh xảo không vết dao",
        "Dây đeo vải dệt thủ công đính hạt ngọc phong thuỷ",
        "Thích hợp làm vật hộ thân mang lại cảm giác bình an"
      ],
      care: "Thỉnh thoảng lau bằng dầu dưỡng ngọc tự nhiên để ngọc luôn nhuận sắc."
    },
    {
      id: 32,
      name: "Dây Chuyền Chuỗi Hạt Ngọc Bích Tân Cương Cổ Điển",
      slug: "day-chuyen-chuoi-hat-ngoc-bich-tan-cuong",
      sku: "JD-NL-007",
      category: "day-chuyen",
      categoryName: "Dây Chuyền Ngọc",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 18500000,
      originalPrice: 21000000,
      discountPercent: 12,
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      rating: 4.8,
      reviewCount: 30,
      stock: 3,
      color: "Xanh lục đậm sâu thẳm",
      material: "Ngọc Bích Nephrite Tân Cương hạt 7.5mm mài bóng",
      sizes: ["Chiều dài chuỗi 48cm"],
      images: [
        "assets/images/product/id32.jpg"
      ],
      description: "Chuỗi ngọc bích cổ điển mang phong thái đài các của những bậc mệnh phụ phu nhân xưa. Từng hạt ngọc tròn đều tăm tắp, ánh lên sắc xanh lục trầm lắng đầy khí chất.",
      features: [
        "Hạt ngọc bích tự nhiên đồng đều màu sắc và độ phản quang",
        "Khoá cài hoa mẫu đơn bằng bạc 925 mạ vàng 18K",
        "Tôn vinh trang phục áo dài truyền thống hoặc đầm dạ hội tối giản",
        "Chứng thư giám định đá quý toàn diện"
      ],
      care: "Tháo chuỗi trước khi đi ngủ và cất trong hộp riêng biệt."
    },
    {
      id: 33,
      name: "Bông Tai Ngọc Jadeite Dáng Nụ Cài Vàng 18K Thanh Lịch",
      slug: "bong-tai-ngoc-jadeite-dang-nu-vang-18k",
      sku: "JD-ER-004",
      category: "bong-tai",
      categoryName: "Bông Tai Ngọc",
      collection: "timeless-jade",
      collectionName: "Timeless Jade",
      price: 8900000,
      originalPrice: 9900000,
      discountPercent: 10,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 44,
      stock: 6,
      color: "Xanh lục lý thấu quang",
      material: "Ngọc Jadeite tự nhiên Type A giác cabochon tròn 8mm, vàng 18K",
      sizes: ["Đường kính mặt 8.5mm"],
      images: [
        "assets/images/product/id33.jpg"
      ],
      description: "Đôi hoa tai dáng nụ cổ điển, gọn gàng và tinh tế tối đa. Điểm nhấn hoàn hảo cho phụ nữ hiện đại có thể đeo mỗi ngày mà không lo vướng víu.",
      features: [
        "Giác cắt cabochon tròn căng bóng, bắt sáng tự nhiên",
        "Chấu ôm vàng 18K thanh mảnh nhưng vô cùng chắc chắn",
        "Chốt vặn an toàn chống rơi rớt khi vận động",
        "Phù hợp với mọi dáng khuôn mặt và độ tuổi"
      ],
      care: "Vệ sinh chốt hoa tai bằng cồn y tế trước khi đeo."
    },
    {
      id: 34,
      name: "Hoa Tai Ngọc Phỉ Thuý Hồ Điệp Múa Xuân",
      slug: "hoa-tai-ngoc-phi-thuy-ho-diep",
      sku: "JD-ER-005",
      category: "bong-tai",
      categoryName: "Bông Tai Ngọc",
      collection: "natural-harmony",
      collectionName: "Natural Harmony",
      price: 11800000,
      originalPrice: 13500000,
      discountPercent: 12,
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      rating: 4.9,
      reviewCount: 20,
      stock: 4,
      color: "Xanh ngọc phỉ thuý tự nhiên",
      material: "Cánh bướm ngọc Jadeite chạm lộng, bạc Ý 925 mạ vàng trắng cao cấp",
      sizes: ["Dài 3.2cm"],
      images: [
        "assets/images/product/id34.jpg"
      ],
      description: "Hình tượng đôi cánh bướm chao lượn giữa vườn xuân, mỏng nhẹ và thanh thoát như sương mai. Mỗi nhịp bước chân là một nhịp hoa tai đung đưa e ấp.",
      features: [
        "Từng phiến ngọc cánh bướm mài mỏng thấu quang rạng rỡ",
        "Đính điểm những hạt đá zircon lấp lánh trên râu bướm",
        "Trọng lượng siêu nhẹ không gây trĩu dái tai",
        "Hộp đựng bọc nhung cao cấp có đèn led chiếu sáng"
      ],
      care: "Tránh để vật nặng đè lên phần cánh ngọc mỏng."
    },
    {
      id: 35,
      name: "Lắc Tay Băng Ngọc Phối Thạch Anh Tóc Vàng & Charm Tỳ Hưu",
      slug: "lac-tay-bang-ngoc-thach-anh-toc-vang-ty-huu",
      sku: "JD-DQ-003",
      category: "trang-suc-da-quy",
      categoryName: "Trang Sức Đá Quý",
      collection: "the-art-of-jade",
      collectionName: "The Art of Jade",
      price: 15800000,
      originalPrice: 18000000,
      discountPercent: 12,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 39,
      stock: 5,
      color: "Xanh băng trong suốt điểm ánh vàng kim",
      material: "Ngọc Jadeite Băng Chủng, Thạch Anh Tóc Vàng 5A, Charm Tỳ Hưu Vàng 24K",
      sizes: ["Cổ tay 14-17cm có móc khoá tăng đơ"],
      images: [
        "assets/images/product/id35.jpg"
      ],
      description: "Sự hoà quyện của năng lượng ngọc tự nhiên thu hút thanh khí và thạch anh tóc vàng rực rỡ chiêu tài đón lộc. Linh vật Tỳ Hưu vàng 24K trấn giữ tài sản vững bền cho gia chủ.",
      features: [
        "Hạt thạch anh tóc vàng chuẩn 5A sợi tóc dày ánh kim mạnh",
        "Tỳ Hưu đúc vàng 24K nguyên chất khắc hoa văn tỉ mỉ",
        "Hạt ngọc băng chủng làm dịu hoả khí và cân bằng âm dương",
        "Kèm túi nhung may mắn và hướng dẫn trì chú khai quang"
      ],
      care: "Tránh để người ngoài chạm vuốt vào mắt và miệng của linh vật Tỳ Hưu."
    },
    {
      id: 36,
      name: "Trâm Cài Áo Ngọc Phỉ Thuý Điểm Hồng Ngọc Ruby Thượng Đẳng",
      slug: "tram-cai-ao-ngoc-phi-thuy-ruby",
      sku: "JD-DQ-004",
      category: "trang-suc-da-quy",
      categoryName: "Trang Sức Đá Quý",
      collection: "emerald-elegance",
      collectionName: "Emerald Elegance",
      price: 22800000,
      originalPrice: 26500000,
      discountPercent: 14,
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      rating: 5.0,
      reviewCount: 25,
      stock: 2,
      color: "Xanh lục bảo điểm đỏ ruby rực rỡ",
      material: "Ngọc Jadeite Type A tự nhiên, Đá Ruby huyết bồ câu tự nhiên, Bạc mạ vàng 18K",
      sizes: ["Kích thước trâm cài 5.5cm x 3.2cm"],
      images: [
        "assets/images/product/id36.jpg"
      ],
      description: "Món phụ kiện đỉnh cao nâng tầm đẳng cấp áo vest blazer, đầm dạ hội và áo dài nhung. Cành lá ngọc phỉ thúy mướt mát nâng đỡ nụ hoa đính đá Ruby huyết bồ câu kiêu sa.",
      features: [
        "Thiết kế cành lá phong thuỷ mang ý nghĩa cành vàng lá ngọc",
        "Đá Ruby tự nhiên đỏ rực lửa tạo độ tương phản cuốn hút",
        "Kim cài chắc chắn có chốt xoay bảo vệ chống bung tuột",
        "Là món quà tặng ngoại giao và đối tác cao cấp hoàn hảo"
      ],
      care: "Cất trong hộp riêng sau khi tháo ra khỏi trang phục."
    }
],

  reviews: [
    {
      id: 1,
      author: "Nguyễn Thu Hà",
      city: "Hà Nội",
      rating: 5,
      avatar: "assets/images/avatar/1.jpg",
      productName: "Vòng Ngọc Phỉ Thuý Băng Chủng Hoàng Gia",
      content: "Nhận được vòng ngọc của JADE mà tôi thực sự ngỡ ngàng vì ở ngoài đẹp hơn trên hình gấp nhiều lần. Nước ngọc mát rượi, thấu quang rất sâu và vân tuyết tự nhiên cực kỳ sang trọng. Tư vấn viên rất am hiểu phong thuỷ và nhiệt tình hướng dẫn đo ni tay chuẩn xác."
    },
    {
      id: 2,
      author: "Trần Minh Khuê",
      city: "TP. Hồ Chí Minh",
      rating: 5,
      avatar: "assets/images/avatar/2.jpg",
      productName: "Nhẫn Ngọc Jadeite Xanh Đế Vương Bọc Vàng 18K",
      content: "Thiết kế sắc sảo từng milimet, giác cắt ngọc tròn bóng bẩy và ổ vàng bọc ôm sát rất chắc chắn. Hộp đựng và giấy chứng thư kiểm định đầy đủ khiến mình hoàn toàn yên tâm. Đây là món trang sức mình ưng ý nhất từ trước đến nay."
    },
    {
      id: 3,
      author: "Lê Ngọc Bích Lan",
      city: "Đà Nẵng",
      rating: 5,
      avatar: "assets/images/avatar/3.jpg",
      productName: "Bạch Ngọc Hoà Điền Thuần Khiết",
      content: "Chất bạch ngọc mỡ cừu ấm áp, càng đeo lâu lại càng sáng và bóng mượt. Đóng gói rất chỉn chu, có thiệp cảm ơn viết tay tinh tế. Sẽ tiếp tục ủng hộ bộ sưu tập mới của JADE."
    }
  ],

  promises: [
    {
      icon: "gem",
      title: "Tuyển Chọn Cẩn Trọng",
      desc: "100% ngọc tự nhiên nguyên bản Loại A (Type A), kiên quyết nói không với ngọc tẩm hoá chất hoặc nhân tạo."
    },
    {
      icon: "award",
      title: "Nghệ Thuật Chế Tác",
      desc: "Nghệ nhân kim hoàn hơn 20 năm kinh nghiệm mài dũa thủ công từng giác cắt để tôn vinh sắc thái riêng biệt của từng phiến ngọc."
    },
    {
      icon: "heart-handshake",
      title: "Tư Vấn Tận Tâm",
      desc: "Đội ngũ chuyên viên tư vấn ni tay, bản mệnh phong thuỷ và phối trang phục chuyên nghiệp 24/7."
    },
    {
      icon: "shield-check",
      title: "Bảo Hành Trọn Đời",
      desc: "Cam kết kiểm định độc lập, làm bóng miễn phí trọn đời và hỗ trợ thu đổi minh bạch theo biểu phí rõ ràng."
    }
  ],

  /* ========================================================================
     HỆ THỐNG CỬA HÀNG & SHOWROOM JADE TRÊN TOÀN QUỐC (TÍCH HỢP GOOGLE MAPS)
     ======================================================================== */
  stores: [
    {
      id: "hn-trangtien",
      name: "JADE Flagship Tràng Tiền Plaza",
      badge: "Flagship Boutique",
      city: "hanoi",
      cityName: "Hà Nội",
      address: "Tầng 2, TTTM Tràng Tiền Plaza, 24 Hai Bà Trưng, Phường Tràng Tiền, Quận Hoàn Kiếm, Hà Nội",
      phone: "0988 888 888",
      tel: "0988888888",
      landline: "024 3936 8888",
      hours: "09:30 - 21:30 (Tất cả các ngày trong tuần)",
      services: [
        "Phòng VIP tiếp đón riêng tư",
        "Giám định đá quý tại chỗ bằng máy khúc xạ quang học",
        "Khắc tên & chỉnh ni tay siêu tốc",
        "Thưởng thức trà đạo ngọc bích"
      ],
      mapQuery: "Tràng Tiền Plaza, 24 Hai Bà Trưng, Hoàn Kiếm, Hà Nội",
      mapEmbedUrl: "https://maps.google.com/maps?q=Tr%C3%A0ng+Ti%E1%BB%81n+Plaza,+24+Hai+B%C3%A0+Tr%C6%B0ng,+Ho%C3%A0n+Ki%E1%BA%BFm,+H%C3%A0+N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Tr%C3%A0ng+Ti%E1%BB%81n+Plaza,+24+Hai+B%C3%A0+Tr%C6%B0ng,+Ho%C3%A0n+Ki%E1%BA%BFm,+H%C3%A0+N%E1%BB%99i"
    },
    {
      id: "hn-batrieu",
      name: "JADE Vincom Center Bà Triệu",
      badge: "Showroom",
      city: "hanoi",
      cityName: "Hà Nội",
      address: "Tầng 1, Vincom Center Bà Triệu, 191 Bà Triệu, Phường Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội",
      phone: "024 3974 6688",
      tel: "02439746688",
      landline: "024 3974 6688",
      hours: "09:30 - 22:00 (Tất cả các ngày trong tuần)",
      services: [
        "Tư vấn màu ngọc hợp bản mệnh ngũ hành",
        "Dịch vụ bảo dưỡng & đánh bóng ngọc trọn đời",
        "Bộ sưu tập vòng bản ngọc cẩm thạch mới nhất"
      ],
      mapQuery: "Vincom Bà Triệu, 191 Bà Triệu, Hai Bà Trưng, Hà Nội",
      mapEmbedUrl: "https://maps.google.com/maps?q=Vincom+Center+B%C3%A0+Tri%E1%BB%87u,+191+B%C3%A0+Tri%E1%BB%87u,+Hai+B%C3%A0+Tr%C6%B0ng,+H%C3%A0+N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vincom+Center+B%C3%A0+Tri%E1%BB%87u,+191+B%C3%A0+Tri%E1%BB%87u,+Hai+B%C3%A0+Tr%C6%B0ng,+H%C3%A0+N%E1%BB%99i"
    },
    {
      id: "hn-caugiay",
      name: "JADE Boutique Cầu Giấy",
      badge: "Showroom",
      city: "hanoi",
      cityName: "Hà Nội",
      address: "268 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội",
      phone: "024 3833 9999",
      tel: "02438339999",
      landline: "024 3833 9999",
      hours: "09:00 - 21:30 (Tất cả các ngày trong tuần)",
      services: [
        "Không gian trưng bày vòng hạt & nhẫn ngọc phong thủy",
        "Hỗ trợ đo ni tay và đổi size trong 48h",
        "Bãi đỗ ô tô miễn phí thuận tiện"
      ],
      mapQuery: "268 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội",
      mapEmbedUrl: "https://maps.google.com/maps?q=268+C%E1%BA%A7u+Gi%E1%BA%A5y,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=268+C%E1%BA%A7u+Gi%E1%BA%A5y,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i"
    },
    {
      id: "hcm-dongkhoi",
      name: "JADE Flagship Đồng Khởi",
      badge: "Flagship Boutique",
      city: "hcm",
      cityName: "TP. Hồ Chí Minh",
      address: "68 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      phone: "0908 666 999",
      tel: "0908666999",
      landline: "028 3822 8888",
      hours: "09:00 - 22:00 (Tất cả các ngày trong tuần)",
      services: [
        "Salon VIP thưởng lãm kiệt tác ngọc phỉ thúy",
        "Chuyên gia giám định tư vấn ngọc học 1-1",
        "Thiết kế trang sức ngọc bọc vàng độc bản",
        "Đón tiếp trà hoa thượng hạng"
      ],
      mapQuery: "68 Đồng Khởi, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      mapEmbedUrl: "https://maps.google.com/maps?q=68+%C4%90%E1%BB%93ng+Kh%E1%BB%9Fi,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=68+%C4%90%E1%BB%93ng+Kh%E1%BB%9Fi,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh"
    },
    {
      id: "hcm-diamond",
      name: "JADE Diamond Plaza",
      badge: "Showroom",
      city: "hcm",
      cityName: "TP. Hồ Chí Minh",
      address: "Tầng 2, Diamond Plaza, 34 Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      phone: "028 3825 7799",
      tel: "02838257799",
      landline: "028 3825 7799",
      hours: "09:30 - 21:30 (Tất cả các ngày trong tuần)",
      services: [
        "Khu trưng bày bộ sưu tập ngọc cao cấp & mặt dây chuyền",
        "Làm sạch siêu âm đá quý miễn phí",
        "Thanh toán quốc tế đa dạng (Visa, Master, JCB, Amex)"
      ],
      mapQuery: "Diamond Plaza, 34 Lê Duẩn, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      mapEmbedUrl: "https://maps.google.com/maps?q=Diamond+Plaza,+34+L%C3%AA+Du%E1%BA%A9n,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Diamond+Plaza,+34+L%C3%AA+Du%E1%BA%A9n,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+H%E1%BB%93+Ch%C3%AD+Minh"
    },
    {
      id: "hcm-crescent",
      name: "JADE Crescent Mall Phú Mỹ Hưng",
      badge: "Showroom",
      city: "hcm",
      cityName: "TP. Hồ Chí Minh",
      address: "Tầng 2, TTTM Crescent Mall, 101 Tôn Dật Tiên, Phường Tân Phú, Quận 7, TP. Hồ Chí Minh",
      phone: "028 5413 8866",
      tel: "02854138866",
      landline: "028 5413 8866",
      hours: "10:00 - 22:00 (Tất cả các ngày trong tuần)",
      services: [
        "Không gian mua sắm sang trọng cho cư dân Nam Sài Gòn",
        "Tư vấn chọn quà tặng ngọc quý cho đối tác",
        "Đóng gói hộp quà cao cấp chuẩn phong cách hoàng gia"
      ],
      mapQuery: "Crescent Mall, 101 Tôn Dật Tiên, Tân Phú, Quận 7, TP. Hồ Chí Minh",
      mapEmbedUrl: "https://maps.google.com/maps?q=Crescent+Mall,+101+T%C3%B4n+D%E1%BA%ADt+Ti%C3%AAn,+T%C3%A2n+Ph%C3%BA,+Qu%E1%BA%ADn+7,+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Crescent+Mall,+101+T%C3%B4n+D%E1%BA%ADt+Ti%C3%AAn,+T%C3%A2n+Ph%C3%BA,+Qu%E1%BA%ADn+7,+H%E1%BB%93+Ch%C3%AD+Minh"
    },
    {
      id: "dn-vincom",
      name: "JADE Vincom Plaza Ngô Quyền",
      badge: "Showroom",
      city: "danang",
      cityName: "Đà Nẵng",
      address: "Tầng 1, Vincom Plaza Ngô Quyền, 910A Ngô Quyền, Phường An Hải Bắc, Quận Sơn Trà, TP. Đà Nẵng",
      phone: "0236 399 6868",
      tel: "02363996868",
      landline: "0236 399 6868",
      hours: "09:30 - 22:00 (Tất cả các ngày trong tuần)",
      services: [
        "Phục vụ du khách trong nước & quốc tế ghé thăm Đà Nẵng",
        "Giao hàng hoả tốc tận khách sạn / resort trong 1h",
        "Cung cấp đầy đủ giấy kiểm định song ngữ Việt - Anh"
      ],
      mapQuery: "Vincom Plaza Ngô Quyền Đà Nẵng, 910A Ngô Quyền, Sơn Trà, Đà Nẵng",
      mapEmbedUrl: "https://maps.google.com/maps?q=Vincom+Plaza+Ng%C3%B4+Quy%E1%BB%81n,+910A+Ng%C3%B4+Quy%E1%BB%81n,+S%C6%A1n+Tr%C3%A0,+%C4%90%C3%A0+N%E1%BA%B5ng&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vincom+Plaza+Ng%C3%B4+Quy%E1%BB%81n,+910A+Ng%C3%B4+Quy%E1%BB%81n,+S%C6%A1n+Tr%C3%A0,+%C4%90%C3%A0+N%E1%BA%B5ng"
    },
    {
      id: "hp-imperia",
      name: "JADE Vincom Imperia Hải Phòng",
      badge: "Showroom",
      city: "haiphong",
      cityName: "Hải Phòng",
      address: "Tầng 1, Vincom Imperia Hải Phòng, Số 1 Đường Bạch Đằng, Phường Thượng Lý, Quận Hồng Bàng, TP. Hải Phòng",
      phone: "0225 388 9988",
      tel: "02253889988",
      landline: "0225 388 9988",
      hours: "09:30 - 21:30 (Tất cả các ngày trong tuần)",
      services: [
        "Tư vấn phong thủy ngọc tự nhiên cho giới doanh nhân",
        "Bảo hành & làm sạch ngọc định kỳ miễn phí",
        "Trưng bày đầy đủ các tạo tác ngọc phong thủy để bàn & đeo tay"
      ],
      mapQuery: "Vincom Imperia Hải Phòng, Số 1 Bạch Đằng, Hồng Bàng, Hải Phòng",
      mapEmbedUrl: "https://maps.google.com/maps?q=Vincom+Imperia+H%E1%BA%A3i+Ph%C3%B2ng,+B%E1%BA%A1ch+%C4%90%E1%BA%B1ng,+H%E1%BB%93ng+B%C3%A0ng,+H%E1%BA%A3i+Ph%C3%B2ng&t=&z=16&ie=UTF8&iwloc=&output=embed",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vincom+Imperia+H%E1%BA%A3i+Ph%C3%B2ng,+B%E1%BA%A1ch+%C4%90%E1%BA%B1ng,+H%E1%BB%93ng+B%C3%A0ng,+H%E1%BA%A3i+Ph%C3%B2ng"
    }
  ]
};

// Utilities for formatting currency and queries
function formatPrice(amount) {
  if (!amount && amount !== 0) return '';
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'đ');
}

function getProductById(id) {
  return JADE_DATA.products.find(p => p.id === parseInt(id, 10));
}

function getProductsByCategory(catSlug) {
  if (!catSlug || catSlug === 'all') return JADE_DATA.products;
  return JADE_DATA.products.filter(p => p.category === catSlug);
}

function getProductsByCollection(colSlug) {
  if (!colSlug) return JADE_DATA.products;
  return JADE_DATA.products.filter(p => p.collection === colSlug);
}

function getAllStores() {
  return JADE_DATA.stores || [];
}

function getStoresByCity(city) {
  if (!city || city === 'all') return JADE_DATA.stores || [];
  return (JADE_DATA.stores || []).filter(s => s.city === city);
}

function getStoreById(id) {
  return (JADE_DATA.stores || []).find(s => s.id === id);
}

// Universal helper: Tự động chuẩn hoá đường dẫn ảnh sản phẩm dù ở trang chủ hay các trang trong /pages/
function resolveProductImg(url) {
  if (!url) return '';
  // Tự động sửa lỗi nếu gõ thiếu 's' thành 'asset/'
  if (url.startsWith('asset/')) {
    url = 'assets/' + url.substring(6);
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const isInPages = (typeof window !== 'undefined') && (
    window.location.pathname.includes('/pages/') || 
    window.location.href.includes('/pages/')
  );
  if (isInPages) {
    if (url.startsWith('assets/')) return '../' + url;
  } else {
    if (url.startsWith('../assets/')) return url.substring(3);
  }
  return url;
}

// Global alias for convenient access and modification
if (typeof window !== 'undefined') {
  window.resolveProductImg = resolveProductImg;
  window.JADE_DATA = JADE_DATA;
  window.JADE_IMAGES = JADE_DATA.images;
  window.getAllStores = getAllStores;
  window.getStoresByCity = getStoresByCity;
  window.getStoreById = getStoreById;
}

/* ==========================================================================
   VIETNAMESE NORMALIZATION & FUZZY SEARCH UTILITIES
   ========================================================================== */
function removeVietnameseTones(str) {
  if (!str) return '';
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return str.trim();
}

function damerauLevenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const d = [];
  const la = a.length;
  const lb = b.length;

  for (let i = 0; i <= la; i++) {
    d[i] = [];
    d[i][0] = i;
  }
  for (let j = 0; j <= lb; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= la; i++) {
    for (let j = 1; j <= lb; j++) {
      const cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );

      if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[la][lb];
}

const SEARCH_SYNONYMS = {
  'vong': ['vong', 'lac', 'chuoi', 'bangle', 'bracelet'],
  'nhan': ['nhan', 'ring', 'cabochon'],
  'day': ['day', 'chuyen', 'mat', 'pendant', 'necklace'],
  'bong': ['bong', 'tai', 'hoa', 'khuyen', 'earring', 'earrings'],
  'hoa': ['bong', 'tai', 'hoa', 'khuyen', 'earring'],
  'ngoc': ['ngoc', 'jade', 'jadeite', 'cam thach', 'phi thuy', 'nephrite'],
  'cam': ['cam thach', 'phi thuy', 'jadeite', 'jade'],
  'thach': ['cam thach', 'phi thuy', 'jadeite'],
  'phi': ['phi thuy', 'cam thach', 'jadeite'],
  'thuy': ['phi thuy', 'cam thach', 'jadeite'],
  'bach': ['bach ngoc', 'trang', 'sua', 'mo cuu'],
  'trang': ['bach ngoc', 'trang', 'sua'],
  'xanh': ['xanh', 'luc', 'reu', 'emerald', 'imperial'],
  'luc': ['xanh', 'luc', 'reu', 'emerald'],
  'do': ['do', 'huyet', 'ruby'],
  'huyet': ['huyet', 'do', 'cam', 'vang'],
  'vang': ['vang', '18k', '24k', 'gold', 'thach anh toc']
};

function calculateProductMatchScore(product, query) {
  if (!query || !query.trim()) return { score: 100, isExactOrSubMatch: true, hasFuzzy: false };

  const rawQ = query.trim().toLowerCase();
  const cleanQ = removeVietnameseTones(rawQ);
  const qWords = cleanQ.split(/[\s,.-]+/).filter(w => w.length > 0);

  if (qWords.length === 0) return { score: 100, isExactOrSubMatch: true, hasFuzzy: false };

  const pName = (product.name || '').toLowerCase();
  const pCleanName = removeVietnameseTones(pName);
  const pCategory = (product.categoryName || '').toLowerCase();
  const pCleanCategory = removeVietnameseTones(pCategory);
  const pCollection = (product.collectionName || '').toLowerCase();
  const pCleanCollection = removeVietnameseTones(pCollection);
  const pSku = (product.sku || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const pColor = (product.color || '').toLowerCase();
  const pCleanColor = removeVietnameseTones(pColor);
  const pMaterial = (product.material || '').toLowerCase();
  const pCleanMaterial = removeVietnameseTones(pMaterial);
  const pDesc = (product.description || '').toLowerCase();
  const pCleanDesc = removeVietnameseTones(pDesc);

  const cleanAllText = `${pCleanName} ${pCleanCategory} ${pCleanCollection} ${pCleanColor} ${pCleanMaterial} ${pCleanDesc}`;
  const targetWords = cleanAllText.split(/[\s,.-]+/).filter(w => w.length > 0);

  let score = 0;
  let isExactOrSubMatch = false;

  // 1. Khớp cụm từ
  if (pName.includes(rawQ) || pCleanName.includes(cleanQ)) {
    score += 160;
    isExactOrSubMatch = true;
  } else if (cleanAllText.includes(cleanQ)) {
    score += 90;
    isExactOrSubMatch = true;
  }

  // Khớp mã sản phẩm
  const cleanQNoSep = cleanQ.replace(/[^a-z0-9]/g, '');
  if (cleanQNoSep && pSku.includes(cleanQNoSep)) {
    score += 200;
    isExactOrSubMatch = true;
  }

  // 2. Phân tích từng từ
  let matchedWordCount = 0;
  let fuzzyMatchesFound = 0;

  qWords.forEach(qWord => {
    let wordMatched = false;

    if (cleanAllText.includes(qWord)) {
      score += 35;
      wordMatched = true;
    } else {
      const synonyms = SEARCH_SYNONYMS[qWord] || [];
      for (const syn of synonyms) {
        if (cleanAllText.includes(syn)) {
          score += 25;
          wordMatched = true;
          break;
        }
      }

      if (!wordMatched && qWord.length >= 3) {
        let bestDist = 99;
        for (const tWord of targetWords) {
          if (tWord.length < 3) continue;
          if (Math.abs(tWord.length - qWord.length) > 2) continue;
          const dist = damerauLevenshtein(qWord, tWord);
          if (dist < bestDist) bestDist = dist;
        }

        const maxAllowedDist = qWord.length <= 4 ? 1 : 2;
        if (bestDist <= maxAllowedDist) {
          score += Math.max(10, 25 - bestDist * 8);
          wordMatched = true;
          fuzzyMatchesFound++;
        }
      }
    }

    if (wordMatched) matchedWordCount++;
  });

  if (qWords.length > 1) {
    if (matchedWordCount === qWords.length) {
      score += 40;
    } else if (matchedWordCount === 0) {
      return { score: 0, isExactOrSubMatch: false, hasFuzzy: false };
    }
  } else {
    if (matchedWordCount === 0 && score === 0) {
      return { score: 0, isExactOrSubMatch: false, hasFuzzy: false };
    }
  }

  return {
    score,
    isExactOrSubMatch,
    hasFuzzy: fuzzyMatchesFound > 0
  };
}

if (typeof window !== 'undefined') {
  window.removeVietnameseTones = removeVietnameseTones;
  window.damerauLevenshtein = damerauLevenshtein;
  window.SEARCH_SYNONYMS = SEARCH_SYNONYMS;
  window.calculateProductMatchScore = calculateProductMatchScore;
}

