var app = angular.module('warung88', []);

app.controller('HistoryPenjualController', function($scope, $http, $window) {
    $http.get('http://localhost:5000/api/datas/viewData')
    .then(function(response) {
        console.log(response.data);  // Debugging line
        $scope.allData = response.data;
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    });
});