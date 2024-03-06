const connection = require("../database");

class BookingModel {
    static async getBookings(limit, offset) {
        limit = (limit) ? limit : 10;
        offset = (offset) ? offset : 0;
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT booking.*, user.name as user_name, place.price as place_price, 
                place.title as place_title FROM booking
                JOIN user ON booking.user_id = user.id
                JOIN place ON booking.place_id = place.id
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
    static async getBookingById(bookingId) {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT booking.*, user.name as user_name, user.email as user_email,
                place.title as place_title, place.location as place_location, 
                place.price as place_price, place.state as place_state FROM booking
                JOIN user ON booking.user_id = user.id
                JOIN place ON booking.place_id = place.id
                WHERE booking.id = ?`,
                bookingId,
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

module.exports = BookingModel;
