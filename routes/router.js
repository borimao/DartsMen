const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home.html');
});
/* GET zero-one page. */
router.get('/zero-one', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
/* GET users listing. */
router.get('/users', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
