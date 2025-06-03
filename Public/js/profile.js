var app = angular.module('warung88', []);

app.controller('ProfileController', function($scope, $http, $window) {
    const username = localStorage.getItem("username");
    console.log("Username from localStorage:", username);
    $http.get(`http://localhost:5000/users/${username}`)
    .then(function(response) {
        console.log(response.data);  
        $scope.username = response.data.username;
        $scope.email = response.data.email;
        $scope.phone = response.data.phone;
        $scope.date = response.data.created_at;
    })
    .catch(function(error) {
        console.error("Error fetching data:", error);
    });
});