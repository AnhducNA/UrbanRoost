const connection = require('../database');

class CategoryModel {
    static async getCategoryList(limit, offset) {
        limit = (limit) ? limit : 10;
        offset = (offset) ? offset : 0;
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT category.* FROM category 
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
    };
    static async getCategoryTotal() {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT count(*) as count FROM category `,
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

    static async getCategoryById(categoryId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM category
                WHERE category.id = ? `,
                [categoryId],
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

    static async categoryNew(
        name,
        description
    ) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO category (name, description)  VALUES(?, ?)`;
            connection.query(
                sql,
                [name, description],
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
    static async categoryUpdate(
        id,
        name,
        description
    ) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE category SET name = ?, description = ? WHERE id = ?`;
            connection.query(
                sql,
                [name, description, id],
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
    static async deleteCategoryById(
        id
    ) {
        return new Promise((resolve, reject) => {
            connection.query(
                `DELETE FROM category WHERE id = ?`,
                [id],
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

module.exports = CategoryModel;
