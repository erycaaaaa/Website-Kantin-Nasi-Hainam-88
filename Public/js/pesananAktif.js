var app = angular.module('warung88', []);

app.controller('PesananAktifController', function($scope, $http, $window) {
    $scope.role = localStorage.getItem('role');
    if($scope.role !== 'admin') {
        $window.location.href = './index.html';
    }
    $http.get('http://localhost:5000/api/datas/viewData')
    .then(function(response) {
        console.log(response.data);  // Debugging line
        $scope.allData = response.data.filter(item => item.status === "belum" || item.status === "proses");
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    });

    $scope.updateStatus = function(item) {
        console.log(item._id);
        $http.put('http://localhost:5000/api/datas/updateStatus/' + item._id, { status: item.status })
        .then(function(response) {
            console.log('Status updated successfully');
            $http.get('http://localhost:5000/api/datas/viewData')
            .then(function(response) {
                console.log(response.data);  // Debugging line
                $scope.allData = response.data.filter(item => item.status === "belum" || item.status === "proses");
            })
            .catch(function(error) {
                console.error("Error fetching data:", error);
            });
        })
        .catch(function(error) {
            console.error('Error updating status:', error);
        });
    };
});