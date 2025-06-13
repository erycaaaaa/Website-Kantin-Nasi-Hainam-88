let cartItems = [];

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) badge.textContent = cartItems.length;
}

async function syncCartToDB() {
    try {
        const response = await fetch('https://eb6415fb-0b14-4e52-919d-efdcc0eb5ab0-00-2j9jbuyxc3a4h.pike.replit.dev/api/cart/save', {
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
    fetch('https://eb6415fb-0b14-4e52-919d-efdcc0eb5ab0-00-2j9jbuyxc3a4h.pike.replit.dev/api/cart/guest123')
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

  //Script Konfirmasi Hapus Akun
function konfirmasiHapusAkun() {
    const konfirmasi1 = confirm("Apakah Anda yakin ingin menghapus akun?");
    if (konfirmasi1) {
        const konfirmasi2 = confirm("Tindakan ini permanen. Lanjutkan?");
        if (konfirmasi2) {
            const username = prompt("Masukkan username Anda untuk konfirmasi:");
            if (username && username.trim() !== "") {
                // Lakukan validasi jika perlu
                window.open('hapusAcc.html?user=' + encodeURIComponent(username), '_blank');
            } else {
                alert("Penghapusan akun dibatalkan. Username tidak boleh kosong.");
            }
        } else {
            alert("Penghapusan akun dibatalkan.");
        }
    } else {
        alert("Penghapusan akun dibatalkan.");
    }
}
function openPasswordModal() {
  document.getElementById('passwordModal').style.display = 'block';
  document.getElementById('passwordMessage').innerText = '';
  document.getElementById('passwordForm').reset();
}

function closePasswordModal() {
  document.getElementById('passwordModal').style.display = 'none';
}

function submitPasswordChange(event) {
  event.preventDefault(); // supaya halaman tidak reload

  const oldPass = document.getElementById('oldPassword').value.trim();
  const newPass = document.getElementById('newPassword').value.trim();
  const confirmPass = document.getElementById('confirmPassword').value.trim();
  const message = document.getElementById('passwordMessage');

  // Validasi sederhana
  if (newPass !== confirmPass) {
    message.innerText = 'Password baru dan konfirmasi tidak sama.';
    return false;
  }

  if (newPass.length < 6) {
    message.innerText = 'Password baru minimal 6 karakter.';
    return false;
  }

  // TODO: kirim data ke server via AJAX/fetch untuk proses update password
  // Misal:
  // fetch('/api/change-password', {method:'POST', body: JSON.stringify({oldPass, newPass}), headers:{'Content-Type':'application/json'}})
  //  .then(...) dan seterusnya

  alert('Password berhasil diubah!'); // ganti dengan response server sebenarnya
  closePasswordModal();
  return false;
}

// Optional: tutup modal saat klik di luar modal content
window.onclick = function(event) {
  const modal = document.getElementById('passwordModal');
  if (event.target == modal) {
    closePasswordModal();
  }
}
