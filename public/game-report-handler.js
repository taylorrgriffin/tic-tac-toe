// based on the integer passed into the functino,
// it will make that type of request tothe database
 function Ask4Report( format ){

}


//based on this data object, there are paramters
// to be sent to the database.
 function outgoingReport(data){
  console.log("sending this rreport === \n ", data);

  let url = "http://tictactoe.localtunnel.me/addReport";

  var req = new XMLHttpRequest();

  req.open("POST", url);
  req.setRequestHeader("Content-Type","json");


  req.send(JSON.stringify(data));


}




// module.exports= {
//   reportSend: outgoingReport,
//   dataGather: Ask4Report
// }
