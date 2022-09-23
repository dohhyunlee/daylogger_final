const express = require('express');
const router = express.Router();
const { wrapAsync } = require('../utils/helper');
const User = require('../models/user');

router.get('/user', async (req, res) => {
    let users = await User.find({ _id: req.session.userId });
    console.log("users in client:");
    console.dir(users);
    res.json(users);
});

router.get('/user/:admin', async (req, res) => {
    let adminAcc = await User.find({ name: req.body.name });
    res.json(admin);
})

router.get('/users', async (req, res) => {
    let users = await User.find();
    console.log("users in client:");
    console.dir(users);
    res.json(users);
});

/* router.put('/users', async (req, res) => {
    console.log("PUT");
    const id = req.session.userId;
    const {name, email, colorScheme, password, profileURL} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await User.findByIdAndUpdate(id, {name, email, colorScheme,password,profileURL},
        {runValidators: true});
    res.sendStatus(204);
}); */
router.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    User.findByIdAndUpdate(id,
        { 'name': req.body.name, 'email': req.body.email, 'password': req.body.password, 'profileURL': req.body.profileURL, 'address': req.body.address, 'admin': req.body.admin },
        console.log("middle of updating user on server"),
        function (error, result) {
            if (error) {
                console.log("ERROR: " + error);
                res.status(404).send(error.message);
            } else {
                res.sendStatus(204);
            }
        }, { runValidators: true });
    console.log("end of the updating user on server");
});

router.post('/users', async (req, res) => {
    let newUser = await new User({
        email: req.body.email,
        colorScheme: req.body.colorScheme,
        name: req.body.name,
        password: req.body.password,
        profileURL: req.body.profileURL,
        address: req.body.address,
        admin: req.body.admin
    });
    console.log("serverpostuser");
    await newUser.save();
    req.session.userId = newUser._id;
    console.log("newUser:");
    console.dir(newUser);
    res.json(newUser);
});



router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
});

router.post('/register', wrapAsync(async function (req, res) {
    const { name, email, password, colorScheme, profileURL, address, admin } = req.body;
    const user = new User({ name, email, password, colorScheme, profileURL, address, admin });
    await user.save();
    req.session.userId = user._id;
    // Note: this is returning the entire user object to demo, which will include the hashed and salted password.
    // In practice, you wouldn't typically do this – a success status would suffice, or perhaps just the user id.
    res.json(user);
}));

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findAndValidate(email, password);
    console.log(user);
    if (user) {
        req.session.userId = user._id;
        console.log("correct");
        res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
});

router.post('/logout', wrapAsync(async function (req, res) {
    req.session.userId = null;
    res.sendStatus(204);
}));

module.exports = router;