var app = angular.module('warung88', []);

app.controller('PembayaranController', function($scope, $http, $window) {
    const params = new URLSearchParams($window.location.search);
    $scope.amount = params.get("amount");

     $scope.isUploaded = false;

  $scope.fileSelected = function(files) {
    if (files.length > 0) {
      $scope.isUploaded = true;
      $scope.$apply(); // Update the view
    }
  };

  $scope.continue = function() {
    $window.location.href = 'success.html';
  };
});