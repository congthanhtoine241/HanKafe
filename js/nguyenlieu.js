// Khai báo nguyên liệu gốc
const KHO_MAC_DINH = [
    { id: 'nl_cf', name: 'Cốt Cà phê', stock: 20000, unit: 'ml' },
    { id: 'nl_matcha_dai', name: 'Matcha Đài', stock: 5000, unit: 'g' },
    { id: 'nl_matcha_mk4', name: 'Matcha MK4', stock: 5000, unit: 'g' },
    { id: 'nl_cacao', name: 'Bột Cacao', stock: 5000, unit: 'g' },
    { id: 'nl_khoaimon', name: 'Bột Khoai môn', stock: 5000, unit: 'g' },
    { id: 'nl_suadac', name: 'Sữa Đặc', stock: 20000, unit: 'ml' },
    { id: 'nl_sua_mlekovita', name: 'Sữa Mlekovita', stock: 20000, unit: 'ml' },
    { id: 'nl_sua_oatside', name: 'Sữa Oatside', stock: 20000, unit: 'ml' },
    { id: 'nl_rich', name: 'Rich Lùn', stock: 10000, unit: 'ml' },
    { id: 'nl_duong', name: 'Đường', stock: 20000, unit: 'ml' },
    { id: 'nl_kemmuoi', name: 'Kem Muối', stock: 5000, unit: 'ml' },
    { id: 'nl_kemdeo', name: 'Kem Dẻo', stock: 500, unit: 'ml' },
    { id: 'nl_suongsao', name: 'Sương sáo', stock: 500, unit: 'g' },
    { id: 'nl_ly_m', name: 'Ly M', stock: 100, unit: 'cái' },
    { id: 'nl_ly_l', name: 'Ly L', stock: 100, unit: 'cái' },
    { id: 'nl_tc_den', name: 'Trân châu đen', stock: 5000, unit: 'g' },
    { id: 'nl_tc_3q', name: 'Trân châu 3Q', stock: 5000, unit: 'g' },
    { id: 'nl_cunang', name: 'Thạch củ năng', stock: 5000, unit: 'g' },
    { id: 'nl_daomieng', name: 'Đào miếng', stock: 500, unit: 'miếng' },
    { id: 'nl_vaimieng', name: 'Vải Miếng', stock: 500, unit: 'miếng' },
    { id: 'nl_thachcf', name: 'Thạch cà phê', stock: 5000, unit: 'g' },
    { id: 'nl_trasua', name: 'Cốt Trà Sữa', stock: 10000, unit: 'ml' },
    { id: 'nl_tralai', name: 'Cốt Trà Lài', stock: 10000, unit: 'ml' },
    { id: 'nl_tradao', name: 'Cốt Trà Đào', stock: 10000, unit: 'ml' },
    { id: 'nl_thaixanh', name: 'Cốt Trà Xanh', stock: 10000, unit: 'ml' },
    { id: 'nl_traden', name: 'Cốt Trà Đen', stock: 10000, unit: 'ml' },
    { id: 'nl_dau', name: 'Mứt Dâu', stock: 1000, unit: 'ml' },
    { id: 'nl_syrupdao', name: 'Syrup Đào', stock: 1000, unit: 'ml' },
    { id: 'nl_chunkyvai', name: 'ChunKy Vải', stock: 1000, unit: 'ml' },
    { id: 'nl_syrupvai', name: 'Syrup Vải', stock: 1000, unit: 'ml' },
    { id: 'nl_caramel', name: 'Sốt Caramel', stock: 1000, unit: 'ml' },
    { id: 'nl_sirohn', name: 'Siro Hạnh Nhân', stock: 1000, unit: 'ml' },
    { id: 'nl_oreo', name: 'Bánh Oreo', stock: 100, unit: 'cái' },
    { id: 'nl_sirobh', name: 'Siro Bạc Hà', stock: 1000, unit: 'ml' },
    { id: 'nl_tac', name: 'Tắc', stock: 1000, unit: 'trái' },
    { id: 'nl_nuoc_cam', name: 'Nước Cam', stock: 1000, unit: 'ml' },
    { id: 'nl_nuoc_am', name: 'Nước Ấm', stock: 100000, unit: 'ml' },
    { id: 'nl_nuoc_dua', name: 'Nước Dừa', stock: 1000, unit: 'ml' },
];

// Khai báo Addons
const ADDONS = {
    sua: {
        mac_dinh: { id: 'nl_sua_mlekovita', name: 'Sữa Mlekovita', price: 0 },
        doi_sua: { id: 'nl_sua_oatside', name: 'Sữa Oatside', price: 5000 }
    },
    matcha: {
        mac_dinh: { id: 'nl_matcha_dai', name: 'Matcha Đài', price: 0 },
        doi_matcha: { id: 'nl_matcha_mk4', name: 'Matcha MK4', price: 10000 }
    },
    topping: [
        { id: 'nl_tc_den', name: 'Trân châu đen', price: 5000, qty: 30 },
        { id: 'nl_tc_3q', name: 'Trân châu 3Q', price: 5000, qty: 30 },
        { id: 'nl_cunang', name: 'Thạch củ năng', price: 5000, qty: 30 },
        { id: 'nl_suongsao', name: 'Sương sáo', price: 5000, qty: 30 },
        { id: 'nl_kemmuoi', name: 'Kem muối', price: 5000, qty: 30 },
        { id: 'nl_kemdeo', name: 'Kem dẻo', price: 5000, qty: 30 }
    ]
};
