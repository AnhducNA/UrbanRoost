const connection = require("../database");

class RateModel {
    static async getRateList(limit, offset) {
        limit = (limit) ? limit : 10;
        offset = (offset) ? offset : 0;
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM rate
                ORDER BY rate.id DESC
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
    static async getRateById(rateId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT rate.*, from_user.name as from_user_name,
                 to_user.name as to_user_name FROM rate
                JOIN user as from_user on rate.from_user_id = from_user.id
                JOIN user as to_user on rate.to_user_id = to_user.id
                WHERE rate.id = ?`,
                rateId,
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

module.exports = RateModel;
