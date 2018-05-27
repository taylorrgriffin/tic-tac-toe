
///
function checkString( listPaths, query ){

  var entries = [];
    for (let curr=0; curr<listPaths.length;curr++){
// It can only be on or the other, so if and else if are used.
      if(listPaths[curr][0].includes(query)){
        // if the string includes the characters, append it to matched list.
        entries.push(listPaths[curr][0]);
      }
      else if(listPaths[curr][1].includes(query)){
        entries.push(listPaths[curr][1]);
      }

    }
    return entries;
}


/*WHEN? - every time the check possible needs to look at
          row, or colom, so about 6 times.
*desc: literally only checks 1 row or colomn.
*inputs:
origin: (int) the value of the index of the col or rows
who: (char) is it the x or the o?
which: (boolean) the indicator of vertical or horizontal stride
        this determiens aruntime function that will calculate the index
////local Funcitons
*/function vertStride(step,origin){
    return ( (3*step)  + origin  ); // how to stride vertically
}
function horzStride(step,origin){
    return ( (3*origin)  + step ); // how to stride horizontally
}

/*WHEN? - every time the check possible needs to look at
          row, or colom, so about 6 times.*/
function check_HorV_Path(origin, who , which){
  // init
    var count = 0;
    var blocked_flag = false;
    var geo;

    //initiazes CONSTANTS
    const letter = (who) ? 'x' : 'o'; // what letter are we looking for
    const letter_ = (!who) ? 'x' : 'o';

    switch( ('' + which + origin) ){
      case "10":  geo= "left "; break;
      case "11": geo= "middle "; break;
      case "12": geo= "right "; break;
      case "00": geo= "top "; break;
      case "01": geo= "middle "; break;
      case "02": geo= "bottom "; break;
      default: geo="diagonal"; break;
    }
    const desc = which ? "vertical" : "horizontal";
    const indexCalc = which ? vertStride : horzStride;


   //=== checking horizontal or vertical possibilitses
        for(let x = 0; x < 3; x++){
          if(elements[  indexCalc(x,origin) ] == letter ) count +=  1; // increment always if right.
          else if(elements[ indexCalc(x,origin) ] == letter_ )  blocked_flag = true; // Stop right there!
        }

        // now that we have counted, we need to form a conclusion
        if(count === 2 && blocked_flag ){
          return geo + desc + " blocked by " + letter_;
        }
        else if(count === 2){
          // only triggered by 2, not one or 3
          return geo + desc + " potential by " + letter;
        }
        else{
          return geo + desc + " nothing by " + letter ;
        }
}
//////////////////////////////////////////////
//////////////////////////////////////////////


//[            ,            ]
    // blocked,   fail
    // fail,      fail
    // potential, fial
    // potential, fail

/*WHEN? - happens after you play the game and click the "generate report" button
This funciton gathers descriptions of all the paths.
some stuff about the diagnals.
_________________
* * *
- o o  middle horizotal potential path by o. .....
- - -
______________
* * *
o - - left vertical blocked path by x
o - -
_________________
checks to see if there were blank paths to be winnable still.
goes thorugh all the verrtical, horizontal outcomes*/
function checkForPossiblePaths(){
  var potentialWins = [];
  var winIter = 0;
// check for a Horiztonal possibilities then
//after 3 they theck for veritcal possibilities
  for (winIter; winIter < 6; winIter ++){
      // 1 == x , 0 == o, using the boolean so we can always determine the other letter
      if(winIter<3){       // [         'x'                                 'o'                ]
        potentialWins.push([ check_HorV_Path(winIter%3, 1 , 0), check_HorV_Path(winIter%3, 0 , 0) ] )
      }                                   ///   check_HorV_Path(origin, x or o , horz or vert)
      else{
        potentialWins.push([ check_HorV_Path(winIter%3, 1 , 1), check_HorV_Path(winIter%3, 0 , 1)] )
      }
  }


  return potentialWins;
}



// WHEN? - this is set after all reports has been gathers
//        specified by a list of results an dom object.
//sets the text content to however many paths neeedd
//accepsts variable lists, and variable IDs
//appends them all to the list though
function setList(queries, ID ){
  var list = document.body.querySelector(ID);
  var node, count = 0;
  //before setting it we remove it


 do{
   node = document.createElement('li');
   node.textContent = queries[count];
   list.appendChild(node);
   count += 1;
  }while(count < queries.length);

}
