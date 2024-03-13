const connection = require('../database');

class AuthModel {
    static async getUserByEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            connection.query (
                `SELECT * FROM user 
                WHERE user.email = ? AND user.password= ?`,
                [email, password],
                (err, response) => {
                    if (err) {
                        reject(err);
                        console.log(err.message, err.sql)
                        return;
                    }
                    resolve(response);
                }
            );
        });
    }
    static async getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            connection.query (
                `SELECT * FROM user 
                WHERE user.email = ?`,
                [email],
                (err, response) => {
                    if (err) {
                        reject(err);
                        console.log(err.message, err.sql)
                        return;
                    }
                    resolve(response);
                }
            );
        });
    }

    static async newUser(name, email, password, phone) {
        return new Promise((resolve, reject) => {
            connection.query(
                `INSERT INTO user (name, email, password, phone) VALUES(?, ?, ?, ?)`,
                [name, email, password, phone],
                (err, response) => {
                    if (err) {
                        reject(err);
                        throw err;
                    }
                    resolve(response);
                }
            )
        });
    }

}

module.exports = AuthModel;
