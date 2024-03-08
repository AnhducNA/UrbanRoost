const connection = require("../database");

class UserModel {
    static async getUserList(limit, offset) {
        limit = (limit) ? limit : 10;
        offset = (offset) ? offset : 0;
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM user
                ORDER BY user.id DESC
                LIMIT ? OFFSET ? `,
                [+limit, +offset],
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
    static async getUserById(userId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM user
                WHERE user.id = ?`,
                userId,
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
    static async getBookingByUserId(userId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT booking.*, place.title as place_title,
                place.price as place_price FROM booking
                JOIN place ON booking.place_id = place.id
                WHERE booking.user_id = ?
                ORDER BY booking.id DESC`,
                userId,
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
    static async getPlaceByUserId(userId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT *  FROM place
                WHERE place.user_id = ?
                ORDER BY place.id DESC`,
                userId,
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
    static async getRateByUserId(userId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT *  FROM rate
                WHERE rate.from_user_id = ?
                ORDER BY rate.id DESC`,
                userId,
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
}

module.exports = UserModel;
