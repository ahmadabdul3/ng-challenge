var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  /*res.write(templateFn({name: 'index'}));
  res.end();*/
});

/*
router.get('/posts', function (req, res, next) {
	Post.find(function (err, posts) {
		if(err) {return next(err);}

		res.json(posts);
	});
});
*/





module.exports = router;