var app = angular.module('warung88', []);

app.controller('ProfileController', function($scope, $http, $window) {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if(role != "customer"){
        $window.location.href = "index.html";
    }
    console.log("Username from localStorage:", username);
    $http.get(`https://eb6415fb-0b14-4e52-919d-efdcc0eb5ab0-00-2j9jbuyxc3a4h.pike.replit.dev/users/${username}`)
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

    $scope.logout = function () {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("cart"); 
      localStorage.removeItem("username");
      $window.location.href = "./index.html"; 
    };
});