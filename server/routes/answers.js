const express = require('express');
const router = express.Router();
/* const Question = require('../models/question'); */
const Answer = require('../models/answer');
const { isLoggedIn } = require('../middleware/auth');
const mongoose = require('mongoose');
const Question = require('../models/question');

router.get('/allanswers', async (req, res) => {
    //set req session questionId
    let answers = await Answer.find(); //set questionId to req.session.Id somewhere
    res.json(answers);
});

router.get('/answers', async (req, res) => {
    //set req session questionId
    let answers = await Answer.find({ user: req.session.userId }); //set questionId to req.session.Id somewhere
    res.json(answers);
});

router.get('/answers/:date', async (req, res) => {
    //set req session questionId
    console.log("req.params.datedot: " + req.params.date);
    let answers = await Answer.find({ datedot: req.params.date, user: req.session.userId }); //set questionId to req.session.Id somewhere
    console.log("answers in server: " + answers);
    res.json(answers);
});

router.get('/answers/qid/:qid', async (req, res) => {
    //set req session questionId
    console.log("req.params.qid: " + req.params.qid);
    let answers = await Answer.find({ qid: req.params.qid, user: req.session.userId }); //set questionId to req.session.Id somewhere
    console.log("answers in server: " + answers);
    res.json(answers);
});

router.put('/answers/:id', async (req, res) => {
    const id = req.params.id;
    const { text, dateslash, datedot, user, qid } = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    // This below method automatically saves it to the database
    // findByIdAndUpdate by default does not run the validators, so we need to set the option to enable it.
    // This below method automatically saves it to the database. Note this code works
    // using a JavaScript syntactic sugar that requires the variables to be the same name
    // as the schema keys.
    await Answer.findByIdAndUpdate(id, { text, dateslash, datedot, user, qid },
        { runValidators: true });
    // Status 204 represents success with no content
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
    res.sendStatus(204);
});

router.post('/answers', async (req, res) => {
    console.log("creating a new answer...");

    let newAnswer = await new Answer({
        text: req.body.text,
        dateslash: req.body.dateslash,
        datedot: req.body.datedot,
        user: req.session.userId,
        qid: req.body.qid,
    });
    console.log("serverpost");
    await newAnswer.save();
    console.log("This is the new answer:" + newAnswer);
    res.json(newAnswer);
});

// router.delete('/:id', async (req, res) => {
//   await res.redirect('/');
// });

router.delete('/answers/:qid', async (req, res) => {
    const result = await Answer.deleteMany({qid: req.params.qid});
    console.log("Deleted successfully: " + result);
    res.json(result);
});

module.exports = router;