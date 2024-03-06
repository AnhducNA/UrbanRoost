const placeRoute = require('./place.route.js');
const bookingRoute = require('./booking.route.js');
const initRoute = app => {
    app.use('/api/place', placeRoute);
    app.use('/api/booking', bookingRoute);
}
module.exports = initRoute;
