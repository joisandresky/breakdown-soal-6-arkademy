// Import Model Candidate yang kita sudah buat tadi
const Candidate = require('./candidate.model');

// fungsi index digunakan untuk Route (/api/candidates) method GET
exports.index = function (req, res) {
    // Menggunakan model kita untuk get semua data tanpa query apapun dari database
    Candidate.find().exec(function (err, candidates) {
        // jika terjadi error maka return response dengan code 500 ke client
        if (err) return res.status(500).send(err);

        // jika berhasil maka berikan response ke client berupa data candidates yang didapat
        res.json(candidates);
    });
};

// fungsi seeding data digunakan untuk Route (/api/candidates/seed) method GET
exports.seeding = function (req, res) {
    // buat variable ber tipe array object
    // disini mongoose mempunya kelebihan yaitu bisa melakukan multi create dengan hanya membuat data array
    // disini saya buat 2 data paslon dengan nama nya dan earned_vote awal yaitu 0
    let candidates = [
        {
            name: "Jokowi-Ma`Ruf",
            earned_vote: 0
        }, {
            name: "Prabowo-Sandi",
            earned_vote: 0
        }
    ];

    // Disini saya melakukan counting terlebih dahulu karna saya tidak ingin tejadi double seeding data
    Candidate.count().exec(function (err, count) {
        // Jika data candidate sudah ada maka saya tidak melakukan seeding lagi
        // melainkan memberikan response langsung bahwa Paslon sudah Ada!
        if (count > 0) return res.status(200).json({ message: "Paslon Sudah Ada!" });

        // Jika belum ada maka dilanjutkan dengan membuat data Candidate tersebut dan masukan Variable candidates tadi di line ke 21
        Candidate.create(candidates, function (err, candidates) {
            // jika terjadi error saat membuat data, maka return response ke client dengan Kode 500
            if (err) return res.status(500).send("INTERNAL SERVER ERROR!");

            // jika berhasil maka return response ke client dengan code 201 dan sebuah pesan
            return res.status(201).json({ message: "Paslon Berhasil di Buat!" });
        });
    });
};

// fungsi voting paslon digunakan untuk Route (/api/candidates/:id) method PUT
exports.vote = function (req, res) {
    // cek jika client tidak mengirimkan parameter ID maka langsung return response dengan code 400 dan sebuah pesan
    if (!req.params.id) return res.status(400).json({ message: "Param ID cannot be null" });

    // Melakukan pencarian 1 data candidate di database dengan menggunakan id yang diberikan oleh Client
    Candidate.findOne({ _id: req.params.id }).exec(function (err, candidate) {
        // jika terjadi error maka return response dengan code 500 ke client        
        if (err) return res.status(500).send("INTERNAL SERVER ERROR");

        // jika candidate tidak ditemukan atau variable candidate berisi null maka,
        // return response dengan code 404 dan pesan ke client
        if (!candidate) return res.status(404).json({ message: "Candidate not Found!" });

        // proses penambahan earned_vote
        // disini nilai earned_vote saat ini ditambahkan dengan nilai 1
        candidate.earned_vote += 1;

        // melakukan penyimpanan data yang sudah di ubah dari variable candidate yang didapat tadi
        candidate.save(function (err) {
            // jika terjadi error maka return response dengan code 500 ke client
            if (err) return res.status(500).send("INTERNAL SERVER ERROR");

            // jika berhasil maka return response 200 dan sebuah pesan ke client
            return res.status(200).json({ message: `You Are Voted ${candidate.name}!` });
        });
    });
}