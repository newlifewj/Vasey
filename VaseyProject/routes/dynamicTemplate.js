/**
 * Router for JSON-Restful service. The CRUD operation and Ajax data interacting
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:path/dynamicComponent', function(req, res) {
	res.render('ejs/'+req.params.path+'/dynamicComponent',{'model': 'DYNAMIC TEXT'});
});

module.exports = router;