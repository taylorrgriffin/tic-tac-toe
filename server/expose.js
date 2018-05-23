

const localtunnel=require('localtunnel');




var opts = {
   subdomain: process.env.subdomain
}


var tunnel = localtunnel(process.env.port,opts,function(err,tunnel){

   console.log("we have made the tunnel");

   console.log('\n URL: ', tunnel.url);

});
