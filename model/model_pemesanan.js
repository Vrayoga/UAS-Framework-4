const connection = require('../config/database');

class Model_Pemesanan {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pemesanan ORDER BY id_pemesanan DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pemesanan WHERE id_pemesanan = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async getCheckedOut() {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.*, b.nama_pembeli, b.alamat, c.nama_menu, c.harga_menu 
                FROM pemesanan AS a
                JOIN pembeli AS b ON b.id_pembeli = a.id_pembeli
                JOIN menu AS c ON c.id_menu = a.id_menu
                WHERE a.status_pemesanan = 'checkout'`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async store(Data) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO pemesanan SET ?';
            connection.query(query, Data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async update(id, Data) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE pemesanan SET ? WHERE id_pemesanan = ?';
            connection.query(query, [Data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM pemesanan WHERE id_pemesanan = ?';
            connection.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Model_Pemesanan;
