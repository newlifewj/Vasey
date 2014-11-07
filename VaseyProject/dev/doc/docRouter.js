/**
 * New node file
 */
var express = require('express');
var path = require('path');
//var jf = require('jsonfile');
var fs = require('fs');
var searchFiles = require(__appBase +'app_modules/searchFiles');
var router = express.Router();
var markdown = require( "markdown" ).markdown;

router.get('/md', function(req,res,next){
	
	//?md=path+file.md, __relative to appBase
	fs.readFile(__appBase + req.query.md, 'utf8', function(err,data){
		if(err){
			res.send('<h3 style="color:red">Oops, readme unavailable</h3><p>'+err+'</p>')
		}else{
			res.send(markdown.toHTML(data));
		}
	});
})

router.get('/', function(req,res,next){
	var wikiList=[];
	var noteList=[];
	var readmeList=[];
	var clientRdmList=[];
	var serverRdmList=[];
	var projectRdmList = searchFiles([	__appBase +'app_modules',
	                                  	__appBase +'data',
	                                  	__appBase +'dev',
	                                  	__appBase +'resource',
	                                  	__appBase +'routes',
	                                  	__appBase +'services',
	                                  	__appBase +'views'
	                                  ], ['.md']);
	console.log(JSON.stringify(projectRdmList))
	for(var i=0; i<projectRdmList.length; i++){
		//Strip the __appBase from absolute path.
		projectRdmList[i] = projectRdmList[i].replace(__appBase,'');
		
		//Sort to different array
		if(projectRdmList[i].indexOf('dev/wiki/')!=-1){
			wikiList.push(projectRdmList[i].replace('dev/wiki/',''));
		}else if(projectRdmList[i].indexOf('dev/notes')!=-1){
			noteList.push(projectRdmList[i].replace('dev/notes/',''));
		}else if(projectRdmList[i].indexOf('README.md')!=-1){
			readmeList.push(projectRdmList[i]);
		}else if(projectRdmList[i].indexOf('resource/')==0){
			
			clientRdmList.push(projectRdmList[i].slice(projectRdmList[i].indexOf('/',9)+1));
		}else if(projectRdmList[i]!='~!'){
			serverRdmList.push(projectRdmList[i]);
		}
		
		//remove it here is an error, just set a special tring.
		projectRdmList[i]="~!";	
	}
	
	readmeList.push('/README.md');		//Add the README.md for whole project.
	
	res.render('doc',{'wikiList':JSON.stringify(wikiList),'noteList':JSON.stringify(noteList),'readmeList':JSON.stringify(readmeList), 'clientRdmList':JSON.stringify(clientRdmList), 'serverRdmList':JSON.stringify(serverRdmList)});
	
	/*
	
	jf.readFile('./dev/e2e/test.json', function(err, obj) {
		if(err){
			next(err);
			return;
		}else{
			res.render('test',{'unit':{modules:[]},'jsonUnitList':JSON.stringify(obj),'jsonModel':JSON.stringify({}),'jsonCfg':JSON.stringify({})});
		};
	});
	
	fs.readFile(__appBase +'resource/scripts/'+ req.query.readme, 'utf8', function(err,data){
		if(err){
			res.send('<h3 style="color:red">Oops, readme unavailable</h3><p>'+err+'</p>')
		}else{
			res.send(markdown.toHTML(data));
		}
	});*/
	//res.sendfile(global.appAbsPath+'/resource/html/weather.html')
})


module.exports = router;