const placeRoute = require('./place.route.js');
const bookingRoute = require('./booking.route.js');
const userRoute = require('./user.route');
const rateRoute = require('./rate.route');
const categoryRoute = require('./category.route');
const initRoute = app => {
    app.use('/api/place', placeRoute);
    app.use('/api/booking', bookingRoute);
    app.use('/api/user', userRoute);
    app.use('/api/rate', rateRoute);
    app.use('/api/category', categoryRoute);
}
module.exports = initRoute;
