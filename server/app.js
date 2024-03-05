const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const initRoute =require('./src/routes');
const router = express.Router();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

initRoute(app);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});

