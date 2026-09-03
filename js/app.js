// --- QUẢN LÝ DỮ LIỆU LOCALSTORAGE ---
function initData() {
    let currentKho = JSON.parse(localStorage.getItem('POS_KHO')) || {};
    let isUpdated = false;

    // Init or merge from nguyenlieu.js
    KHO_MAC_DINH.forEach(item => {
        if (!currentKho[item.id]) {
            currentKho[item.id] = { ...item };
            isUpdated = true;
        } else {
            // Cập nhật lại name và unit nếu có thay đổi trong code
            if (currentKho[item.id].name !== item.name || currentKho[item.id].unit !== item.unit) {
                currentKho[item.id].name = item.name;
                currentKho[item.id].unit = item.unit;
                isUpdated = true;
            }
        }
    });

    if (isUpdated || !localStorage.getItem('POS_KHO')) {
        localStorage.setItem('POS_KHO', JSON.stringify(currentKho));
    }

    let baocao = JSON.parse(localStorage.getItem('POS_BAOCAO'));
    if (!baocao) {
        baocao = { tongThu: 0, tongLy: 0, chiTietBan: {} };
        localStorage.setItem('POS_BAOCAO', JSON.stringify(baocao));
    } else if (!baocao.chiTietBan) {
        baocao.chiTietBan = {};
        localStorage.setItem('POS_BAOCAO', JSON.stringify(baocao));
    }
}
initData();

// --- STATE ---
let khoHienTai = JSON.parse(localStorage.getItem('POS_KHO'));
let khoAo = JSON.parse(JSON.stringify(khoHienTai)); // Deep copy for virtual stock
let gioHang = []; // Array of cart items
let currentCategory = 'Cà phê';

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const categoriesContainer = document.querySelector('.menu-categories');
const cartCount = document.getElementById('cart-count');
const floatingCartCount = document.getElementById('floating-cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartDrawer = document.getElementById('cart-drawer');
const discountInput = document.getElementById('discount-input');

// --- TÍNH TOÁN KHO ẢO ---
function getIngredientName(id) {
    if(khoHienTai[id]) return khoHienTai[id].name;
    return id;
}
function getIngredientUnit(id) {
    if(khoHienTai[id]) return khoHienTai[id].unit;
    return '';
}

function calcMaxCups(recipeObj) {
    let minCups = Infinity;
    for (let id in recipeObj) {
        let needed = recipeObj[id];
        let available = khoAo[id] ? khoAo[id].stock : 0;
        let cups = Math.floor(available / needed);
        if (cups < minCups) minCups = cups;
    }
    return minCups === Infinity ? 0 : minCups;
}

// --- RENDER MENU ---
function renderCategories() {
    const cats = [...new Set(MENU.map(m => m.category))];
    categoriesContainer.innerHTML = '';
    cats.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `cat-btn ${cat === currentCategory ? 'active' : ''}`;
        btn.textContent = cat;
        btn.onclick = () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = cat;
            renderMenu();
        };
        categoriesContainer.appendChild(btn);
    });
}

function renderMenu() {
    menuGrid.innerHTML = '';
    const items = MENU.filter(m => m.category === currentCategory);
    
    items.forEach(item => {
        // Calculate max cups for M and L
        let maxM = 0;
        let maxL = 0;
        if (item.price.M) {
            maxM = calcMaxCups(item.congThuc.M);
        }
        if (item.price.L) {
            maxL = calcMaxCups(item.congThuc.L);
        }
        
        let totalAvail = maxM + maxL;
        const outOfStock = totalAvail <= 0;

        const el = document.createElement('div');
        el.className = `menu-item ${outOfStock ? 'out-of-stock' : ''}`;
        el.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-name">${item.name}</div>
            <div class="item-stock">Còn: ${totalAvail} ly</div>
            <div class="item-actions">
                ${item.price.M ? `<button class="btn-size" ${maxM <= 0 ? 'disabled' : ''} onclick="handleMenuClick('${item.id}', 'M')">M</button>` : ''}
                ${item.price.L ? `<button class="btn-size" ${maxL <= 0 ? 'disabled' : ''} onclick="handleMenuClick('${item.id}', 'L')">L</button>` : ''}
            </div>
        `;
        menuGrid.appendChild(el);
    });
}

// --- XỬ LÝ CLICK MÓN ---
let tempSelectedItem = null;

window.handleMenuClick = function(itemId, size) {
    const item = MENU.find(m => m.id === itemId);
    
    if (item.hasAddonSua || item.hasAddonMatcha || ['Cacao', 'Matcha', 'Khoai môn'].includes(item.category)) {
        // Open Modal
        tempSelectedItem = { item, size };
        openAddonModal(item, size);
    } else {
        // Add direct
        addToCart(item, size, {}, []);
    }
}

// --- MODAL & ADDONS ---
const addonModal = document.getElementById('addon-modal');
const closeBtn = document.getElementById('close-modal-btn');
const milkGroup = document.getElementById('milk-options');
const matchaGroup = document.getElementById('matcha-options');
const milkRadios = document.getElementById('milk-radio-group');
const matchaRadios = document.getElementById('matcha-radio-group');
const toppingCheckboxes = document.getElementById('topping-checkbox-group');

function openAddonModal(item, size) {
    document.getElementById('modal-drink-name').textContent = `${item.name} (Size ${size})`;
    
    // Reset Modal state
    milkRadios.innerHTML = '';
    matchaRadios.innerHTML = '';
    toppingCheckboxes.innerHTML = '';
    milkGroup.classList.add('hidden');
    matchaGroup.classList.add('hidden');

    // Build Milk Options
    if (item.hasAddonSua) {
        milkGroup.classList.remove('hidden');
        milkRadios.innerHTML = `
            <label class="radio-item">
                <div><input type="radio" name="milk" value="mac_dinh" checked> Mặc định (Mlekovita)</div>
                <span>+0đ</span>
            </label>
            <label class="radio-item">
                <div><input type="radio" name="milk" value="doi_sua"> Đổi sữa Oatside</div>
                <span>+5.000đ</span>
            </label>
        `;
    }

    // Build Matcha Options
    if (item.hasAddonMatcha) {
        matchaGroup.classList.remove('hidden');
        matchaRadios.innerHTML = `
            <label class="radio-item">
                <div><input type="radio" name="matcha" value="mac_dinh" checked> Mặc định (Matcha Đài)</div>
                <span>+0đ</span>
            </label>
            <label class="radio-item">
                <div><input type="radio" name="matcha" value="doi_matcha"> Đổi Matcha MK4</div>
                <span>+10.000đ</span>
            </label>
        `;
    }

    // Build Toppings
    ADDONS.topping.forEach((top, idx) => {
        toppingCheckboxes.innerHTML += `
            <label class="checkbox-item">
                <div><input type="checkbox" name="topping" value="${idx}"> ${top.name}</div>
                <span>+5.000đ</span>
            </label>
        `;
    });

    addonModal.classList.add('active');
}

closeBtn.onclick = () => addonModal.classList.remove('active');

document.getElementById('add-to-cart-modal-btn').onclick = () => {
    if(!tempSelectedItem) return;
    
    let addonSua = null;
    let addonMatcha = null;
    let toppings = [];

    if(tempSelectedItem.item.hasAddonSua) {
        const val = document.querySelector('input[name="milk"]:checked').value;
        if(val === 'doi_sua') addonSua = ADDONS.sua.doi_sua;
    }
    if(tempSelectedItem.item.hasAddonMatcha) {
        const val = document.querySelector('input[name="matcha"]:checked').value;
        if(val === 'doi_matcha') addonMatcha = ADDONS.matcha.doi_matcha;
    }

    const tChecked = document.querySelectorAll('input[name="topping"]:checked');
    tChecked.forEach(cb => {
        toppings.push(ADDONS.topping[cb.value]);
    });

    const addonsData = {
        sua: addonSua,
        matcha: addonMatcha,
        toppings: toppings
    };

    addToCart(tempSelectedItem.item, tempSelectedItem.size, addonsData);
    addonModal.classList.remove('active');
};

// --- GIỎ HÀNG LOGIC ---
function calculateRealRecipe(item, size, addonsData) {
    // Clone recipe for 1 cup
    let recipe = { ...item.congThuc[size] };
    
    // Override Milk
    if (addonsData.sua) {
        let amount = recipe['nl_sua_mlekovita'] || 0;
        if (amount > 0) {
            delete recipe['nl_sua_mlekovita'];
            recipe[addonsData.sua.id] = amount; // Replace with oatside
        }
    }
    // Override Matcha
    if (addonsData.matcha) {
        let amount = recipe['nl_matcha_dai'] || 0;
        if (amount > 0) {
            delete recipe['nl_matcha_dai'];
            // Lượng Matcha MK4 sẽ bằng lượng Matcha Đài - 1
            recipe[addonsData.matcha.id] = Math.max(0, amount - 1);
        }
    }
    // Add Toppings
    if (addonsData.toppings && addonsData.toppings.length > 0) {
        addonsData.toppings.forEach(t => {
            recipe[t.id] = t.qty;
        });
    }
    return recipe;
}

function addToCart(item, size, addonsData) {
    const realRecipe = calculateRealRecipe(item, size, addonsData);
    
    // Check virtual stock before adding
    let max = calcMaxCups(realRecipe);
    if(max <= 0) {
        alert('Kho không đủ nguyên liệu cho tùy chọn này!');
        return;
    }

    let price = item.price[size];
    let addonText = [];
    if(addonsData.sua) { price += addonsData.sua.price; addonText.push(addonsData.sua.name); }
    if(addonsData.matcha) { price += addonsData.matcha.price; addonText.push(addonsData.matcha.name); }
    if(addonsData.toppings && addonsData.toppings.length > 0) {
        addonsData.toppings.forEach(t => {
            price += t.price;
            addonText.push(t.name);
        });
    }

    // Generate Key
    const key = `${item.id}_${size}_${JSON.stringify(addonsData)}`;

    const existingIndex = gioHang.findIndex(x => x.key === key);
    if (existingIndex > -1) {
        gioHang[existingIndex].qty += 1;
    } else {
        gioHang.push({
            key,
            item,
            size,
            addonsData,
            price,
            qty: 1,
            recipe: realRecipe,
            addonText: addonText.join(', ')
        });
    }

    updateVirtualStock();
    renderCart();
    showToast();
}

function updateVirtualStock() {
    // Reset virtual stock to current actual stock
    khoAo = JSON.parse(JSON.stringify(khoHienTai));
    
    // Subtract all items in cart
    gioHang.forEach(cartItem => {
        const recipe = cartItem.recipe;
        for (let nl in recipe) {
            if(khoAo[nl]) {
                khoAo[nl].stock -= (recipe[nl] * cartItem.qty);
            }
        }
    });

    renderMenu(); // Update menu buttons
}

window.changeQty = function(index, delta) {
    let newQty = gioHang[index].qty + delta;
    if (newQty <= 0) {
        gioHang.splice(index, 1);
    } else {
        // Check if we can add more
        if(delta > 0) {
            let max = calcMaxCups(gioHang[index].recipe);
            if(max <= 0) {
                alert('Kho không đủ nguyên liệu!');
                return;
            }
        }
        gioHang[index].qty = newQty;
    }
    updateVirtualStock();
    renderCart();
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let totalQty = 0;
    let totalPrice = 0;

    gioHang.forEach((cItem, index) => {
        totalQty += cItem.qty;
        totalPrice += (cItem.price * cItem.qty);
        
        let recipeHtml = '';
        for(let id in cItem.recipe) {
            recipeHtml += `<div class="recipe-line"><span>${getIngredientName(id)}</span> <span>${cItem.recipe[id]}${getIngredientUnit(id)}</span></div>`;
        }

        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
            <div class="cart-item-header">
                <span class="cart-item-title">${cItem.item.name} <span class="cart-item-size">${cItem.size}</span></span>
                <span class="item-price">${(cItem.price * cItem.qty).toLocaleString('vi-VN')}đ</span>
            </div>
            ${cItem.addonText ? `<div class="cart-item-addons">+ ${cItem.addonText}</div>` : ''}
            <div class="cart-item-controls">
                <div class="qty-control">
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    <span>${cItem.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
            <button class="accordion-btn" onclick="toggleAccordion(this)">
                Công thức (1 ly) <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-content">
                ${recipeHtml}
            </div>
        `;
        cartItemsContainer.appendChild(el);
    });

    // Discount
    let finalTotal = totalPrice;
    let discVal = discountInput.value.trim();
    if(discVal.endsWith('%')) {
        let percent = parseFloat(discVal);
        if(!isNaN(percent)) {
            finalTotal = totalPrice * (1 - percent/100);
        }
    } else {
        let amt = parseFloat(discVal);
        if(!isNaN(amt)) {
            finalTotal = totalPrice - amt;
        }
    }
    if(finalTotal < 0) finalTotal = 0;

    cartTotalEl.textContent = `${finalTotal.toLocaleString('vi-VN')}đ`;
    cartCount.textContent = totalQty;
    floatingCartCount.textContent = totalQty;
}

window.toggleAccordion = function(btn) {
    const content = btn.nextElementSibling;
    content.classList.toggle('open');
    const icon = btn.querySelector('i');
    if(content.classList.contains('open')) {
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

document.getElementById('apply-discount-btn').onclick = renderCart;
discountInput.addEventListener('input', renderCart); // Live update discount

// --- CART UI TOGGLE ---
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const closeCartBtn = document.getElementById('close-cart-btn');

cartToggleBtn.onclick = () => cartDrawer.classList.add('open');
closeCartBtn.onclick = () => cartDrawer.classList.remove('open');

// --- THANH TOÁN ---
document.getElementById('checkout-btn').onclick = () => {
    if(gioHang.length === 0) return alert('Giỏ hàng trống!');
    
    // Update actual stock
    khoHienTai = JSON.parse(JSON.stringify(khoAo));
    localStorage.setItem('POS_KHO', JSON.stringify(khoHienTai));

    // Update Report
    const report = JSON.parse(localStorage.getItem('POS_BAOCAO'));
    
    // Recalc total for revenue
    let finalTotal = parseInt(cartTotalEl.textContent.replace(/[^0-9]/g, ''));
    let totalLy = gioHang.reduce((sum, item) => sum + item.qty, 0);

    report.tongThu += finalTotal;
    report.tongLy += totalLy;
    
    if (!report.chiTietBan) report.chiTietBan = {};
    gioHang.forEach(item => {
        let key = `${item.item.name} - Size ${item.size}`;
        if (item.addonText) {
            key += ` (+ ${item.addonText})`;
        }
        if (!report.chiTietBan[key]) {
            report.chiTietBan[key] = 0;
        }
        report.chiTietBan[key] += item.qty;
    });
    
    localStorage.setItem('POS_BAOCAO', JSON.stringify(report));

    alert('Thanh toán thành công!');
    
    // Reset
    gioHang = [];
    discountInput.value = '';
    cartDrawer.classList.remove('open');
    updateVirtualStock();
    renderCart();
    renderInventory();
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// --- TABS & INVENTORY LOGIC ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
        
        if(btn.dataset.target === 'tab-inventory') {
            renderInventory();
        }
    });
});

function renderInventory() {
    const report = JSON.parse(localStorage.getItem('POS_BAOCAO'));
    document.getElementById('total-revenue').textContent = `${report.tongThu.toLocaleString('vi-VN')}đ`;
    document.getElementById('total-cups').textContent = report.tongLy;

    const detailList = document.getElementById('sales-detail-list');
    if (detailList) {
        detailList.innerHTML = '';
        const chiTiet = report.chiTietBan || {};
        if (Object.keys(chiTiet).length === 0) {
            detailList.innerHTML = '<div style="padding: 10px; color: #888;">Chưa có dữ liệu bán hàng.</div>';
        } else {
            for (let key in chiTiet) {
                detailList.innerHTML += `
                    <div class="inv-row" style="justify-content: space-between;">
                        <div class="inv-name" style="flex: 1; margin-right: 15px; font-weight: 500;">${key}</div>
                        <div style="font-weight: bold; color: var(--primary-color);">${chiTiet[key]} ly</div>
                    </div>
                `;
            }
        }
    }

    const list = document.getElementById('inventory-list');
    list.innerHTML = '';

    for (let key in khoHienTai) {
        const item = khoHienTai[key];
        list.innerHTML += `
            <div class="inv-row">
                <div class="inv-name">${item.name}</div>
                <div class="inv-input-group">
                    <input type="number" class="inv-input" id="inv_${key}" value="${item.stock}">
                    <span>${item.unit}</span>
                </div>
            </div>
        `;
    }
}

document.getElementById('save-inventory-btn').onclick = () => {
    for (let key in khoHienTai) {
        const input = document.getElementById(`inv_${key}`);
        if(input) {
            khoHienTai[key].stock = parseFloat(input.value) || 0;
        }
    }
    localStorage.setItem('POS_KHO', JSON.stringify(khoHienTai));
    updateVirtualStock(); // Cập nhật lại kho ảo và nút menu
    alert('Đã lưu tồn kho!');
}

document.getElementById('close-shift-btn').onclick = () => {
    if(confirm('Bạn có chắc chắn chốt ca? (Doanh thu sẽ về 0, tồn kho vẫn giữ nguyên)')) {
        localStorage.setItem('POS_BAOCAO', JSON.stringify({ tongThu: 0, tongLy: 0, chiTietBan: {} }));
        renderInventory();
        alert('Chốt ca thành công!');
    }
}

// --- INIT APP ---
renderCategories();
renderMenu();
renderCart();
