$(function(){
  console.log("up and running!")

  var get = function (key) {
  return window.localStorage ? window.localStorage[key] : null;
}

var put = function (key, value) {
  if (window.localStorage) {
    window.localStorage[key] = value;
  }
}

});

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



