var app = angular.module('warung88', []);

app.controller('RekapPenjualController', function($scope, $http, $window, $filter) {
    $scope.role = localStorage.getItem('role');
    if($scope.role !== 'admin') {
        $window.location.href = './index.html';
    }
     const periodDays = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365
      };

      $scope.selectedPeriod = 'daily';
      $scope.rekapData = [];

      $scope.updateRekap = function() {
        $http.get("http://localhost:5000/api/datas/viewData").then(response => {
          const allData = response.data;
          console.log(allData);
          const now = new Date();
          const cutoff = new Date();
          cutoff.setDate(now.getDate() - periodDays[$scope.selectedPeriod]);

          const filtered = allData.filter(d => {
            const date = new Date(d.tanggal);
            return date >= cutoff && d.status === "selesai";
          });

          const countMap = {};
          filtered.forEach(order => {
            order.pesanan.forEach(([menu, jumlah]) => {
              if (!countMap[menu]) countMap[menu] = 0;
              countMap[menu] += jumlah;
            });
          });

          $scope.rekapData = Object.entries(countMap).map(([menu, jumlah]) => ({ menu, jumlah })).sort((a, b) => b.jumlah - a.jumlah);

        });
      };

      $scope.updateRekap(); 

      $scope.fetchPendingOrdersCount = function () {
        $http.get("http://localhost:5000/api/datas/orders/pending-count").then(function (response) {
            $scope.pendingOrdersCount = response.data.count;
        }).catch(function (error) {
            console.error("Failed to fetch pending orders count:", error);
        });
    };
    console.log("Pending orders count:", $scope.pendingOrdersCount);
    $scope.fetchPendingOrdersCount();
});