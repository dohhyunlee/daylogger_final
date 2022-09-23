const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const {isLoggedIn} = require('../middleware/auth');
const mongoose = require('mongoose');
const current = new Date();

router.get('/allquestions', async (req, res) => {
    let notes = await Question.find();
    res.json(notes);
});

router.get('/questions', async (req, res) => {
    let notes = await Question.find({user: req.session.userId});
    res.json(notes);
});

router.get('/questions/:id', async (req, res) => {
    console.log("req.params.id: " + req.params.id);
    let questions = await Question.find({_id: req.params.id});
    res.json(questions);
});

router.get('/questions/:date', async (req, res) => {
    console.log("req.params.date: ");
    console.log(req.params.datedot); 
    let questions = await Question.find({datedot: req.params.date});
    res.json(questions);
});

router.put('/questions/:id', async (req, res) => {
    const id = req.params.id;
    const {type, text, answer, user, choices} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    // This below method automatically saves it to the database
    // findByIdAndUpdate by default does not run the validators, so we need to set the option to enable it.
    // This below method automatically saves it to the database. Note this code works
    // using a JavaScript syntactic sugar that requires the variables to be the same name
    // as the schema keys.
    await Question.findByIdAndUpdate(id, {type, text, answer, user, choices},
        {runValidators: true});
    // Status 204 represents success with no content
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204
    res.sendStatus(204);
});

router.post('/questions',async (req, res) => {
    let newQuestion = await new Question({
        type: req.body.type,
        text: req.body.text,
        answer: req.body.answer,
        user: req.session.userId,
        choices : req.body.choices
    });
    console.log("serverpost");
    await newQuestion.save();
    req.session.questionId = newQuestion._id;
    res.json(newQuestion);
});

// router.delete('/:id', async (req, res) => {
//   await res.redirect('/');
// });

router.delete('/questions/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Question.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
});

module.exports = router;