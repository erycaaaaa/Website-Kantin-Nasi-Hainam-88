var app = angular.module('warung88', []);

app.controller('HistoryBeliController', function($scope, $http, $window) {
    $http.get('https://eb6415fb-0b14-4e52-919d-efdcc0eb5ab0-00-2j9jbuyxc3a4h.pike.replit.dev/api/datas/viewData')
    .then(function(response) {
        console.log(response.data);  
        const username = localStorage.getItem("username");
         const userData = response.data.filter(item => item.username === username);
        $scope.allData = userData.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    });

    $scope.statusLabels = {
        belum: "Menunggu Konfirmasi",
        proses: "Pesanan Diproses",
        tunggu: "Tolong Ambil Pesanan Anda",
        selesai: "Selesai",
        tidakvalid: "Pembayaran Tidak Valid",
        habis: "Stok Habis",
        tidakcocok: "Jumlah Pembayaran Tidak Cocok"
    };

     $scope.logout = function () {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("cart"); 
      localStorage.removeItem("username");
      $window.location.href = "./index.html"; 
    };
});