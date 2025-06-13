var app = angular.module('warung88', []);

app.controller('PesananAktifController', function($scope, $http, $window, $interval) {
    $scope.role = localStorage.getItem('role');
    if($scope.role !== 'admin') {
        $window.location.href = './index.html';
    }

    $http.get('https://eb6415fb-0b14-4e52-919d-efdcc0eb5ab0-00-2j9jbuyxc3a4h.pike.replit.dev/api/datas/viewData')
    .then(function(response) {
        console.log(response.data);  // Debugging line
        $scope.allData = response.data.filter(item => item.status === "belum" || item.status === "proses" || item.status === "tunggu");
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    });

    $scope.updateStatus = function(item) {
        console.log(item._id);
        $http.put('https://eb6415fb-0b14-4e52-919d-efdcc0eb5ab0-00-2j9jbuyxc3a4h.pike.replit.dev/api/datas/updateStatus/' + item._id, { status: item.status })
        .then(function(response) {
            console.log('Status updated successfully');
            $http.get('http://localhost:5000/api/datas/viewData')
            .then(function(response) {
                console.log(response.data);  
                $scope.allData = response.data.filter(item => item.status === "belum" || item.status === "proses" || item.status === "tunggu");
            })
            .catch(function(error) {
                console.error("Error fetching data:", error);
            });
        })
        .catch(function(error) {
            console.error('Error updating status:', error);
        });
    };
     $scope.fetchPendingOrdersCount = function () {
        $http.get("http://localhost:5000/api/datas/orders/pending-count").then(function (response) {
            $scope.pendingOrdersCount = response.data.count;
        }).catch(function (error) {
            console.error("Failed to fetch pending orders count:", error);
        });
    };
    $scope.fetchPendingOrdersCount();

    $interval($scope.fetchPendingOrdersCount, 60000);

     $scope.logout = function () {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("cart"); 
      localStorage.removeItem("username");
      $window.location.href = "./index.html"; 
    };
});