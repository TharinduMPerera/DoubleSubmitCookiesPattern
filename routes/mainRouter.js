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
        res.cookie('csrf_token', generateCSRFToken(), { httpOnly: false });
        res.cookie('username', req.body.username);
        res.redirect('home');
    } else {
        res.render('../public/views/login', {message: 'Invalid username or password!'});
    }
});

/* POST message. */
router.post('/message', function (req, res, next) {
    var message = '';
    var className = '';
    if (/* validate req.cookies.sessionID && */ req.body.csrf == req.cookies.csrf_token) {
        message = 'CSRF token is valid.';
        className = 'message-success';
    } else {
        message = 'Invalid CSRF token!';
        className = 'message-fail';
    }
    res.render('../public/views/response', {message: message, className: className});
});


module.exports = router;
