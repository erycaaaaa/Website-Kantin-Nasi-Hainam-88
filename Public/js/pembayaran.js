var app = angular.module('warung88', []);

app.controller('PembayaranController', function($scope, $http, $window) {
    const params = new URLSearchParams($window.location.search);
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

    // Generate filename
    const uniqueName = `buktipembayaran-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const username = localStorage.getItem("username");

    // Step 1: Upload the file first
    if ($scope.selectedFile) {
      const formData = new FormData();
      formData.append("file", $scope.selectedFile);
      formData.append("filename", uniqueName); // Send filename to backend

      $http.post("http://localhost:5000/api/datas/upload", formData, {
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

        $http.post("http://localhost:5000/api/datas", order)
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


