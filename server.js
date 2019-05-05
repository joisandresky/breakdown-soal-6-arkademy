// Main File untuk running Server

// Import Package yang diperlukan
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');;
const mongoose = require('mongoose');

// PORT yang digunakan di aplikasi
// Jika Env Var dengan nama PORT di set maka akan di ambil value tersebut tapi jika tidak maka default 8080
const PORT = process.env.PORT || 8080;

// URL DB yang digunakan
// sama dengan PORT, URL DB juga binding dari Env Var dengan nama DB_URL jika kosong maka default nya mongodb://localhost/arkademy
const DB = process.env.DB_URL || 'mongodb://localhost/arkademy';

// inisialisasi Aplikasi ExpressJS
// ExpressJS adalah sebuah framework dari Node.js
const app = express();

// koneksi ke database MongoDB
mongoose.connect(DB);

// Cek jika koneksi berhasil
mongoose.connection.on('connected', () => console.log('Database Connected'));

// Cek jika terjadi error ketika koneksi ke database
mongoose.connection.on('error', (err) => console.log('Error to Connect Database', err));

// set static folder untuk rendering file2 html css dan js client
// disini digunakan untuk membuat sisi Front End
app.use(express.static(path.join(__dirname, "client")));

// Pendaftaran package body parser ke Instance Express App
// .json() digunakan agar server dapat menerima request berbentuk json
app.use(bodyParser.json());
// .urlencoded() digunakan agar server dapat menerima requiest berbentuk form data dan x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// mendaftarkan 1 module API , dalam hal ini adalah kandidat yang berasal dari folder api/candidate
// dengan url routes yang bisa di gunakan yaitu http://somedomain.bla/api/candidates
app.use('/api/candidates', require('./api/candidate'));

// Menjalankan server sesuai dengan PORT yang kita sudah set
app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));