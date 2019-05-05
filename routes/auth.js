var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET /auth/google. */
router.get(
    '/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get( '/google/callback',  passport.authenticate('google'));

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
