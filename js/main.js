//global lets
let playerName = localStorage.getItem("playerName");
let countdown = parseInt(localStorage.getItem("length"));
let starterCountDown = 3;
let fiveSecondsTimeOut = 0;
let color = ["red", "blue", "green", "pink", "yellow", "brown", "purple", "orange"];
let shape = ["100px", "0px", "0px", "100px", "0px", "100px", "0px", "100px"];
let randomIndex = 0;
let arrayOfRandomNumbers = [];
let command = "";
let level1Score = 0;
let level2Score = 0;
let intervalDecrease = 0;
let level1 = null;
let level2 = null;
let finalLevel1Score = localStorage.getItem("level1Score");
let finalLevel2Score = localStorage.getItem("level2Score");
let time = 0;

$(document).ready(function(){
    console.log("up and running!");

    //buttons to be hidden at first
    $("#restart1").hide();
    $("#nextLevel").hide();
    $("#nextPage").hide();
    $("#nextLevelContain").hide();
    $("#nextPageContain").hide();

    //index page start button captures the data and passes it on
    $("#startButton").click(function() {
        let name = $("#userName").val();
        time = $("input[name='timeOption']:checked").val();
        if ((name.length > 1) && (time === "30" || time === "60")) {
          populateStorageIndex();
          window.open("level1.html");
        }
        else{
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
            fiveSecondsTimeOut +=1
            if(level1 === true){
              if(fiveSecondsTimeOut === 5){
                fiveSecondsTimeOut = 0;
                generateRandomShape();
                creater();
                level1Score -= 1;
                $("#score").text(`Score: ${level1Score}`);
              }
            } else if (level2 === true){
               if(fiveSecondsTimeOut === 5){
                fiveSecondsTimeOut = 0;
                generateRandomShape();
                creater();
                level2Score -= 1;
                $("#score").text(`Score: ${level2Score}`);
              }
            }
        }
        else {
            clearInterval(intervalDecrease);
            winnerChecker();
        }
    }

    //A one second pause to run the decreaser function for the users time left as well as the first countdown
    function ticker(){
        intervalDecrease = setInterval(decreaseCount, 1000);
    }

    //button to officialy start level 1.
    $("#startButton2").click(function() {
        level1 = true;
        ticker();
        generateRandomShape();
        creater();
        timeOutForInstruction();
    });

    //button to officaly start level 2.
    $("#startButton3").click(function() {
      level2 = true;
      ticker();
      generateRandomShape();
      creater();
      timeOutForInstruction();
    });

    //random number generater
    function setRandomInt() {
      min = Math.ceil(0);
      max = Math.floor(8);
      randomIndex = Math.floor(Math.random() * (max - min)) + min;
      if (arrayOfRandomNumbers.indexOf(randomIndex) === -1) {
        arrayOfRandomNumbers.push(randomIndex);
      }
      if(arrayOfRandomNumbers.length < shape.length){
        setRandomInt();
      }
      return;
    }

    //creates the click function for each div
    function creater(){
      let shapes = $('.shape');
      shapes.each(function(){
        $(this).on("click", function(){
          if (level1 === true) {
            if (countdown > -1){
              if (event.target.id == winningCommand.attr("id")){
                level1Score += 1;
                $("#score").text(`Score: ${level1Score}`);
                generateRandomShape();
                getInstructions();
                fiveSecondsTimeOut = 0;
              } else {
                level1Score -= 1;
                $("#score").text(`Score: ${level1Score}`);
                generateRandomShape();
                getInstructions();
                fiveSecondsTimeOut = 0;
              }
            }
            else{
              winnerChecker();
            }
          } else if(level2 === true){
              if (event.target.id == winningCommand.attr("id")){
                level2Score += 1;
                $("#score").text(`Score: ${level2Score}`);
                generateRandomShape();
                getInstructions();
                fiveSecondsTimeOut = 0;
              } else {
                level2Score -= 1;
                $("#score").text(`Score: ${level2Score}`);
                generateRandomShape();
                getInstructions();
                fiveSecondsTimeOut = 0;
              }
            }
            else{
              winnerChecker();
          }
        })
      })
    }

    function generateRandomShape() {
      setRandomInt();
      let i = 0;
      $(".shape").each(function(){
        let theRandomNumber = arrayOfRandomNumbers[i]
        $(this).css('background-color', color[theRandomNumber]);
        $(this).css('border-radius', shape[theRandomNumber]);
        i++
      });
      arrayOfRandomNumbers = [];
    }

    //gets a functional command
    function getInstructions(){
      setRandomInt();
      let theRandomNumber = arrayOfRandomNumbers[3];
      if(theRandomNumber === 0){
        theRandomNumber +=1;
      }
      winningCommand = $("#piece" + theRandomNumber);
      let commandBackground = winningCommand.css("background-color");
      let commandShape = winningCommand.css("border-radius");
      $("#instructionCopy").css('color', commandBackground);
      if (commandShape === "100px") {
        commandShape = "circle"
      } else{
        commandShape = "square"
      }
      if (commandBackground === "rgb(165, 42, 42)") {
        commandBackground = "brown"
      } else if (commandBackground === "rgb(0, 128, 0)"){
        commandBackground = "green"
      } else if (commandBackground === "rgb(0, 0, 255)"){
        commandBackground = "blue"
      } else if (commandBackground === "rgb(255, 192, 203)"){
        commandBackground = "light pink"
      } else if (commandBackground === "rgb(255, 255, 0)"){
        commandBackground = "yellow"
      } else if (commandBackground === "rgb(255, 165, 0)"){
        commandBackground = "orange"
      } else if(commandBackground === "rgb(255, 0, 0)"){
        commandBackground = "red"
      } else if (commandBackground === "rgb(128, 0, 128)"){
        commandBackground = "purple"
      }
      $("#instructionCopy").text(`Click the ${commandBackground} ${commandShape}`);
    }


    //fires off the first command after 3 sec countdown
    function timeOutForInstruction(){
      setTimeout(getInstructions, 5000);
    }

    function fiveSecondChecker(){

    }

    function winnerChecker(){
      if (level1 === true){
        if (countdown === -1){
          if(level1Score >= 25){
            $("#instructionCopy").css("font-size", "250%");
            $("#instructionCopy").html("Congrats You won! <br> click the next level button to procced to level 2.");
            $("#startButton2").hide();
            $("#nextLevel").show();
            populateStorageLeve1();
            $("#nextLevel").click(function() {
               window.location = "level2.html";
             });
          } else{
            $("#instructionCopy").css("font-size", "250%");
            $("#instructionCopy").html("So close! Try again! <br> You need a minimum of 25 points.");
            restart();
          }
        }
      }else if(level2 === true){
        if (countdown === -1){
          if(level2Score >= 5){
            $("#instructionCopy").css('font-size', '250%');
            $("#instructionCopy").html("Congrats You won! <br> click the next button to see you'r overall score.");
            $("#startButton3").hide();
            $("#nextPage").show();
            populateStorageLeve2();
            $("#nextPage").click(function() {
              window.location = "winner.html";
            });
            //add link to next page.
          } else{
            $("#instructionCopy").css('font-size', '250%');
            $("#instructionCopy").html("So close! Try again! <br> You need a minimum of 50 points");
            restart();
          }
        }
      }
    }


    function restart() {
      if (level1 === true) {
        $("#startButton2").hide();
        $("#restart1").show()
        $("#restart1").click(function() {
          location.reload(true);
        });
      } else if(level2 === true){
          $("#StartButton3").hide();
          $("#restart1").show()
          $("#restart1").click(function() {
            location.reload(true);
          });
      }
    }

    $("#name").text(playerName);
    $("#points").text(finalLevel1Score);
    $("#points2").text(finalLevel2Score);
    $("#restartButton").click(function() {
      window.location = "level1.html";
    });

    function populateStorageIndex() {
      localStorage.setItem("playerName", name);
      localStorage.setItem("length", time);
    }

    function populateStorageLeve1 (){
      localStorage.setItem("level1Score", level1Score);
    }

    function populateStorageLeve2(){
      localStorage.setItem("level2Score", level2Score);
    }
}); //End of doc. do not modify the above!

