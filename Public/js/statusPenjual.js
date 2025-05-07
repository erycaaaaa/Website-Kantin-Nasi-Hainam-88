const role = 'penjual'; // atau 'pembeli'

const statusForm = document.getElementById('status-form');
const statusText = document.getElementById('status-text');
const statusSelect = document.getElementById('status-select');

if (role === 'penjual') {
  statusForm.classList.remove('hidden');
} else {
  statusForm.classList.add('hidden');
}

function updateStatus() {
  const selectedStatus = statusSelect.value;
  statusText.textContent = selectedStatus;
  alert("Status pesanan telah diperbarui!");
}

document.addEventListener("DOMContentLoaded", () => {
    const orders = [
      { name: "Nasi Hainam Ayam Panggang", status: "diproses" },
      { name: "Es Teh Manis", status: "siap" },
      { name: "Bakpau Ayam", status: "selesai" }
    ];
  
    const orderList = document.getElementById("order-list");
  
    orders.forEach(order => {
      const row = document.createElement("tr");
  
      const nameCell = document.createElement("td");
      nameCell.textContent = order.name;
  
      const statusCell = document.createElement("td");
      statusCell.innerHTML = `<span class="badge ${getStatusClass(order.status)}">${formatStatus(order.status)}</span>`;
  
      row.appendChild(nameCell);
      row.appendChild(statusCell);
      orderList.appendChild(row);
    });
  });
  
  function getStatusClass(status) {
    switch (status) {
      case "diproses": return "bg-warning text-dark";
      case "siap": return "bg-success";
      case "selesai": return "bg-secondary";
      default: return "bg-dark";
    }
  }
  
  function formatStatus(status) {
    switch (status) {
      case "diproses": return "Sedang Diproses";
      case "siap": return "Siap Diambil";
      case "selesai": return "Telah Diambil";
      default: return "Tidak Diketahui";
    }
  }

