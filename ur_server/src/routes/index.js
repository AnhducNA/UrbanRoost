const placeRoute = require('./place.route.js');
const initRoute = app => {
    app.use('/places', placeRoute);
}
module.exports = initRoute;
