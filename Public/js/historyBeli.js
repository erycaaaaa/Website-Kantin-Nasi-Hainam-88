var app = angular.module('warung88', []);

app.controller('HistoryBeliController', function($scope, $http, $window) {
    $http.get('http://localhost:5000/api/datas/viewData')
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
        selesai: "Selesai",
        tidakvalid: "Pembayaran Tidak Valid",
        habis: "Stok Habis",
        tidakcocok: "Jumlah Pembayaran Tidak Cocok"
    };
});