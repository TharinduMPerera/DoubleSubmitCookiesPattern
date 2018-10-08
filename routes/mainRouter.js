var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

function generateCSRFToken() {
    return uuid();
}

/* GET login page. */
router.get('/', function (req, res, next) {
    if (req.cookies['username']) {
        res.redirect('home')
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
    if (req.cookies['username']) {
        res.render('../public/views/home');
    } else {
        res.send(401);
    }
});

/* POST login. */
router.post('/login', function (req, res, next) {
    if (req.body.username == "admin" && req.body.password == "admin") {
        res.cookie('csrf_token', generateCSRFToken());
        res.cookie('username', req.body.username);
        res.redirect('home');
    } else {
        res.render('../public/views/login', {message: 'Invalid username or password!'});
    }
});

module.exports = router;
