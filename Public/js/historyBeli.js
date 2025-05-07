document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:5000/api/cart/guest123')
      .then(res => res.json())
      .then(data => {
          const items = data.items || [];
          const tableBody = document.getElementById("history-table-body");

          if (items.length === 0) {
              tableBody.innerHTML = `<tr><td colspan="5">Belum ada histori pembelian.</td></tr>`;
              return;
          }

          items.forEach((item, index) => {
              const row = `
                  <tr>
                      <td>${index + 1}</td>
                      <td>${new Date().toLocaleDateString()}</td>
                      <td>${item.name}</td>
                      <td>1</td>
                      <td>Rp${item.price.toLocaleString()}</td>
                  </tr>
              `;
              tableBody.insertAdjacentHTML("beforeend", row);
          });
      })
      .catch(err => {
          console.error("❌ Gagal mengambil histori:", err);
      });
});
