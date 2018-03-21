//Load friends
var friends = require("../data/friends.js");
var questions = require("../data/questions.js");


module.exports = function(app) {
    app.get("/api/questions", function(req, res) {
        res.json(questions);
    });

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    //Post survey answers to friends.js
    app.post("/api/friends", function(req, res) { 
        
        var username = req.body.name;
        var userPhoto = req.body.photo;
        var userScores = [];

        req.body.scores.forEach(function(score) {
            userScores.push(parseInt(score));
        });

        var newUser = {
            name: username,
            photo: userPhoto,
            scores: userScores
        };

        //Add to friends
        friends.push(newUser);
          
        //Loop through friends.js to and store differences in variable
        friends.forEach(function(friend) {
            if (friend.name !== username) {
                var differences = [];

                for (i = 0; i < userScores.length; i++ ) {
                    differences.push(Math.abs(friend.scores[i] - userScores[i]));
                }

                console.log(differences);

                var difference = 0;

                differences.forEach(function(number) {
                    difference = difference + number
                })

                console.log("Difference: " + difference);

                friend.difference = difference;
            }
        })

        //Find user with lowest differnce

        var matchName
        var matchPhoto
        var matchScore = Number.POSITIVE_INFINITY;

        friends.forEach(function(friend) {
            if (friend.name != username) {
                if (friend.difference < matchScore) {
                    matchScore = friend.difference;
                    matchName = friend.name;
                    matchPhoto = friend.photo;
                }
            }
        })

        var yourMatch = {
            name: matchName,
            photo: matchPhoto,
            score: matchScore
        }

        console.log(matchName);
        console.log(matchPhoto);
        console.log(matchScore);
        
        //Display image and name of match name != user's name


        res.json(yourMatch);

    });

    app.delete("/api/delete", function(req, res) {
        var deleteFriend = req.body.index;

        friends.splice(deleteFriend, 1);

        res.json(friends);
    })
}