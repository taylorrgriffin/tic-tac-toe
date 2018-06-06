
/*=====  Key objects ===

*/
// edit the report object here:
//name Report
//desc: has necesarry int and booleans to descript outcomes
function tacReport(data){

  this.winner = data.winner || '-';
  this.winPath =  data.path || "Haha, really good.";
  this.potentials = JSON.parse(JSON.stringify(data.potential)) || [];
  this.blocked = JSON.parse(JSON.stringify(data.blocked)) || [];
  this.firstBlood = FirstBlood || "no-one";
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
   
    // based on the calculated value of URL...
    console.log("the current url = ", URL );
   // create a post request, and put the content in the body
   var req = new XMLHttpRequest();
   req.open("POST", URL + '/addReport');
//validate
   if(data instanceof tacReport){
     let text = JSON.stringify(data);
     req.setRequestHeader("Content-Type","application/json");
     req.send(text);
   }
   else{
     req.close();
     alert("there was an error validating the object");
   }


}




// module.exports= {
//   reportSend: outgoingReport,
//   dataGather: Ask4Report
// }
