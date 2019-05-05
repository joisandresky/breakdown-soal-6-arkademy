// Import Package yang diperlukan
// Mongoose adalah sebuah package yang digunakan untuk memudahkan Operasi Database MongoDB
// Mongoose membuat sebuah permodelan seperti Eloquent di Laravel CMIW
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Membuat Schema atau Model dari Candidate
const CandidateSchema = new Schema({
    // field name
    name: { type: String, trim: true, required: true },
    // field earned_vote
    earned_vote: { type: Number, default: 0 },
});

// export file ini sebagai Model dari Mongoose agar bisa digunakan di File Controller kita nanti
module.exports = mongoose.model('Candidate', CandidateSchema);