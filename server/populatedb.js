console.log('populate data');

var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var User = require('./models/user')
var Question = require('./models/question')
var Answer = require('./models/answer')



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var questions = []
var answers = []

function userCreate(name, email, colorScheme, password, profileURL, address, admin, cb) {
    userdetail = {name:name,email:email,colorScheme:colorScheme,password:password,profileURL:profileURL,address:address,admin:admin }

    var user = new User(userdetail);

    user.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user)
    }  );
}

function questionCreate(type,text,answer,user,choices,cb) {
    var question = new Question({type:type,text:text,answer:answer,user:user,choices:choices});

    question.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Question: ' + question);
        questions.push(question)
        cb(null, question);
    }   );
}

function answerCreate(text,dateslash,datedot,user,qid,cb) {
    answerdetail = {
        text: text,
        dateslash: dateslash,
        datedot: datedot,
        user: user,
        qid: qid
    }

    var answer = new Answer(answerdetail);
    answer.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Answer: ' + answer);
        answers.push(answer)
        cb(null, answer)
    }  );
}



function createUsers(cb) {
    async.series([
            function(callback) {
                userCreate('admin', 'admin@gmail.com', 'light', '$2b$10$DvmyzsS1bn9w0ISpvxKRTugniWayhcRB94ChSq18CBG87e7vZJjJO', 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png','',true, callback);
            },
            function(callback) {
                userCreate('Ben', 'ben@gmail.com',  'light', '$2b$10$DvmyzsS1bn9w0ISpvxKRTugniWayhcRB94ChSq18CBG87e7vZJjJO', 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png','',true, callback);
            },
        ],
        // optional callback
        cb);
}


function createQuestions(cb) {
    async.parallel([
            function(callback) {
                questionCreate('3', '3 question', '',users[0],['','',''],callback);
            },
            function(callback) {
                questionCreate('2', '2 question', '',users[0],['','',''],callback);
            },
            function(callback) {
                questionCreate('1', '1 question', '',users[0],['','',''],callback);
            },
            function(callback) {
                questionCreate('11', '11 question', '',users[1],['','',''],callback);
            },
        ],
        // optional callback
        cb);
}


function createAnswers(cb) {
    async.parallel([
            function(callback) {
                answerCreate('answer1', '6/3/2022', '6.3.2022', users[0], questions[0] ,callback)
            },
            function(callback) {
                answerCreate('answer2', '6/3/2022', '6.3.2022', users[0], questions[1] ,callback)
            },
            function(callback) {
                answerCreate('answer3', '6/3/2022', '6.3.2022', users[0], questions[2] ,callback)
            },
        ],
        // Optional callback
        cb);
}



async.series([
        createUsers,
        createQuestions,
        createAnswers
    ],
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('populated');

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });
