const connection = require('../database');


class Place {
    static async getPlaces() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM place';
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
