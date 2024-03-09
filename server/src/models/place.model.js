const connection = require('../database');


class PlaceModel {
    static async getPlaces(limit, offset) {
        limit = (limit) ? limit : 10;
        offset = (offset) ? offset : 0;
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT place.* FROM place 
                LIMIT ? OFFSET ?`,
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

    static async getPlaceById(placeId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT place.*, user.name as user_name FROM place
                LEFT JOIN user ON place.user_id=user.id
                WHERE place.id = ? `,
                placeId,
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
    static async getRateAboutPlaceId(placeId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM rate
                WHERE rate.place_id = ? `,
                placeId,
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

    static async createPlace(title) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO place (title) VALUES(?)`;
            connection.query(
                sql,
                [title],
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

module.exports = PlaceModel;
