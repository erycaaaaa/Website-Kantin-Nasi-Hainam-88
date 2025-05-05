const cartItems = [];

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) badge.textContent = cartItems.length;
}

function addItemToCart(name) {
    cartItems.push(name);
    updateCartBadge();
    console.log("[TAMBAH] Produk ke keranjang:", name, cartItems);
}

function removeItemFromCart(name) {
    const index = cartItems.indexOf(name);
    if (index > -1) {
        cartItems.splice(index, 1);
        updateCartBadge();
        console.log("[HAPUS] Produk dari keranjang:", name, cartItems);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".btn-add-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            addItemToCart(productName);
        });
    });

    document.querySelectorAll(".btn-remove-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            removeItemFromCart(productName);
        });
    });
});
