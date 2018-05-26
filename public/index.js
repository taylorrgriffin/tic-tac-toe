
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

window.onclick = function(event) {
  var check = event.srcElement;
  // toggle off option-select menu if click occured outside of menu
  if (check.id != "tttElem") {
    disableSelectEntry();
  }
}

function setElement(select,option) {
  var oldVal = elements[select];
  // Set button to X
  if (option == 0) {
    var newVal = "X";
    var set = 1;
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
    var newVal = "O";
    var set = 1;
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
    var newVal = "\n(click to set)\n";
    var set = 0;
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
}

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



//[            ,            ]
    // blocked,   fail
    // fail,      fail
    // potential, fial
    // potential, fail

/*Potential paths that Could have been, but didnt happeen.
* * *
- o o  horizotal o potential path. .....
- - -
checks to see if there were blank paths to be winnable still.
goes thorugh all the verrtical, horizontal outcomes*/
function checkForPossiblePaths(){
  var potentialWins = [];
  var winIter = 0;
// check for a Horiztonal possibilities then
//after 3 they theck for veritcal possibilities
  for (winIter; winIter < 6; winIter ++){
    // 1 == x , 0 == o, using the boolean so we can always determine the other letter
    if(winIter<3){       //         'x'                                 'o'
      potentialWins.push([ check_HorV_Path(winIter%3, 1 , 0), check_HorV_Path(winIter%3, 0 , 0) ] )
    }
    else{
      potentialWins.push([ check_HorV_Path(winIter%3, 1 , 1), check_HorV_Path(winIter%3, 0 , 1)] )
    }
}


  // then i will ahve to diagnozals. not  ,, no i wont do thats
  console.log('====\n\n Here arer the results of potentials!!!: \n');
  console.log(potentialWins);
  return potentialWins;
}

/* chechhorz and checkvert
*desc: literally only checks 1 row or colomn.
*inputs:
num: (int) the value of the index of the col or rows
which: (boolean) the indicator of vertical or horizontal stride
this determiens aruntime function that will calculate the index
who: is it the x or the o?
*/
function check_HorV_Path(origin, who , which){
  // init
    var count = 0;
    var letter = (who) ? 'x' : 'o'; // what letter are we looking for
    var letter_ = (!who) ? 'x' : 'o';

    var desc = which ? "vertical" : "horizontal";
    var indexCalc = which ? function(step,origin){
      return ( (3*step)  + origin  ); // how to stride vertically
    } : function(step,origin){
      return ( (3*origin)  + step ); // how to stride horizontally
    };

    var blocked_flag = false;
   //=== checking horizontal or vertical possibilitses
        for(let x = 0; x < 3; x++){
          if(elements[  indexCalc(x,origin) ] == letter ) count +=  1; // increment
          else if(elements[ indexCalc(x,origin) ] == letter_ )  blocked_flag = true; // Stop right there!
        }
        // now that we have counted, we need two
        if(count === 2 && blocked_flag ){
          return desc + " blocked ";
        }
        else if(count === 2){
          // only triggered by 2, not one or 3
          return desc + " potential ";
        }
        else{
          return desc + " nothing ";
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
    setWinner(winningTeam); // here we set the winning team!
    setWinningCombination(pathDesc[winningPath]); ///// HERE WE SET THE TRUE WINNING PATH

    // now that we have evaulated the win, we can export this data to
    // be able to store it permanently.
    let reportData = {
      winner: winningTeam,
      path: pathDesc[winningPath],
      closeDescs: checkForPossiblePaths()
    };
    var report = new tacReport(reportData);
//     analTool.reportSend(report); // send the report to the server/
   //outgoingReport(report);
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

function setXPossibilities(msg) {
  document.getElementById("xPossibilities").innerText = "remaining x possible paths: ".concat(msg);
}

function setOPossibilities(msg) {
  document.getElementById("oPossibilities").innerText = "remaining o possible paths: ".concat(msg);
}

function setUBPossibilities(msg) {
  document.getElementById("ubPossibilities").innerText = "remaining unbiased possible paths: ".concat(msg);
}

function testPrint() {
  for (i = 0; i < 9; i++) {
    console.log(elements[i]);
  }
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
