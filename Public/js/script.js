let cartItems = [];

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) badge.textContent = cartItems.length;
}

async function syncCartToDB() {
    try {
        const response = await fetch('http://localhost:5000/api/cart/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 'guest123',
                items: cartItems
            })
        });
        const result = await response.json();
        console.log("[MongoDB] Sync:", result);
    } catch (err) {
        console.error("❌ Gagal sync ke DB:", err);
    }
}

function addItemToCart(button) {
    const item = {
        name: button.getAttribute('data-name'),
        price: parseInt(button.getAttribute('data-price')),
        img: button.getAttribute('data-img')
    };

    cartItems.push(item);
    updateCartBadge();
    console.log("[Tambah] Produk:", item);
    syncCartToDB();
}

function removeItemFromCart(name) {
    const index = cartItems.findIndex(item => item.name === name);
    if (index > -1) {
        cartItems.splice(index, 1);
        updateCartBadge();
        console.log("[Hapus] Produk:", name);
        syncCartToDB();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:5000/api/cart/guest123')
        .then(res => res.json())
        .then(data => {
            cartItems = data.items || [];
            updateCartBadge();
            console.log("🛒 Keranjang dari DB:", cartItems);
        });

    document.querySelectorAll(".btn-add-cart").forEach(button => {
        button.addEventListener("click", () => addItemToCart(button));
    });

    document.querySelectorAll(".btn-remove-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            removeItemFromCart(name);
        });
    });
});
