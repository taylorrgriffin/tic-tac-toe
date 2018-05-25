
/*=====  Key objects ===

*/
// edit the report object here:
//name Report
//desc: has necesarry int and booleans to descript outcomes
function tacReport(data){

  this.winner = data.winningTeam;
  this.winPath =  data.winPathDesc;
  this.closePaths = [];
  //deepcopy
  if(data.closeDescs){
    data.closeDescs.forEach(function(elem){
      this.closePaths.push(elem);
    });
  }
  else{
    this.closePaths = [];
  }

  return this;
}





// based on the integer passed into the functino,
// it will make that type of request tothe database
 function Ask4Report( format ){

   switch(format){
     case 1:
      break;
     case 2:
      break;
     case 3:
      break;
    default:
      break;
   }

}

//name: outgoing report
//desc: based on this data object, there are paramters
//      to be sent to the database. so it makes a request with the stuff.
//post-cond: before [ x ] after [ x , x ]
//  ~ a new post is added to the database
 function outgoingReport(data){
   let url = "http://tictactoe.localtunnel.me/addReport";
   // create a post request, and put the content in the body
   var req = new XMLHttpRequest();
   req.open("POST", url);
//validate
   if(data instanceof tacReport){
     let text = JSON.stringify(data);
     req.setRequestHeader("Content-Type","application/json");
     req.send(text);
   }
   else{
     req.close();
     console.log("there was an error validating the object");
   }


}




// module.exports= {
//   reportSend: outgoingReport,
//   dataGather: Ask4Report
// }
