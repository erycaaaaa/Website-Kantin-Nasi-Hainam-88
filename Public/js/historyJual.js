var app = angular.module('warung88', []);

app.controller('HistoryPenjualController', function($scope, $http, $window) {
    $http.get('http://localhost:5000/api/datas/viewData')
    .then(function(response) {
        console.log(response.data);  
        $scope.allData = response.data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    });
});