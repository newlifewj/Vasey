/**
 * Module to drive the host-page. Hosting maybe a complex process driven multiple service.
 * So we separate the host logic as a middleware. 
 * The host module is not a router -- maybe we need place it elsewhere.
 */

function host(req,res){
	var modules = ['siteCreator','cstmDirector'];
	res.render('host',{'modules': JSON.stringify(modules)});
}

module.exports = host;