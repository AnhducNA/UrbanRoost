const connection = require('../database');


class Place {
    static async getPlaces() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM place` +
                `JOIN place_type ON place.place_type_id = place_type.id ` +
                `LEFT JOIN rate ON place.id = rate.id `;
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
}

module.exports = Place;
