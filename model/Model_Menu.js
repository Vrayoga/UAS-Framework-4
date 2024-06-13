const connection = require('../config/database');

class Model_Menu {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`select *, b.nama_kategori from menu as a
            left join kategori as b on b.id_kategori=a.id_kategori
            left join outlet as c on c.id_outlet=a.id_outlet
            order by a.id_menu desc`, (err, rows) => {
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
            connection.query('insert into menu set ?', Data, function (err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async getbyId(id) {
        console.log('ID passed to getId:', id);
        return new Promise((resolve, reject) => {
            connection.query(`select *, b.nama_kategori from menu as a
            join kategori as b on b.id_kategori=a.id_kategori
            where a.id_menu = ` + id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                    console.log(id);
                    console.log(id);
                }
            })
        })
    }

    static async UpdateMenu(id, Data) {
        return new Promise((resolve, reject) => {
            let query = connection.query('update menu set ? where id_menu =' + id, Data, function (err, result) {
                if (err) {
                    reject(err);
                    console.log("ini error" ,err);
                } else {
                    resolve(result);
                    console.log("hasil Update", result)
                }
            })
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('delete from menu where id_menu =' + id, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async getId(id_kategori) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM menu WHERE id_kategori = ?', [id_kategori], function (error, results) {
                if (error) {
                    return reject(error);
                } else {
                    resolve(results);
                }
            });
        })
    }

    static async getIdAdmin(id) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT *, b.nama_kategori, c.nama_outlet FROM menu as a
            left join kategori as b on b.id_kategori=a.id_kategori
            left join outlet as c on c.id_outlet=a.id_outlet
            WHERE id_menu = ?`, [id], function (error, results) {
                if (error) {
                    return reject(error);
                    console.log(error);
                } else {
                    resolve(results); 
                }
            });
        });
    }
    
    

}


module.exports = Model_Menu;