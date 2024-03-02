const connection = require('../database');


class Place {
    static async getPlaces() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT place.*, place_type.type_name, place_type.description, rate.star, rate.content FROM place 
                LEFT JOIN place_type ON place.place_type_id = place_type.id 
                LEFT JOIN rate ON place.id=rate.place_id`;
            connection.query(
                sql,
                (err, response) => {
                    if (err) {
                        reject(err);
                        console.log(err)
                        return;
                    }
                    resolve(response);
                }
            );
        });
    }

    static async getPlaceById(placeId) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM place WHERE place.id = ` + placeId +
                `LEFT JOIN rate ON place.id = rate.id`;
            connection.query(
                sql,
                (err, response) => {
                    if (err) {
                        reject(err);
                        console.log(err)
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

module.exports = Place;
