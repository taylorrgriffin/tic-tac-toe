
//// =============================
//// IMPORTING THE DATABASE SENDERS
// this going to be the exports for sending stuff to the sever!!
//var analTool = require("game-report-handler.js");
//import { * } from 'game-report-handler.js';





// Import option-select menus
var options = [
  document.getElementsByClassName("tic-tac-toe-options1"),
  document.getElementsByClassName("tic-tac-toe-options2"),
  document.getElementsByClassName("tic-tac-toe-options3"),
  document.getElementsByClassName("tic-tac-toe-options4"),
  document.getElementsByClassName("tic-tac-toe-options5"),
  document.getElementsByClassName("tic-tac-toe-options6"),
  document.getElementsByClassName("tic-tac-toe-options7"),
  document.getElementsByClassName("tic-tac-toe-options8"),
  document.getElementsByClassName("tic-tac-toe-options9")
];
// Import click-to-set buttons
var buttons = [
  document.querySelectorAll(".tic-tac-toe-element-1, .tic-tac-toe-element-1-adjusted"),
  document.querySelectorAll(".tic-tac-toe-element-2, .tic-tac-toe-element-2-adjusted"),
  document.querySelectorAll(".tic-tac-toe-element-3, .tic-tac-toe-element-3-adjusted"),
  document.querySelectorAll(".tic-tac-toe-element-4, .tic-tac-toe-element-4-adjusted"),
  document.querySelectorAll(".tic-tac-toe-element-5, .tic-tac-toe-element-5-adjusted"),
  document.querySelectorAll(".tic-tac-toe-element-6, .tic-tac-toe-element-6-adjusted"),
  document.querySelectorAll(".tic-tac-toe-element-7, .tic-tac-toe-element-7-adjusted"),
  document.querySelectorAll(".tic-tac-toe-element-8, .tic-tac-toe-element-8-adjusted"),
  document.querySelectorAll(".tic-tac-toe-element-9, .tic-tac-toe-element-9-adjusted")
];
// Initialize tokens container
var elements = ["-","-","-","-","-","-","-","-","-"];
// used for checking if appropriate number of tokens were added
var valid = 0;
var tooMany = '-';
// number of tokens for each
var numX = 0;
var numO = 0;
// used for checking if each player can win
var xCanWin = 0;
var oCanWin = 0;
// used for checking if a player won
var won = 0;
// Initialize win condition paths containers
var xPaths = [0,0,0,0,0,0,0,0];
var oPaths = [0,0,0,0,0,0,0,0];
// Initialize potential win condition paths containers
var xPotentialPaths = [0,0,0,0,0,0,0,0];
var oPotentialPaths = [0,0,0,0,0,0,0,0];
var ubPotentialPaths = [0,0,0,0,0,0,0,0];
// Associate paths to "english paths"
var pathDesc = [
  "top row",
  "middle row",
  "bottom row",
  "left-most column",
  "middle column",
  "right-most column",
  "left diagonal",
  "right diagonal"
];
// Import click-to-set button classes
var squareClasses = [
  "tic-tac-toe-element-1",
  "tic-tac-toe-element-2",
  "tic-tac-toe-element-3",
  "tic-tac-toe-element-4",
  "tic-tac-toe-element-5",
  "tic-tac-toe-element-6",
  "tic-tac-toe-element-7",
  "tic-tac-toe-element-8",
  "tic-tac-toe-element-9"
];
// Import adjusted click-to-set button classes
var squareClassesAdjusted = [
  "tic-tac-toe-element-1-adjusted",
  "tic-tac-toe-element-2-adjusted",
  "tic-tac-toe-element-3-adjusted",
  "tic-tac-toe-element-4-adjusted",
  "tic-tac-toe-element-5-adjusted",
  "tic-tac-toe-element-6-adjusted",
  "tic-tac-toe-element-7-adjusted",
  "tic-tac-toe-element-8-adjusted",
  "tic-tac-toe-element-9-adjusted"
];

function enableSelectEntry(num) {
  // toggle on option-select menu
  for (i = 0; i < options.length; i++) {
    if (i == num) {
      options[i][0].classList.remove("hidden");
    }
    // make sure only one is open at a time
    else {
      options[i][0].classList.add("hidden");
    }
  }
}

function disableSelectEntry() {
  // toggle off option-select menu
  for (i = 0; i < options.length; i++) {
      options[i][0].classList.add("hidden");
  }
}

// this funciton works on mozilla as well as google chrome
document.body.querySelector('.board-button-container').addEventListener('click',clickBox);


function clickBox (event) {
  var check = event.target;
  console.log(event.target.id);
  // toggle off option-select menu if click occured outside of menu
  if (check.id != "tttElem") {
    disableSelectEntry();
  }
}

function setElement(select,option) {
  var oldVal = elements[select];
  var newVal = ""; // the letter for it to display as
  var set = 0; // is it null or is it set?
  // Set button to X
  if (option == 0) {
    newVal = "X";  set = 1;

    // update elements array
    elements[select] = "x";
    // decrement number of o's
    if (oldVal == "o") {
      numO--;
      numX++;
    }
    // incremenet number of x's
    else if (oldVal == "-") {
      numX++;
    }
  }
  // Set button to O
  else if (option == 1) {
    newVal = "O";   set = 1;
   
    // update elements array
    elements[select] = "o";
    // decrement number of x's
    if (oldVal == "x") {
      numX--;
      numO++;
    }
    // increment number of o's
    else if (oldVal == "-") {
      numO++;
    }
  }
  // Set button to default
  else {
   newVal = "\n(click to set)\n";  set = 0;

    // update elements array
    elements[select] = "-";
    // decrement x's or o's
    if (oldVal == "x") {
      numX--;
    }
    else if (oldVal == "o") {
      numO--;
    }
  }
  // Set new value
  buttons[select][0].innerText = newVal
  // Fix the styling if new value is X or O
  if ((buttons[select][0].classList.contains(squareClasses[select])) && (set == 1)) {
    buttons[select][0].classList.add(squareClassesAdjusted[select]);
    buttons[select][0].classList.remove(squareClasses[select]);
  }
  // Fix the styling if new value is (click to set)
  if ((buttons[select][0].classList.contains(squareClassesAdjusted[select])) && (set == 0)) {
    buttons[select][0].classList.add(squareClasses[select]);
    buttons[select][0].classList.remove(squareClassesAdjusted[select]);
  }


  // afte the new piece has been made we check to see if there is a blocked path for
  // the first blood property
  // uses "some-reportTools.js"
  if(!FirstBlood){
    var currGame = checkForPossiblePaths();
    var blood = checkString(currGame, "blocked");
    if(blood.length){
       FirstBlood = blood[0].split("blocked by ")[1];
    }  
  }
  disableSelectEntry();
}
var FirstBlood = null; // this allows us t ocheck tht stuff.

function runReport() {
  // check whether it's a valid game (correct number of tokens)
  checkValid();
  // set status attribute
  setStatus();
  // if valid game, run rest of report
  ////////////////
// could be encapsulated in to a report class
      if (valid) {
        checkForWin();
        // if neither play won, run rest of report
        if (!won) {
          checkPotentialWinPaths();
          checkWinnable();
        }
///////////////////////////////////////////////
    // if a player won, don't finish rest of report

    else {
      setWinnableByX("n/a");
      setWinnableByO("n/a");
      setXPossibilities("n/a");
      setOPossibilities("n/a");
      setUBPossibilities("n/a");
    }
  }
  // if invalid, don't finish rest of report
  else {
    setWinner("n/a");
    setWinningCombination("n/a");
    setWinnableByX("n/a");
    setXPossibilities("n/a");
    setWinnableByO("n/a");
    setOPossibilities("n/a");
    setUBPossibilities("n/a");
  }
  // render results section
  showResults();
}

function checkValid() {
  // check disparity in x's and o's
  var diff = Math.abs(numX-numO);
  // game is invalid
  if (diff > 1) {
    valid = 0;
    // check which token has too many
    if (numX > numO) {
      tooMany = "x";
    }
    else {
      tooMany = "o";
    }
  }
  // game is valid
  else {
    valid = 1;
  }
}

function checkForWin() {
  // check rows
  xPaths[0] = checkPath("x",0,1,2);
  oPaths[0] = checkPath("o",0,1,2);
  xPaths[1] = checkPath("x",3,4,5);
  oPaths[1] = checkPath("o",3,4,5);
  xPaths[2] = checkPath("x",6,7,8);
  oPaths[2] = checkPath("o",6,7,8);
  // check columns
  xPaths[3] = checkPath("x",0,3,6);
  oPaths[3] = checkPath("o",0,3,6);
  xPaths[4] = checkPath("x",1,4,7);
  oPaths[4] = checkPath("o",1,4,7);
  xPaths[5] = checkPath("x",2,5,8);
  oPaths[5] = checkPath("o",2,5,8);
  // check diagonals
  xPaths[6] = checkPath("x",0,4,8);
  oPaths[6] = checkPath("o",0,4,8);
  xPaths[7] = checkPath("x",2,4,6);
  oPaths[7] = checkPath("o",2,4,6);


  // See if a proper win has occured
  evaluateWin();



}

function checkWinnable() {

}

function checkPotentialWinPaths() {
  // check rows
  xPotentialPaths[0] = checkPotentialPath("x","-",0,1,2);
  oPotentialPaths[0] = checkPotentialPath("o","-",0,1,2);
  ubPotentialPaths[0] = checkPath("-",0,1,2);
  xPotentialPaths[1] = checkPotentialPath("x","-",3,4,5);
  oPotentialPaths[1] = checkPotentialPath("o","-",3,4,5);
  ubPotentialPaths[1] = checkPath("-",3,4,5);
  xPotentialPaths[2] = checkPotentialPath("x","-",6,7,8);
  oPotentialPaths[2] = checkPotentialPath("o","-",6,7,8);
  ubPotentialPaths[2] = checkPath("-",6,7,8);
  // check columns
  xPotentialPaths[3] = checkPotentialPath("x","-",0,3,6);
  oPotentialPaths[3] = checkPotentialPath("o","-",0,3,6);
  ubPotentialPaths[3] = checkPath("-",0,3,6);
  xPotentialPaths[4] = checkPotentialPath("x","-",1,4,7);
  oPotentialPaths[4] = checkPotentialPath("o","-",1,4,7);
  ubPotentialPaths[4] = checkPath("-",1,4,7);
  xPotentialPaths[5] = checkPotentialPath("x","-",2,5,8);
  oPotentialPaths[5] = checkPotentialPath("o","-",2,5,8);
  ubPotentialPaths[5] = checkPath("-",2,5,8);
  // check diagonals
  xPotentialPaths[6] = checkPotentialPath("x","-",0,4,8);
  oPotentialPaths[6] = checkPotentialPath("o","-",0,4,8);
  ubPotentialPaths[6] = checkPath("-",0,4,8);
  xPotentialPaths[7] = checkPotentialPath("x","-",2,4,6);
  oPotentialPaths[7] = checkPotentialPath("o","-",2,4,6);
  ubPotentialPaths[7] = checkPath("-",2,4,6);

  console.log("what about the potential paths?");
  for ( i = 0; i < 8; i++) {
    console.log(xPotentialPaths[i]);
  }
  evaluatePotentialWinPaths();
}

function checkPath(token,index1,index2,index3) {
  if ((elements[index1] == elements[index2]) && (elements[index2] == elements[index3]) && (elements[index1] == token)) {
    return(1);
  }
  else {
    return(0);
  }
}



function checkPotentialPath(token1,token2,index1,index2,index3) {
  if (((elements[index1] == token1) || (elements[index1] == token2)) &&
  ((elements[index2] == token1) || (elements[index2] == token2)) &&
  ((elements[index3] == token1) || (elements[index3] == token2))) {
    return(1);
  }
  else {
    return(0);
  }
}


function evaluateWin() {
  // initliaze checking vars
  var broken = 0;
  var winningTeam = 0;
  var winningPath = 0;
  // check all paths
  for (i = 0; i < 8; i++) {

    if (xPaths[i] == 1) {   // found winning x path
      if (!won) {// first win found
        won = 1;
        winningPath = i;
        winningTeam = "x";
      }
      // more than one win
      else {
        broken = 1;
      }
    }
    // found winning o path
    if (oPaths[i] == 1) {
      // first win found
      if (!won) {
        won = 1;
        winningPath = i;
        winningTeam = "o";
      }
      // more than one win
      else {
        broken = 1;
      }
    }
  }
  // more than one win condition
  if (broken) {
    setWinner("n/a");
    setWinningCombination("n/a");
  }
  // change status if more than one win condition (otherwise valid)
  if ((broken) && (valid)) {
    document.getElementById("status").innerText = "status: INVALID (more than one win condition)";
  }
  // neither player has winning combination
  if (!won) {
    setWinner("n/a");
    setWinningCombination("n/a");
  }
  // one player has a winning combination
  else {
    // now that we have evaulated the win, we can export this data to
    // be able to store it permanently.
    outcomes = checkForPossiblePaths();
    let reportData = {
      winner: winningTeam,
      path: pathDesc[winningPath],
      potential: checkString(outcomes, "potential"),
      blocked: checkString(outcomes, "blocked")
    };

    setList(reportData.potential , "#possiblePaths"); // set potential paths
    setList(reportData.blocked, "#blockedPaths"); // set potential paths

    setWinner(winningTeam); // here we set the winning team!
    setWinningCombination(pathDesc[winningPath]); ///// HERE WE SET THE TRUE WINNING PATH

    var report = new tacReport(reportData);
    outgoingReport(report);
  }
}










function evaluatePotentialWinPaths() {
  for (i = 0; i < 8; i++) {
    if (xPotentialPaths[i] == 1) {
      document.getElementById("xPossibilities").innerText.concat(pathDesc[i]);
    }
  }
}

function setStatus() {
  // set "status: " attribute
  var statusElement = document.getElementById("status");
  // invalid
  if (valid == 0) {
    statusElement.innerText = "status: INVALID (too many ".concat(tooMany).concat("'s)");
  }
  // valid
  else {
    statusElement.innerText = "status: VALID";
  }
}

function setWinner(msg) {
  // set "winner: " attribute
  document.getElementById("whowon").innerText = "winner: ".concat(msg);
}

function setWinningCombination(msg) {
  // set "winning combination: " attribute
  document.getElementById("winner").innerText = "winning path: ".concat(msg);
}

function setWinnableByX(msg) {
  document.getElementById("xWinnable").innerText = "winnable by x: ".concat(msg);
}

function setWinnableByO(msg) {
  document.getElementById("oWinnable").innerText = "winnable by o: ".concat(msg);
}
////////////////////////
function setXPossibilities(msg) {
  document.getElementById("xPossibilities").innerText = "remaining x possible paths: ".concat(msg);
}

function setOPossibilities(msg) {
  document.getElementById("oPossibilities").innerText = "remaining o possible paths: ".concat(msg);
}
/////////////////////////////////
function setUBPossibilities(msg) {
  document.getElementById("ubPossibilities").innerText = "remaining unbiased possible paths: ".concat(msg);
}

function testPrint() {
  for (i = 0; i < 9; i++) {
    console.log(elements[i]);
  }
}
function viewStats(){
   console.log(window.location.href);
// we are now transporting us to the next stuff.
   window.location = window.location.href + "stats.html";
}
function resetBoard() {
  // Hide results section
  killResults();
  // Reset all squares to default values
  for (i = 0; i < 9; i++) {
    buttons[i][0].innerText = "\n(click to set)\n"
    // Reset everything
    elements[i] = "-";
    numO = 0;
    numX = 0;
    won = 0;
    // Fix styling for all squares
    fixStyling(i);
  }
}

function fixStyling(index) {
  // Go back to original styling if adjusted style is applied
  if (buttons[index][0].classList.contains(squareClassesAdjusted[index])) {
      buttons[index][0].classList.add(squareClasses[index]);
      buttons[index][0].classList.remove(squareClassesAdjusted[index]);
  }
}

function killResults() {
  // Hide results section if it's not hidden
  if (!document.getElementById("results").classList.contains("hidden")) {
    document.getElementById("results").classList.add("hidden");
  }
}

function showResults() {
  // Stop hiding results section
  document.getElementById("results").classList.remove("hidden");
}
