const placeRoute = require('./place.route.js');
const initRoute = app => {
    app.use('/place', placeRoute);
}
module.exports = initRoute;
