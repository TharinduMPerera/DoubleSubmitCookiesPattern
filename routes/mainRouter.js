var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function (req, res, next) {
    if (req.session.username) {
        res.render('../public/views/home');
    } else {
        res.redirect('login');
    }
});

/* GET login page. */
router.get('/login', function (req, res, next) {
    res.render('../public/views/login', {message: ''});
});

/* GET home page. */
router.get('/home', function (req, res, next) {
    if (req.session.user) {
        res.render('../public/views/home');
    } else {
        res.send(401);
    }
});

module.exports = router;
