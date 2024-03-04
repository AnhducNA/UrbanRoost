const placeRoute = require('./place.route.js');
const initRoute = app => {
    app.use('/api/place', placeRoute);
}
module.exports = initRoute;
