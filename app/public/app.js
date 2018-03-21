//Create Form
$.get("/api/questions", function(data) {
    console.log(data);

    for ( i = 0; i < data.length; i ++) {
        var questionNumber = i + 1;
        var question = $("<h3>").text(questionNumber + ". " + data[i]);
        var answer = $("<select>").addClass("form-control").attr("id", "q" + questionNumber)
                    .append($("<option>").text("").attr("value", "").addClass(answer))
                    .append($("<option>").text("1").attr("value", 1).addClass(answer))
                    .append($("<option>").text("2").attr("value", 2).addClass(answer))
                    .append($("<option>").text("3").attr("value", 3).addClass(answer))
                    .append($("<option>").text("4").attr("value", 4).addClass(answer))
                    .append($("<option>").text("5").attr("value", 5).addClass(answer));

        $("#survey-questions").append(question).append(answer);
    }
})

//Capture form answers on submit
$("#submit").on("click", function(event) {
    event.preventDefault();

    //Validate form      
    function validate() {
        var valid = true;

        $(".form-control").each(function() {
            if ($(this).val() === "") {
                valid = false;
            }
        })

        return valid;
    }

    if (validate()) {

        //Capture survey responses
        var name = $("#name").val().trim();
        var photo = $("#photo").val();
        var scores = [
           $("#q1").val(),
           $("#q2").val(),
           $("#q3").val(),
           $("#q4").val(),
           $("#q5").val(),
           $("#q6").val(),
           $("#q7").val(),
           $("#q8").val(),
           $("#q9").val(),
           $("#q10").val()
        ]

        console.log(scores);

        //Create new user object
        var userData = {
            name: name,
            photo: photo,
            scores: scores
        };

        console.log("User Data:");
        console.log(userData);

        //Send to friends.js
        $.post("/api/friends", userData, function(data) {
            console.log("Photo: " + data.photo);

            var matchPhoto = $("<img>").attr("src", data.photo);

            //Receive photo and name of match
            $("#matchName").text(data.name);
            $("#matchPhoto").html(matchPhoto);
            $("#matchScore").text(data.score);

            //Use in modal and show
            $("#matchModal").modal("toggle");

        })


    } else {
        alert("Please answer every question");
    }
})



//POST method


