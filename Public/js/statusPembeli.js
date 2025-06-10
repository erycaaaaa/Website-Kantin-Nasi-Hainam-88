var app = angular.module('warung88', []);

app.controller('StatusPembeliController', function($scope, $http, $window) {
    $http.get('http://localhost:5000/api/datas/viewData')
    .then(function(response) {
        console.log(response.data);  
        const username = localStorage.getItem("username");
        const now = new Date();
        const fiveHoursAgo = new Date(now.getTime() - (5 * 60 * 60 * 1000)); // 5 hours ago

        $scope.allData = response.data.filter(item => {
            const itemDate = new Date(item.tanggal);
            const isUserMatch = item.username === username;

            const isBelumOrProses = item.status === "belum" || item.status === "proses";
            const isRecentSelesai = (item.status === "selesai" || item.status === "tidakvalid" || item.status === "tidakcocok" || item.status === "habis") && itemDate >= fiveHoursAgo;

            return isUserMatch && (isBelumOrProses || isRecentSelesai);
        }) .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    });

    $scope.statusLabels = {
        belum: "Menunggu Konfirmasi",
        proses: "Pesanan Diproses",
        tunggu: "Tolong Ambil Pesanan Anda",
        selesai: "Selesai! Silahkan diambil!",
        tidakvalid: "Pembayaran Tidak Valid, tolong hubungi penjual",
        habis: "Stok Habis, tolong hubungi penjual",
        tidakcocok: "Jumlah Pembayaran Tidak Cocok, tolong hubungi penjual"
    };
});
