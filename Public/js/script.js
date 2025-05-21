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

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'Public')));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


  const hargaPerItem = 5000;

  function formatRupiah(num) {
    return "Rp " + num.toLocaleString("id-ID");
  }

  function updateTotal() {
    const quantity = parseInt(document.querySelector(".quantity").textContent);
    const itemTotal = quantity * hargaPerItem;

    document.querySelector(".item-total").textContent = formatRupiah(itemTotal);
    document.querySelector(".total-amount").textContent = formatRupiah(itemTotal);
    document.querySelector(".grand-total").textContent = formatRupiah(itemTotal);
  }

  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const isAdding = this.textContent === '+';
      const quantitySpan = this.parentElement.querySelector('.quantity');
      let current = parseInt(quantitySpan.textContent);

      if (isAdding) {
        quantitySpan.textContent = current + 1;
      } else if (current > 1) {
        quantitySpan.textContent = current - 1;
      }

      updateTotal();
    });
  });

  updateTotal(); // initial update

    // Fungsi untuk mengganti tab yang aktif
    function changeTab(activeTab) {
        // Menyembunyikan semua tab
        document.getElementById('infection-prevention').style.display = 'none';
        document.getElementById('cleanliness-procedures').style.display = 'none';

        // Menghapus kelas "active" pada semua tab menu
        document.querySelectorAll('.security-menu-item').forEach(function(tab) {
            tab.classList.remove('active');
        });

        // Menampilkan tab yang sesuai dan menambahkan kelas "active" pada menu yang dipilih
        document.getElementById(activeTab).style.display = 'block';
        document.getElementById(activeTab + '-tab').classList.add('active');
    }

    // Event listener untuk setiap tab menu
    document.getElementById('infection-prevention-tab').addEventListener('click', function() {
        changeTab('infection-prevention');
    });

    document.getElementById('cleanliness-procedures-tab').addEventListener('click', function() {
        changeTab('cleanliness-procedures');
    });

    // Inisialisasi tab pertama untuk ditampilkan (Pencegahan Infeksi)
    changeTab('infection-prevention');



    // Event listener untuk tombol Edit Profil
    document.getElementById('edit-profile-btn').addEventListener('click', function () {
        // Menyembunyikan elemen data dan menampilkan input form
        document.getElementById('name-value').style.display = 'none';
        document.getElementById('name-edit').style.display = 'block';
        document.getElementById('name-edit').value = document.getElementById('name-value').innerText;

        document.getElementById('username-value').style.display = 'none';
        document.getElementById('username-edit').style.display = 'block';
        document.getElementById('username-edit').value = document.getElementById('username-value').innerText;

        document.getElementById('email-value').style.display = 'none';
        document.getElementById('email-edit').style.display = 'block';
        document.getElementById('email-edit').value = document.getElementById('email-value').innerText;

        document.getElementById('phone-value').style.display = 'none';
        document.getElementById('phone-edit').style.display = 'block';
        document.getElementById('phone-edit').value = document.getElementById('phone-value').innerText;

        document.getElementById('gender-value').style.display = 'none';
        document.getElementById('gender-edit').style.display = 'block';
        document.getElementById('gender-edit').value = document.getElementById('gender-value').innerText;

        // Menampilkan tombol simpan
        document.getElementById('save-button').style.display = 'inline-block';
        document.getElementById('edit-profile-btn').style.display = 'none';
    });

    // Event listener untuk tombol Simpan Perubahan
    document.getElementById('save-button').addEventListener('click', function () {
        // Menyimpan perubahan dan menampilkan data baru
        document.getElementById('name-value').innerText = document.getElementById('name-edit').value;
        document.getElementById('username-value').innerText = document.getElementById('username-edit').value;
        document.getElementById('email-value').innerText = document.getElementById('email-edit').value;
        document.getElementById('phone-value').innerText = document.getElementById('phone-edit').value;
        document.getElementById('gender-value').innerText = document.getElementById('gender-edit').value;

        // Menyembunyikan input form dan menampilkan data kembali
        document.getElementById('name-value').style.display = 'block';
        document.getElementById('name-edit').style.display = 'none';

        document.getElementById('username-value').style.display = 'block';
        document.getElementById('username-edit').style.display = 'none';

        document.getElementById('email-value').style.display = 'block';
        document.getElementById('email-edit').style.display = 'none';

        document.getElementById('phone-value').style.display = 'block';
        document.getElementById('phone-edit').style.display = 'none';

        document.getElementById('gender-value').style.display = 'block';
        document.getElementById('gender-edit').style.display = 'none';

        // Menampilkan kembali tombol Edit Profil dan menyembunyikan tombol Simpan Perubahan
        document.getElementById('edit-profile-btn').style.display = 'inline-block';
        document.getElementById('save-button').style.display = 'none';
    });
