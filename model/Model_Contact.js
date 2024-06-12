const connection = require('../config/database');

class Model_Contact {

    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query('select * from contact order by id_contact desc', (err, rows) => {
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
            connection.query('INSERT INTO contact SET ?', Data, function(err, result){
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getId(id){
        return new Promise((resolve, reject) => {
            connection.query('select * from contact where id_contact = ' + id, (err,rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('update contact set ? where id_contact' + id, Data, function(err, result){
                if(err){
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('delete from contact where id_contact =' + id, function(err,result){
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

}


module.exports = Model_Contact;