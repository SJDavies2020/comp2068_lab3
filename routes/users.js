var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var users = await User.find({});
    res.render('users/list', { users });
});

router.get('/:id', async function (req, res, next) {
    var user = await User.findById(req.params.id);
    res.render('users/details', { user, error: req.flash('error') });
});

router.post(
    '/:id',
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }

        const role = req.user.role;
        if (role === 'admin') {
            return next();
        } else {
            req.flash('error', 'You must be an admin to do this');
            return res.redirect(`/users/${req.params.id}`);
        }
    },
    async function (req, res, next) {
        var user = await User.findByIdAndUpdate(req.params.id, {
            role: req.body.role
        });

        res.redirect(`/users/${req.params.id}`);
    }
);
module.exports = router;