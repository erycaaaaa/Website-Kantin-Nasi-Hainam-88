
// function updateTotals() {
//   let total = 0;
//   document.querySelectorAll('.cart-item').forEach(item => {
//     const price = parseInt(item.querySelector('[data-price]').dataset.price);
//     const quantity = parseInt(item.querySelector('.quantity').textContent);
//     const itemTotal = price * quantity;
//     item.querySelector('.item-total').textContent = `Rp ${itemTotal.toLocaleString()}`;
//     total += itemTotal;
//   });

//   document.querySelectorAll('.total-amount').forEach(el => {
//     el.textContent = `Rp ${total.toLocaleString()}`;
//   });
// }

// document.querySelectorAll('.quantity-btn').forEach(btn => {
//   btn.addEventListener('click', function () {
//     const isAdding = this.textContent === '+';
//     const quantitySpan = this.parentElement.querySelector('.quantity');
//     let current = parseInt(quantitySpan.textContent);

//     if (isAdding) {
//       quantitySpan.textContent = current + 1;
//     } else if (current > 1) {
//       quantitySpan.textContent = current - 1;
//     }

//     updateTotals();
//   });
// });

// // Panggil sekali saat load awal
// updateTotals();


function updateTotals() {
  let total = 0;
  document.querySelectorAll('.cart-item').forEach(item => {
    const price = parseInt(item.querySelector('[data-price]').dataset.price);
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    const itemTotal = price * quantity;
    item.querySelector('.item-total').textContent = `Rp ${itemTotal.toLocaleString()}`;
    total += itemTotal;
  });

  document.querySelectorAll('.total-amount').forEach(el => {
    el.textContent = `Rp ${total.toLocaleString()}`;
  });
}

// Tombol + dan -
document.querySelectorAll('.quantity-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const isAdding = this.textContent === '+';
    const quantitySpan = this.parentElement.querySelector('.quantity');
    let current = parseInt(quantitySpan.textContent);

    if (isAdding) {
      quantitySpan.textContent = current + 1;
    } else if (current > 1) {
      quantitySpan.textContent = current - 1;
    } else {
      alert("Tidak bisa mengosongkan keranjang");
      return;
    }

    updateTotals();
  });
});

// Tombol hapus
document.querySelectorAll('.remove-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const cartItem = this.closest('.cart-item');
    cartItem.remove();
    updateTotals();
  });
});

// Jalankan saat halaman dimuat
updateTotals();

