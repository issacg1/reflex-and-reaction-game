//global lets
let player = {};
let countdown = 60;
let intervalDecrease = 0;
let starterCountDown = 3;
let color = ["red", "blue", "green", "pink", "yellow", "brown", "blue", "orange"];
let pieces = ["piece1", "piece2", "piece3", "piece4", "piece5", "piece6", "piece7", "piece8"];
let shape = ["100px", "0px", "0px", "100px", "0px", "100px", "0px", "100px"];
let randomIndex = 0;
let arrayOfRandomNumbers = [];

$(document).ready(function(){
    console.log("up and running!");

    //Constructer function to create the player
    function User(name, length){
        this.name = name;
        this.length = length;
    };

    //index page start button captures the data and passes it on
    $("#startButton").click(function() {
        let name = $("#userName").val();
        let length = $("input[name='timeOption']:checked").val();

        console.log(name);
        console.log(length);
        if (name.length > 1 && length >= 30) {
            player = new User(name, length);
            countdown = parseInt(player.length);
            console.log(player.name);
            console.log(countdown);
        }
        else{
            //!!potentially make this look like a real error
            alert("all fields are required. Please select a time frame and enter your name then click the start button")
        }
    });

    //Decreases the time left and stops the interval.
    //!!need to display this to the user.
    function decreaseCount () {
        if(starterCountDown >= 0) {
            $("#instructionCopy").text(starterCountDown);
            starterCountDown -= 1;
        }
        else if(countdown >= 0 && starterCountDown === -1) {
            $("#timeLeft").text("Time left:" + " " + countdown);
            countdown -= 1;
        }
        else {
            clearInterval(intervalDecrease);
        }
    }

    //A one second pause to run the decreaser function for the users time left as well as the first countdown
    function ticker(){
        intervalDecrease = setInterval(decreaseCount, 1000);
    }

    //button to officialy start level 1.
    $("#startButton2").click(function() {
        ticker();
        randomColor();
        randomShape();
    });

    //random number generater
    function setRandomInt() {
        min = Math.ceil(0);
        max = Math.floor(9);

        randomIndex = Math.floor(Math.random() * (max - min)) + min;
    }

    //creates the click function for each div
    function creater(){
        $(".piecesContainer").on("click", "div", function(){
            randomColor();
            randomShape();
        });
    }

    //gives each div a random color
    function randomColor(){
        $(".shape").each(function(){
            setRandomInt();

            /**
             * If randomIndex is not an index found in the array of random numbers,
             * push the new random number onto the array of random numbers.
             */
            if (arrayOfRandomNumbers.indexOf(randomIndex) === -1) {
                arrayOfRandomNumbers.push(randomIndex);
                $(this).attr('background-color', color[randomIndex]);
            } else{

                if (arrayOfRandomNumbers.length < color.length) {
                    randomColor();

                    return;
                }
            }
        });

        arrayOfRandomNumbers = [];
    }

    //gives each div a random shape
    function randomShape(){
        $(".shape").each(function(shape){
            setRandomInt();
            if(arrayOfRandomNumbers.indexOf(randomIndex) === -1){
                arrayOfRandomNumbers.push(randomIndex);
                $(this).attr('border-radius', shape[randomIndex]);
            }
            else{
                if(arrayOfRandomNumbers.length !== 8){
                    randomShape();

                    return;
                }
            }
        });

        arrayOfRandomNumbers = [];
    }

    //function to store in the local storage
    var put = function (key, value) {
        if (window.localStorage) {
            window.localStorage[key] = value;
        }
    };

    //function to retrieve stored keys
    var get = function (key) {
        return window.localStorage ? window.localStorage[key] : null;
    }

    function keyEntry(){
        //function to add things into the local storage
        //use put(key, value) for each item being stored
    }
}); //End of doc. do not modify the above!

//create function to collect the user name and store it.
//create function for the start button on indexpage
//capture and store chosen time frame
//create array of possible colors
//create random function to choose from that array
//create array with all possible commands
//create function to change the div shape and color
//make button start a countdown
//create a timer function for the countdown
//create function for correct response
//create function that stores correct number and displays
//create incorrect function
//use the divs ids to validate correct and incorrect responses
//create reaction timer function and store it each time a click happens level2
//create function to validate reaction time
//create function to advance to level2 --button
//create timer function to change commands etc
//add a restart function
//add a try again function
