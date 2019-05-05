// import package yang diperlukan
const express = require('express');

// import library Router dari package express
const router = express.Router();

// import file Controller Candidate yang berisi function2 untuk tiap routes
const controller = require('./candidate.controller');

// root routes (/api/candidates) dengan method GET
// API yang berfungsi untuk mendapatkan seluruh data candidate
// menggunakan fungsi yang berada pada file controller kita dengan nama index
router.get('/', controller.index);

// routing untuk seeding data candidate (/api/candidates/seed) dengan method GET
// FYI disini saya tidak membuat CRUD untuk module Candidate jadi disini untuk pengisian data nya saya menyediakan 1 API untuk seeding data
// menggunakan fungsi yang berada pada file controller kita dengan nama seeding
router.get('/seed', controller.seeding);

// routing untuk aksi Voting Candidate (/api/candidates/:id) dengan method PUT
// API yang berfungsi untuk melakukan aksi ketika pemilih melakukan Voting pada Paslon
// dan juga mengirimkan parameter ID dari Paslon yang di pilih
// menggunakan fungsi yang berada pada file controller kita dengan nama vote
router.put('/:id', controller.vote);

// export variable router agar dapat di daftarkan di file server.js
// lihat Line ke 42 di file server.js
module.exports = router;