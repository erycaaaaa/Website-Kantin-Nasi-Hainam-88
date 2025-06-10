var app = angular.module('warung88', []);

app.controller('HistoryPenjualController', function($scope, $http, $window) {
    $scope.role = localStorage.getItem('role');
    if($scope.role !== 'admin') {
        $window.location.href = './index.html';
    }
    
    $http.get('http://localhost:5000/api/datas/viewData')
    .then(function(response) {
        console.log(response.data);  
        $scope.allData = response.data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    });

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