var express = require('express');
var router = express.Router();

const { getHomePageContent } = require('../controllers/homeController');

router.get('/', getHomePageContent);

module.exports = router;
