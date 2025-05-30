(function() {
  'use strict';

  const app = angular.module('memoryApp', []);

  // Controller utama untuk halaman menu + keranjang
  app.controller('MemoryController', ['$scope', '$http', function($scope, $http) {
    // Inisialisasi cart dan data menu
    $scope.cart     = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.memories = [];
    $scope.memory   = {};

    // Ambil role dari localStorage
    $scope.role = localStorage.getItem('role');

    // Helper untuk cek admin
    $scope.isAdmin = () => $scope.role === 'admin';

    // Load semua menu dari API
    $http.get('http://localhost:5000/api/menu')
    .then(function(response) {
        $scope.allData = response.data.filter(item => item.status === true);
        console.log($scope.allData);
    })

    // Tambah menu (Admin)
    $scope.addMemory = function() {
      const formData = new FormData();
      formData.append('photo', $scope.memory.photo);
      formData.append('name', $scope.memory.name);
      formData.append('description', $scope.memory.description);
      formData.append('price', $scope.memory.price);

      $http.post('http://localhost:5000/api/memories', formData, {
        headers: { 'Content-Type': undefined }
      })
      .then(function(response) {
        $scope.memories.unshift(response.data);
        $scope.memory = {};
        const photoInput = document.querySelector('#photoInput');
        if (photoInput) photoInput.value = null;
      })
      .catch(function(error) {
        console.error('Error adding memory:', error);
      });
    };

    // Mulai edit menu (Admin)
    $scope.editMemory = function(memory) {
      if (!$scope.isAdmin()) {
        alert('Hanya admin yang bisa mengedit menu.');
        return;
      }
      memory.editing = true;
      memory.original = {
        name: memory.name,
        description: memory.description,
        price: memory.price
      };
    };

    // Simpan edit menu (Admin)
    $scope.saveMemory = function(memory) {
      const updated = {
        name: memory.name,
        description: memory.description,
        price: memory.price
      };
      $http.put(`http://localhost:5000/api/memories/${memory._id}`, updated)
        .then(function(resp) {
          memory.editing = false;
          Object.assign(memory, resp.data);
        })
        .catch(function(error) {
          console.error('Error saving memory:', error);
          alert('Gagal menyimpan perubahan menu.');
        });
    };

    // Batal edit menu (Admin)
    $scope.cancelEdit = function(memory) {
      memory.editing    = false;
      memory.name       = memory.original.name;
      memory.description = memory.original.description;
      memory.price      = memory.original.price;
    };

    // Hapus menu (Admin)
    $scope.deleteMemory = function(id) {
      if (!$scope.isAdmin()) {
        alert('Hanya admin yang bisa menghapus menu.');
        return;
      }
      $http.delete(`http://localhost:5000/api/memories/${id}`)
        .then(function() {
          $scope.memories = $scope.memories.filter(m => m._id !== id);
        })
        .catch(function(error) {
          console.error('Error deleting memory:', error);
        });
    };

    // $scope.cart = [];

$scope.addToCart = function(item) {
  let found = false;
  for (let i = 0; i < $scope.cart.length; i++) {
    if ($scope.cart[i]._id === item._id) {
      $scope.cart[i].quantity++;
      found = true;
      break;
    }
  }

  if (!found) {
    item.quantity = 1;
    $scope.cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify($scope.cart)); // 🔁 Save updated cart
};

$scope.removeFromCart = function(item) {
  for (let i = 0; i < $scope.cart.length; i++) {
    if ($scope.cart[i]._id === item._id) {
      if ($scope.cart[i].quantity > 1) {
        $scope.cart[i].quantity--;
      } else {
        $scope.cart.splice(i, 1);
      }
      break;
    }
  }

  localStorage.setItem('cart', JSON.stringify($scope.cart)); // 🔁 Save updated cart
};

    // Hitung total harga
    $scope.getTotal = function() {
      return $scope.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    };

    // Simpan cart dan redirect ke cart.html
    $scope.goToCart = function() {
      localStorage.setItem('cart', JSON.stringify($scope.cart));
      window.location.href = 'cart.html';
    };
  }]);

  // Controller untuk halaman cart.html
  app.controller('CartController', ['$scope', function($scope) {
    $scope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.getTotal = function() {
      return $scope.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };
    $scope.goToCheckout = function() {
      const total = $scope.getTotal();
      window.location.href = 'pembayaran.html?total=' + total;
    };

  }]);

  // Directive untuk file upload
  app.directive('fileModel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        const model       = $parse(attrs.fileModel);
        const modelSetter = model.assign;
        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);

})();
