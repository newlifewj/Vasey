/**
 * New node file
 */

var express = require('express');
var path = require('path');
var jf = require('jsonfile');
var util = require('util');
//var searchFiles = require(__appBase + 'app_modules/searchFiles');
var router = express.Router();

/*
//var readmeFiles = searchFiles(path.dirname(require.main.filename), ['.md']);	//README files are *.md types.
var readmeFiles = searchFiles(__dirname, ['.md']);	//README files are *.md types.
console.log(JSON.stringify(readmeFiles))
*/

/* Get the test entrance page */
router.get('/', function(req,res,next) {
	
	jf.readFile('./dev/e2e/test.json', function(err, obj) {
		if(err){
			next(err);
			return;
		}else{
			res.render('test',{'unit':{modules:[]},'jsonUnitList':JSON.stringify(obj),'jsonModel':JSON.stringify({}),'jsonCfg':JSON.stringify({})});
		};
	});
	
});

/* Test specified unit */
router.get('/:path/:name', function(req,res,next) {
	
	var config={};
	
	jf.readFile('./dev/e2e/test.json', function(err, obj) {
		if(err){
			next(err);
			return;
		}else{
			var unit = {};
			var model;
			for(var i=0; i<obj.length; i++){
				if(obj[i]['path']==req.params.path+"/" && obj[i]['name']==req.params.name){
					unit = obj[i];
					break;
				}
			}
			
			jf.readFile('./dev/e2e/cfgs/'+req.params.path+'/'+req.params.name+'.json', function(err,cfg){
				if(err){
					//No config is normal
				}else{
					config = cfg;
				}
			});
			
			jf.readFile('./dev/e2e/models/'+req.params.path+'/'+req.params.name+'.json', function(err,model){
				if(err){
					res.render('test',{'unit':unit,'jsonUnitList':JSON.stringify(obj),'jsonModel':JSON.stringify({}),'jsonCfg':JSON.stringify(config)});
				}else{
					res.render('test',{'unit':unit,'jsonUnitList':JSON.stringify(obj),'jsonModel':JSON.stringify(model),'jsonCfg':JSON.stringify(config)});
				}
			});
		};
	});
	
});


module.exports = router;