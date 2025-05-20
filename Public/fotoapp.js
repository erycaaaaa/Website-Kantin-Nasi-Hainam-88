const app = angular.module('memoryApp', []);

app.controller('MemoryController', function($scope, $http) {
  $scope.cart = JSON.parse(localStorage.getItem("cart")) || [];

  $scope.memories = [];
  $scope.memory = {};
  $scope.cart = [];  // Menyimpan item dalam keranjang belanja

  // Ambil semua menu
  $http.get('http://localhost:5000/api/memories').then((response) => {
    $scope.memories = response.data;
  });

  // Fungsi untuk memeriksa apakah pengguna adalah admin
  $scope.isAdmin = function() {
    const role = localStorage.getItem("role");
    return role === "admin";  // Periksa apakah peran adalah "admin"
  };

  // Tambah menu baru
  $scope.addMemory = function() {
    const formData = new FormData();
    formData.append('photo', $scope.memory.photo);
    formData.append('name', $scope.memory.name);
    formData.append('description', $scope.memory.description);
    formData.append('price', $scope.memory.price);

    $http.post('http://localhost:5000/api/memories', formData, {
      headers: { 'Content-Type': undefined }
    }).then((response) => {
      $scope.memories.unshift(response.data);
      $scope.memory = {}; // Reset form
      angular.element(document.querySelector('#photoInput')).val(null); // Reset input file
    });
  };

  // Hapus menu
  $scope.deleteMemory = function(id) {
    if (!$scope.isAdmin()) {
      alert("Hanya admin yang bisa menghapus menu.");
      return;
    }
    $http.delete(`http://localhost:5000/api/memories/${id}`).then(() => {
      $scope.memories = $scope.memories.filter((memory) => memory._id !== id);
    });
  };

  // Edit menu
  $scope.editMemory = function(memory) {
    if (!$scope.isAdmin()) {
      alert("Hanya admin yang bisa mengedit menu.");
      return;
    }
    memory.editing = true;
    memory.originalName = memory.name;
    memory.originalDescription = memory.description;
    memory.originalPrice = memory.price;
  };

  // Simpan perubahan menu
  $scope.saveMemory = function(memory) {
    const updatedMemory = {
      name: memory.name,
      description: memory.description,
      price: memory.price
    };

    $http.put(`http://localhost:5000/api/memories/${memory._id}`, updatedMemory)
      .then((response) => {
        memory.editing = false;
        Object.assign(memory, response.data); // Perbarui data dari respons
      }).catch((error) => {
        console.error('Error saving memory:', error);
        alert('Gagal menyimpan perubahan menu.');
      });
  };

  // Batalkan edit
  $scope.cancelEdit = function(memory) {
    memory.editing = false;
    memory.name = memory.originalName;
    memory.description = memory.originalDescription;
    memory.price = memory.originalPrice;
  };

  // Menambahkan item ke keranjang
  $scope.addToCart = function(memory) {
  const existingItem = $scope.cart.find(item => item._id === memory._id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem = angular.copy(memory);
    newItem.quantity = 1;
    $scope.cart.push(newItem);
  }
  localStorage.setItem("cart", JSON.stringify($scope.cart));
  $scope.$applyAsync();
};


  $scope.isCustomer = function() {
    const role = localStorage.getItem("role");
    return role === "customer";  // Memeriksa apakah peran adalah "customer"
  };
  

  // Menghapus item dari keranjang
  $scope.removeFromCart = function(item) {
  const index = $scope.cart.findIndex(cartItem => cartItem._id === item._id);
  if (index > -1) {
    if ($scope.cart[index].quantity > 1) {
      $scope.cart[index].quantity -= 1;
    } else {
      $scope.cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify($scope.cart));
  }
};

$scope.getItemQuantity = function(memoryId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(item => item._id === memoryId);
  return item ? item.quantity : 0;
};

  // Menghitung total harga di keranjang
  $scope.getTotal = function() {
    return $scope.cart.reduce(function(total, item) {
    return total + (item.price * item.quantity);
    }, 0);
  };
});



// Directive untuk file upload
app.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      const model = $parse(attrs.fileModel);
      const modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);
