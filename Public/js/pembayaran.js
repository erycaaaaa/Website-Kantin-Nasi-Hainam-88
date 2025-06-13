var app = angular.module('warung88', []);

app.controller('PembayaranController', function($scope, $http, $window) {
  const params = new URLSearchParams($window.location.search);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart && cart.length > 0) {
      console.log("Cart exists with items");
    } else {
      $window.location.href = 'index.html';
    }

    if (params && Array.from(params).length > 0) {
      console.log("Params exist:", params.toString());
    } else {
      $window.location.href = 'index.html';
    }
    $scope.amount = params.get("total");

     $scope.isUploaded = false;

  $scope.fileSelected = function(files) {
    if (files.length > 0) {
      $scope.selectedFile = files[0];
      $scope.isUploaded = true;
      $scope.$apply(); 
    }
  };

  $scope.continue = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const pesanan = cart.map(item => [item.name, item.quantity]);
    const totalHarga = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const uniqueName = `buktipembayaran-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const username = localStorage.getItem("username");

    if ($scope.selectedFile) {
      const formData = new FormData();
      formData.append("file", $scope.selectedFile);
      formData.append("filename", uniqueName); 

      $http.post("https://eb6415fb-0b14-4e52-919d-efdcc0eb5ab0-00-2j9jbuyxc3a4h.pike.replit.dev/api/datas/upload", formData, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined }
      }).then(function(uploadResponse) {
        const order = {
          username: username,
          tanggal: new Date(),
          pesanan: pesanan,
          totalHarga: totalHarga,
          buktiPembayaran: uploadResponse.data.filename,
          kode: Math.floor(1000 + Math.random() * 9000),
          status: "belum"
        };

        $http.post("https://eb6415fb-0b14-4e52-919d-efdcc0eb5ab0-00-2j9jbuyxc3a4h.pike.replit.dev/api/datas", order)
          .then(function(response) {
            localStorage.removeItem('cart');
            $window.location.href = 'success.html';
          })
          .catch(function(error) {
            console.error('Gagal menyimpan pesanan:', error);
            alert('Gagal menyimpan pesanan.');
          });

      }).catch(function(err) {
        console.error("Upload gagal:", err);
        alert("Gagal upload gambar.");
      });
    } else {
      alert("Silakan upload bukti pembayaran terlebih dahulu.");
    }
  };
});


