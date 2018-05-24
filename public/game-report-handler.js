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


//based on this data object, there are paramters
// to be sent to the database.
 function outgoingReport(data){
   let text = JSON.stringify(data);
   let url = "http://tictactoe.localtunnel.me/addReport";
   var req = new XMLHttpRequest();

  req.open("POST", url);
  req.setRequestHeader("Content-Type","application/json");


  req.send(text);


}




// module.exports= {
//   reportSend: outgoingReport,
//   dataGather: Ask4Report
// }
