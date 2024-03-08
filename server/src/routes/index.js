const placeRoute = require('./place.route.js');
const bookingRoute = require('./booking.route.js');
const userRoute = require('./user.route');
const initRoute = app => {
    app.use('/api/place', placeRoute);
    app.use('/api/booking', bookingRoute);
    app.use('/api/user', userRoute);
}
module.exports = initRoute;
