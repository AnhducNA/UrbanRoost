const connection = require('../database');


class PlaceModel {
    static async getPlaceList(limit, offset, search) {
        limit = (limit) ? limit : 10;
        offset = (offset) ? offset : 0;
        return new Promise((resolve, reject) => {
            const query = connection.query(
                `SELECT place.*, user.name as user_name, user.avatar as user_avatar 
                FROM place 
                JOIN user ON place.user_id = user.id
                WHERE place.title LIKE '%${search}%' OR place.location LIKE '%${search}%'
                LIMIT ${limit} OFFSET ${offset}`,
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

    static async getPlaceCount() {
        return new Promise((resolve, reject) => {
            const query = connection.query(
                `SELECT count(*) as count FROM place`,
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

    static async getPlaceListBySearchAdvanced(limit, offset, search, search_place_category) {
        limit = (limit) ? limit : 10;
        offset = (offset) ? offset : 0;
        return new Promise((resolve, reject) => {
            const query = connection.query(
                `SELECT place.* , user.name as user_name, user.avatar as user_avatar 
                FROM place 
                JOIN user ON place.user_id = user.id
                JOIN place_category on place.id = place_category.place_id
                WHERE place.title LIKE '%${search}%' 
                OR place.location LIKE '%${search}%' 
                OR place_category.category_id = ${search_place_category}
                LIMIT ${limit} OFFSET ${offset}`,
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
    };
    static async getImageByPlaceId(placeId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM image
                WHERE image.place_id = ? `,
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
    };
    static async getCategoryByPlaceId(placeId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT category.* FROM category
                JOIN place_category ON place_category.category_id = category.id
                WHERE place_category.place_id = ? `,
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
    };

    static async placeNew(title) {
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
    };

    static async placeUpdate(
        id,
        title,
        description,
        location,
        price,
        state,
    ) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE place SET title = '${title}', description = '${description}', location = '${location}', price = '${price}', state = '${state}' WHERE id = ${id}`;
            connection.query(
                sql,
                (err, response) => {
                    if (err) {
                        reject(err);
                        throw err;
                    }
                    resolve(response);
                }
            )
        });
    };

    static async deletePlaceCategoryByPlaceId(
        place_id
    ) {
        return new Promise((resolve, reject) => {
            connection.query(
                `DELETE FROM place_category WHERE place_category.place_id = ?`,
                [place_id],
                (err, response) => {
                    if (err) {
                        reject(err);
                        throw err;
                    }
                    resolve(response);
                }
            )
        });
    };

    static async newPlaceCategory(
        place_id,
        category_id
    ) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO place_category (place_id, category_id)  VALUES(?, ?)`;
            connection.query(
                sql,
                [place_id, category_id],
                (err, response) => {
                    if (err) {
                        reject(err);
                        throw err;
                    }
                    resolve(response);
                }
            )
        });
    };

    static async deleteImageByPlaceId(
        place_id
    ) {
        return new Promise((resolve, reject) => {
            connection.query(
                `DELETE FROM image WHERE image.place_id = ?`,
                [place_id],
                (err, response) => {
                    if (err) {
                        reject(err);
                        throw err;
                    }
                    resolve(response);
                }
            )
        });
    };

    static async newImage(
        image, place_id
    ) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO image (image, place_id)  VALUES(?, ?)`;
            connection.query(
                sql,
                [image, place_id],
                (err, response) => {
                    if (err) {
                        reject(err);
                        throw err;
                    }
                    resolve(response);
                }
            )
        });
    };
}

module.exports = PlaceModel;
