

// uses the enviroment file .env to configure build settings

require('dotenv').config(); // no variable needed, just call the function






//// key objects to use
const bodyParser = require('body-parser'); // decodes bytstream in to js object
const fs = require('fs');
const express = require('express');
////////////////////////////


///// global objects / variables to ues
var server = express();

const port = process.env.port || 3000;

var gameData = require(process.cwd() + '/server/tttData.json').data || [];



/////////////////////////////////////
//middle ware functions
//
//these functions modify EVERY request a littlebit for
//easier interface, as well as provide access from more sources

server.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");

 //now go to the next function...
   next();
 });

server.use(bodyParser.json()); // soime stuff to convert int o json
server.use(bodyParser.urlencoded({ extended: true }));



  server.use(function(req,res,next){
    console.log('\n\n',"/////////////////////////");
    console.log('=== Got request:// ===');
    console.log(' --URL:', req.url , '====');
    console.log(" --Method: ", req.method, '===');
   console.log(" --body: ", req.body );

    next();
});
//....

//// non middle ware functions,
//
//these functions catch all the endpoints , and urls.
// database is gameData
//
// some functions like get all these files, or get this certain resource...



// we serve all the static files by sending them as text to the broweser th
// that interprets it as code, not saving it
staticOpts = {
   extensions: ['php','htm','html','css','js'],
   index: 'index.html',
   setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
    switch(path.split('.')[1]){
  		case "css":
  		   res.set('Content-Type', 'text/css');
  		   break;
  		case "js":
  		   res.set('Content-Type', 'text/javascript');
  		   break;
  		case "html":
  		   res.set('Content-Type', 'text/html');
  		   break;
  		default:
  		   res.set('Content-Type', 'text/plain');
  		   break;

  	  }


   }
}
server.use('/', express.static(process.cwd() + '/public', staticOpts) );


//this funcction gets a store , a gameplay instance,
//and records it to the database
server.post('/addReport', function(req,res,next){


   console.log("====\n\n adding a report now!", req.body);
   var data = req.body;

   // here we check to see ifthe object is what we want it to be.
   if(data){
      gameData.push(data);
      dataBackUp();
   }

   res.status(200).send();


});





///////////////////////////////////////
server.listen(port, function(error) {
 console.log('===\n -Server listening on', port, ' ==\n===');
});

// now that we are up and running, invoke the TUNNEL
//
require(process.cwd()  + '/server/expose.js');



// ///////////////////////////////////////////////////////
// -- Helper functions
//

//using writefile sync we can back up the data
function dataBackUp(){

   var newDataBase = {
      data: gameData
   }

   fs.writeFileSync('./gameData.json', newDataBase);

}
