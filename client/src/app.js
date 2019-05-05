angular.module('arkademy', ['ui.bootstrap', 'ui.router', 'ngTable'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'src/templates/candidate.html'
      })
  })
  .controller('MasterCtrl', function ($http, $state, $scope) {
    // INTI NYA ADA DISINI
    // Untuk Hal lain bisa belajar Basic Angular.js dulu (angular 1)

    // buat variable array candidates untuk ditampilkan ditemplate nanti
    $scope.candidates = [];

    // fungsi yang melakukan get data candidates (/api/candidates - method GET)
    function getData() {
      $http.get('/api/candidates').then(function (candidates) {
        console.log('cand', candidates);
        // menyimpan data response yang didapat ketika fetching API berhasil ke dalam variable candidates
        $scope.candidates = candidates.data;
      }).catch(function (err) {
        // logging ketika terjadi error saat fetching API
        console.log('err', err);
      });
    }

    // memanggil function get data ketika file controller ini sudah di muat atau ketika halaman sudah dirender
    getData();

    // fungsi untuk tombol voting Paslon yang mengambil parameter data paslon
    $scope.vote = function (cn) {
      // Munculkan sebuah alert untuk mengkonfirmasi pilihan
      if (confirm('Apakah kamu yakin ingin memilih Pasangan Calon ' + cn.name + ' ?')) {
        // melakukan fetching API ke (/api/candidates/:id) dan mengirimkan id dari candidate
        // yang berada di parameter cn di function tsb.
        $http.put('/api/candidates/' + cn._id, {}).then(function (res) {
          console.log('ress', res);
          // menampilkan alert ketika Vote berhasil
          alert(res.message ? res.message : 'Vote Success');

          // Memanggil function get data candidate untuk merefresh data Saat ini
          getData();
        }).catch(function (err) {
          // loggin ketika terjadi error fetching API
          console.log('err');
        });
      }
    }
  });