// Khai báo Menu 24 món
const MENU = [
    // --- NHÓM CÀ PHÊ ---
    {
        id: 'cf_da', name: 'Cà phê đá', category: 'Cà phê', icon: '☕',
        price: { M: 15000, L: 20000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cf: 90, nl_duong: 30, nl_ly_m: 1 },
            L: { nl_cf: 120, nl_duong: 40, nl_ly_l: 1 }
        }
    },
    {
        id: 'cf_sua', name: 'Cà phê sữa', category: 'Cà phê', icon: '☕',
        price: { M: 18000, L: 23000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cf: 50, nl_suadac: 20, nl_ly_m: 1 },
            L: { nl_cf: 90, nl_suadac: 35, nl_ly_l: 1 }
        }
    },
    {
        id: 'bac_xiu', name: 'Bạc xỉu', category: 'Cà phê', icon: '☕',
        price: { M: 18000, L: 23000 },
        hasAddonSua: true, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cf: 40, nl_suadac: 30, nl_sua_mlekovita: 50, nl_rich: 10, nl_ly_m: 1 },
            L: { nl_cf: 60, nl_suadac: 40, nl_sua_mlekovita: 80, nl_rich: 20, nl_ly_l: 1 }
        }
    },
    {
        id: 'st_cf', name: 'Sữa tươi cà phê', category: 'Cà phê', icon: '🥛',
        price: { M: 20000, L: 25000 },
        hasAddonSua: true, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cf: 45, nl_sua_mlekovita: 100, nl_duong: 25, nl_rich: 10, nl_ly_m: 1 },
            L: { nl_cf: 60, nl_sua_mlekovita: 150, nl_duong: 40, nl_rich: 15, nl_ly_l: 1 }
        }
    },
    {
        id: 'cf_muoi', name: 'Cà phê muối', category: 'Cà phê', icon: '🧂',
        price: { M: 22000, L: 27000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cf: 50, nl_suadac: 20, nl_kemmuoi: 45, nl_ly_m: 1 },
            L: { nl_cf: 90, nl_suadac: 35, nl_kemmuoi: 60, nl_ly_l: 1 }
        }
    },
    {
        id: 'cf_kemdeo', name: 'Cà phê kem dẻo', category: 'Cà phê', icon: '🍦',
        price: { M: 22000, L: 27000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cf: 50, nl_suadac: 20, nl_kemdeo: 45, nl_ly_m: 1 },
            L: { nl_cf: 90, nl_suadac: 35, nl_kemdeo: 60, nl_ly_l: 1 }
        }
    },
    {
        id: 'phindi_hn', name: 'Phindi hạnh nhân', category: 'Cà phê', icon: '🌰',
        price: { M: 25000, L: 30000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cf: 45, nl_sirohn: 20, nl_duong: 20, nl_rich: 20, nl_sua_oatside: 100, nl_thachcf: 30, nl_ly_m: 1 },
            L: { nl_cf: 60, nl_sirohn: 30, nl_duong: 30, nl_rich: 20, nl_sua_oatside: 130, nl_thachcf: 30, nl_ly_l: 1 }
        }
    },

    // --- NHÓM CACAO ---
    {
        id: 'cacao_latte', name: 'Cacao Latte', category: 'Cacao', icon: '🍫',
        price: { M: 20000, L: 25000 },
        hasAddonSua: true, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cacao: 8, nl_sua_mlekovita: 100, nl_rich: 10, nl_nuoc_am: 40, nl_ly_m: 1 },
            L: { nl_cacao: 10, nl_sua_mlekovita: 150, nl_rich: 15, nl_nuoc_am: 50, nl_ly_l: 1 }
        }
    },
    {
        id: 'cacao_mint', name: 'Cacao Mint', category: 'Cacao', icon: '🌿',
        price: { M: 22000, L: 27000 },
        hasAddonSua: true, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cacao: 10, nl_sua_mlekovita: 120, nl_suadac: 10, nl_rich: 20, nl_nuoc_am: 50, nl_sirobh: 20, nl_ly_m: 1 },
            L: { nl_cacao: 15, nl_sua_mlekovita: 170, nl_suadac: 15, nl_rich: 30, nl_nuoc_am: 70, nl_sirobh: 30, nl_ly_l: 1 }
        }
    },
    {
        id: 'cacao_khoaimon', name: 'Cacao Khoai Môn', category: 'Cacao', icon: '🍠',
        price: { M: 25000, L: 30000 },
        hasAddonSua: true, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cacao: 8, nl_khoaimon: 15, nl_sua_mlekovita: 40, nl_suadac: 20, nl_nuoc_am: 80, nl_ly_m: 1 },
            L: { nl_cacao: 10, nl_khoaimon: 20, nl_sua_mlekovita: 100, nl_suadac: 30, nl_nuoc_am: 100, nl_ly_l: 1 }
        }
    },
    {
        id: 'cacao_kemmuoi', name: 'Cacao Kem Muối', category: 'Cacao', icon: '🧂',
        price: { M: 25000, L: 30000 },
        hasAddonSua: true, hasAddonMatcha: false,
        congThuc: {
            M: { nl_cacao: 8, nl_sua_mlekovita: 100, nl_rich: 10, nl_nuoc_am: 40, nl_kemmuoi: 30, nl_ly_m: 1 },
            L: { nl_cacao: 10, nl_sua_mlekovita: 150, nl_rich: 15, nl_nuoc_am: 50, nl_kemmuoi: 40, nl_ly_l: 1 }
        }
    },

    // --- NHÓM MATCHA ---
    {
        id: 'matcha_latte', name: 'Matcha Latte', category: 'Matcha', icon: '🍵',
        price: { M: 20000, L: 25000 },
        hasAddonSua: true, hasAddonMatcha: true,
        congThuc: {
            M: { nl_matcha_dai: 4, nl_nuoc_am: 40, nl_sua_mlekovita: 100, nl_duong: 15, nl_rich: 10, nl_suadac: 10, nl_ly_m: 1 },
            L: { nl_matcha_dai: 6, nl_nuoc_am: 60, nl_sua_mlekovita: 150, nl_duong: 40, nl_rich: 15, nl_suadac: 15, nl_ly_l: 1 }
        }
    },
    {
        id: 'matcha_dau', name: 'Matcha Dâu', category: 'Matcha', icon: '🍓',
        price: { M: 25000, L: 30000 },
        hasAddonSua: true, hasAddonMatcha: true,
        congThuc: {
            M: { nl_matcha_dai: 4, nl_nuoc_am: 40, nl_sua_mlekovita: 100, nl_dau: 30, nl_rich: 10, nl_suadac: 30, nl_ly_m: 1 },
            L: { nl_matcha_dai: 6, nl_nuoc_am: 60, nl_sua_mlekovita: 150, nl_dau: 40, nl_rich: 15, nl_duong: 40, nl_ly_l: 1 }
        }
    },
    {
        id: 'matcha_khoaimon', name: 'Matcha Khoai Môn', category: 'Matcha', icon: '🍠',
        price: { M: 25000, L: 30000 },
        hasAddonSua: true, hasAddonMatcha: true,
        congThuc: {
            M: { nl_matcha_dai: 3, nl_khoaimon: 15, nl_sua_mlekovita: 40, nl_suadac: 20, nl_nuoc_am: 70, nl_ly_m: 1 },
            L: { nl_matcha_dai: 5, nl_khoaimon: 20, nl_sua_mlekovita: 100, nl_suadac: 30, nl_nuoc_am: 100, nl_ly_l: 1 }
        }
    },
    {
        id: 'matcha_oreo', name: 'Matcha Oreo', category: 'Matcha', icon: '🍪',
        price: { M: 28000, L: 33000 },
        hasAddonSua: true, hasAddonMatcha: true,
        congThuc: {
            M: { nl_matcha_dai: 4, nl_nuoc_am: 50, nl_sua_mlekovita: 100, nl_rich: 10, nl_suadac: 30, nl_kemmuoi: 30, nl_ly_m: 1 },
            L: { nl_matcha_dai: 6, nl_nuoc_am: 70, nl_sua_mlekovita: 150, nl_rich: 15, nl_suadac: 40, nl_kemmuoi: 40, nl_ly_l: 1 }
        }
    },
    {
        id: 'matcha_caramel', name: 'Matcha Caramel', category: 'Matcha', icon: '🍮',
        price: { M: 28000, L: 33000 },
        hasAddonSua: true, hasAddonMatcha: true,
        congThuc: {
            M: { nl_matcha_dai: 4, nl_nuoc_am: 40, nl_sua_mlekovita: 120, nl_duong: 15, nl_rich: 10, nl_caramel: 25, nl_ly_m: 1 },
            L: { nl_matcha_dai: 6, nl_nuoc_am: 60, nl_sua_mlekovita: 170, nl_duong: 40, nl_rich: 15, nl_caramel: 35, nl_ly_l: 1 }
        }
    },
    {
        id: 'matcha_coldwhisk', name: 'Matcha Cold-Whisk', category: 'Matcha', icon: '🌪️',
        price: { M: 28000, L: 33000 },
        hasAddonSua: true, hasAddonMatcha: true,
        congThuc: {
            M: { nl_matcha_dai: 5, nl_sua_mlekovita: 150, nl_duong: 20, nl_rich: 20, nl_ly_m: 1 },
            L: { nl_matcha_dai: 7, nl_sua_mlekovita: 210, nl_duong: 30, nl_rich: 30, nl_ly_l: 1 }
        }
    },
    {
        id: 'coco_matcha', name: 'Coco-Cream Matcha', category: 'Matcha', icon: '🥥',
        price: { M: 30000, L: 35000 },
        hasAddonSua: true, hasAddonMatcha: true,
        congThuc: {
            M: { nl_matcha_dai: 3, nl_nuoc_dua: 140, nl_sua_mlekovita: 20, nl_rich: 30, nl_suadac: 30, nl_ly_m: 1 },
            L: { nl_matcha_dai: 5, nl_nuoc_dua: 200, nl_sua_mlekovita: 30, nl_rich: 45, nl_suadac: 45, nl_ly_l: 1 }
        }
    },

    // --- NHÓM KHOAI MÔN ---
    {
        id: 'km_latte', name: 'Khoai Môn Latte', category: 'Khoai môn', icon: '🍠',
        price: { M: 20000, L: 25000 },
        hasAddonSua: true, hasAddonMatcha: false,
        congThuc: {
            M: { nl_khoaimon: 15, nl_sua_mlekovita: 110, nl_suadac: 22, nl_nuoc_am: 35, nl_ly_m: 1 },
            L: { nl_khoaimon: 20, nl_sua_mlekovita: 150, nl_suadac: 40, nl_nuoc_am: 50, nl_ly_l: 1 }
        }
    },
    {
        id: 'km_kemmuoi', name: 'Khoai Môn Kem Muối', category: 'Khoai môn', icon: '🧂',
        price: { M: 25000, L: 30000 },
        hasAddonSua: true, hasAddonMatcha: false,
        congThuc: {
            M: { nl_khoaimon: 15, nl_sua_mlekovita: 110, nl_suadac: 22, nl_nuoc_am: 35, nl_kemmuoi: 30, nl_ly_m: 1 },
            L: { nl_khoaimon: 20, nl_sua_mlekovita: 150, nl_suadac: 40, nl_nuoc_am: 50, nl_kemmuoi: 40, nl_ly_l: 1 }
        }
    },

    // --- TRÀ SỮA (Chỉ size L) ---
    {
        id: 'ts_han', name: 'Trà sữa Han', category: 'Trà sữa', icon: '🧋',
        price: { M: 20000, L: 25000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            M: { nl_trasua: 200, nl_tc_den: 30, nl_ly_m: 1 },
            L: { nl_trasua: 300, nl_tc_den: 60, nl_ly_l: 1 }
        }
    },

    // --- TEA (Chỉ size L) ---
    {
        id: 'tra_tac_sui', name: 'Hồng trà tắc sủi bọt', category: 'Tea', icon: '🍹',
        price: { L: 18000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            L: { nl_traden: 210, nl_duong: 50, nl_tac: 2, nl_tc_den: 60, nl_ly_l: 1 }
        }
    },
    {
        id: 'tra_tac_thai', name: 'Trà Tắc Thái Xanh', category: 'Tea', icon: '🍋',
        price: { L: 18000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            L: { nl_thaixanh: 150, nl_duong: 35, nl_tac: 2, nl_tc_den: 30, nl_ly_l: 1 }
        }
    },
    {
        id: 'tra_xao_cam', name: 'Trà Sào Cam Đả', category: 'Tea', icon: '🍊',
        price: { L: 25000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            L: { nl_tradao: 200, nl_nuoc_cam: 40, nl_syrupdao: 40, nl_duong: 20, nl_tac: 1, nl_daomieng: 3, nl_tc_3q: 30, nl_ly_l: 1 }
        }
    },
    {
        id: 'tra_vai_hoa', name: 'Trà Vải Hoa Hằm', category: 'Tea', icon: '🌺',
        price: { L: 28000 },
        hasAddonSua: false, hasAddonMatcha: false,
        congThuc: {
            L: { nl_tralai: 150, nl_chunkyvai: 50, nl_syrupvai: 30, nl_duong: 20, nl_cunang: 30, nl_vaimieng: 1, nl_ly_l: 1 }
        }
    }
];
