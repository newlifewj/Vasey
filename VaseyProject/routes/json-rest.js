/**
 * Router for JSON-Restful service. The CRUD operation and Ajax data interacting
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/users', function(req, res) {
	console.log(req.path);
	//res.json();
});

/* GET home page. */
router.get('/users/:id', function(req, res) {
	console.log(req.params.id);
	//res.json();
});

module.exports = router;