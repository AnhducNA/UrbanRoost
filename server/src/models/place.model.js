const connection = require('../database');


class PlaceModel {
    static async getPlaces(limit, offset) {
        limit = (limit) ? limit : 10;
        offset = (offset) ? offset : 0;
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT place.*, place_type.type_name, place_type.description, rate.star, rate.content FROM place 
                LEFT JOIN place_type ON place.place_type_id = place_type.id 
                LEFT JOIN rate ON place.id=rate.place_id 
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

    static async getTotalPlaces() {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT count(*) as count FROM place 
                LEFT JOIN place_type ON place.place_type_id = place_type.id 
                LEFT JOIN rate ON place.id=rate.place_id`,
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
                `SELECT place.*, user.name as name_user FROM place LEFT JOIN user ON place.user_id=user.id
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
