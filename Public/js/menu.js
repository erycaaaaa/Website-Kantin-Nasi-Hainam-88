var app = angular.module('warung88', []);

app.controller('MenuController', function($scope, $http, $window) {
    $http.get('http://localhost:5000/api/menu')
    .then(function(response) {
        $scope.allData = response.data.filter(item => item.status === true);
        console.log($scope.allData);
    })
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:5000/api/cart/guest123')
        .then(res => res.json())
        .then(data => {
            cartItems = data.items || [];
            updateCartBadge();
            console.log("🛒 Keranjang dari DB:", cartItems);
        });

    // Use event delegation for dynamically rendered buttons
    document.body.addEventListener("click", function (e) {
        if (e.target.closest(".btn-add-cart")) {
            const button = e.target.closest(".btn-add-cart");
            addItemToCart(button);
        }
        if (e.target.closest(".btn-remove-cart")) {
            const button = e.target.closest(".btn-remove-cart");
            const name = button.getAttribute("data-name");
            removeItemFromCart(name);
        }
    });
});