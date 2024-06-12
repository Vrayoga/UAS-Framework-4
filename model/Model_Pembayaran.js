const connection = require('../config/database');

class Model_Pembayaran {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('select * from pembayaran order by id_pembayaran desc', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            // Destructure the input data to extract necessary fields
            const {
                id_menu,
                id_users,
                jumlah
            } = Data;

            // Check if there is an existing unpaid payment with the same id_menu and id_users
            const checkQuery = 'SELECT * FROM pembayaran WHERE id_menu = ? AND id_users = ? AND status_pembayaran = "belum dibayar"';
            connection.query(checkQuery, [id_menu, id_users], function (checkErr, checkResult) {
                if (checkErr) {
                    reject(checkErr);
                    console.log(checkErr);
                } else if (checkResult.length > 0) {
                    // If found, update the jumlah
                    const updateQuery = 'UPDATE pembayaran SET jumlah = jumlah + ? WHERE id_menu = ? AND id_users = ? AND status_pembayaran = "belum dibayar"';
                    connection.query(updateQuery, [jumlah, id_menu, id_users], function (updateErr, updateResult) {
                        if (updateErr) {
                            reject(updateErr);
                            console.log(updateErr);
                        } else {
                            resolve(updateResult);
                            console.log(updateResult);
                        }
                    });
                } else {
                    // If not found, insert new entry
                    const insertQuery = 'INSERT INTO pembayaran SET ?';
                    connection.query(insertQuery, Data, function (insertErr, insertResult) {
                        if (insertErr) {
                            reject(insertErr);
                            console.log(insertErr);
                        } else {
                            resolve(insertResult);
                            console.log(insertResult);
                        }
                    });
                }
            });
        });
    }


    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.*, b.gambar_menu, b.nama_menu, b.harga_menu 
                FROM pembayaran AS a
                JOIN menu AS b ON b.id_menu=a.id_menu
                WHERE a.id_users = ? AND a.status_pembayaran = 'belum dibayar'`, id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            let query = connection.query('update pembayaran set ? where id_users =' + id, Data, function (err, row, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                    console.log(row)
                }
            })
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('delete from pembayaran where id_pembayaran =' + id, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

}


module.exports = Model_Pembayaran;