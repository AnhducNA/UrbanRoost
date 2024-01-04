'use strict';
module.exports = function(app) {
    let placesController = require('./controllers/PlacesController');

    // todoList Routes
    app.route('/places')
        .get(placesController.get)
        .post(placesController.store);

    app.route('/places/:placeId')
        .get(placesController.detail)
        .put(placesController.update)
        .delete(placesController.delete);
};
