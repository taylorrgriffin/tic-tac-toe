

const localtunnel=require('localtunnel');
const fs = require('fs');



var opts = {
   subdomain: process.env.subdomain
}


var tunnel = localtunnel(process.env.port,opts,function(err,tunnel){

   console.log("we have made the tunnel");

   console.log('\n URL: ', tunnel.url);

   //if we dont require this file, it will be local unnel
   fs.writeFile(process.cwd() + '/public/urldata.txt', tunnel.url + '\n',function(err){ return;})

});
