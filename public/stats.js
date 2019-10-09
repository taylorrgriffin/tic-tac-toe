



var DB;

async function getDB(){
    DB = await fetch(`http://${window.location.host}/tg-tic-tac-toe/getDB`)
    if(DB.status === 404 || DB.status !== 200){
      DB = null;
      return null;
    }
    else{
      var payload = await DB.json();
      return payload;
    }
}
// <!-- "first-blood-stats-a"
// "first-blood-stats-b"
// "number-wins-stats"
// "total-blocks-stats"
// "dictionary-blocks-stats"
//  -->
// after this db gets set a value;
// array positions will always be sorted alphabetical order
// [ O, X ]
// it must suppor trs max length 5
function consolidateDbToDOMNodes(trs,db){
  var numberGames = db.length
  var totalFBs = [0,0];
  var totalWins = [0,0];
  var totalNumBlocks = [0,0];
  var totalNumleftOpen = [0,0];
  var bockTypes = {};
  var possiblePaths = {};
//
// {"winner":"x",
// "winPath":"left-most column",
// "potentials":["middle vertical potential by o"],
// "blocked":[],
// "firstBlood":'o'},
  db.forEach(function(value,index){
    if(value.winner === 'x'){
      totalWins[0]+=1;
    }
    else if(value.winner === 'o'){
      totalWins[1]+=1;
    }
    if(value.firstBlood === 'x'){
      totalFBs[0]+=1;
    }
    else if(value.firstBlood === 'o'){
      totalFBs[1]+=1;
    }


  });



  trs[0].childNodes[0].textContent = totalFBs[0];
  trs[0].childNodes[1].textContent = totalFBs[1];

  trs[1].childNodes[0].textContent = totalFBs[0]/db.length.toFixed(3);
  trs[1].childNodes[1].textContent = totalFBs[1]/db.length.toFixed(3);

  trs[2].childNodes[0].textContent = totalWins[0];
  trs[2].childNodes[1].textContent = totalWins[1];

  trs[3].childNodes[0].textContent = 0;
  trs[3].childNodes[1].textContent = 0;

  trs[4].childNodes[0].textContent = 0;
  trs[4].childNodes[1].textContent = 0;

}


function populateStatsDriver(db){
  var tableRows =[];
  for(var i=0;i<5;i++){
    let row = document.createElement("tr");
    let c1 = document.createElement("td");
    let c2 = document.createElement("td");
    row.appendChild(c1);
    row.appendChild(c2);
    tableRows.push(row);
  }
  if(!DB){
    tableRows.forEach(function(val,index){
      /*tableRows = [
      (
        <row><c1><c2></row>
        row = tr
        c = td
      ),
      ]*/
      val.childNodes[0].textContent = "SORRY NO DB :/";
      val.childNodes[1].textContent = "SORRY NO DB :/";
    })
  }
  else{
    consolidateDbToDOMNodes(tableRows,db);
  }


  return tableRows;

}


















async function main(){

    DB = await getDB();
    console.log(DB);
    const tableRows = populateStatsDriver(DB);
    /*
    insert them into the right location in the stats page
    */
    document.querySelector("#first-blood-stats-a").appendChild(tableRows[0])
    document.querySelector("#first-blood-stats-b").appendChild(tableRows[1])
    document.querySelector("#number-wins-stats").appendChild(tableRows[2])
    document.querySelector("#total-blocks-stats").appendChild(tableRows[3])
    document.querySelector("#potential-fates-stats").appendChild(tableRows[4])

    // <!-- "first-blood-stats-a"
    // "first-blood-stats-b"
    // "number-wins-stats"
    // "total-blocks-stats"
    // "dictionary-blocks-stats"
    //  -->
    // after this db gets set a value;

}

window.onload = main;
