const connection = require('../config/database');

class Model_Menu {

    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query(`select *, b.nama_kategori from menu as a
            join kategori as b on b.id_kategori=a.id_kategori
            order by a.id_menu desc`, (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Store(Data){
        return new Promise((resolve, reject) => {
            connection.query('insert into menu set ?', Data, function(err, result){
                if(err){
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async getbyId(id){
        console.log('ID passed to getId:', id);
        return new Promise((resolve, reject) => {
            connection.query(`select *, b.nama_kategori from menu as a
            join kategori as b on b.id_kategori=a.id_kategori
            where a.id_menu = ` + id, (err,rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows);
                    console.log(id);
                }
            })
        })
    }

    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('update menu set ? where id_menu =' + id, Data, function(err, result){
                if(err){
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                    console.log(Data)
                }
            })
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('delete from menu where id_menu =' + id, function(err,result){
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async getId(id_kategori){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM menu WHERE id_kategori = ?', [id_kategori], function(error, results) {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        })
    }

   
}


module.exports = Model_Menu;