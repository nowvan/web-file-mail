var express = require('express');
var multer = require('multer');
var fs = require('fs');
var nodemailer = require('nodemailer');
var credentials = require('../views/credentials');
var router = express.Router();


//創建寄信工具
var mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: credentials.gmail.user,
        pass: credentials.gmail.pass
    }
});

/* GET home page. */
//req.body.
router.post('/uploadfile', function(req, res) {	
	//檔案存入路徑
	var path = '../public/uploads';
	fs.mkdir(path, function (err) {
		if (err) {
			console.log('failed to create directory', err);
		} 
	});
	//multer儲存資訊
	var originalname;
	var storage = multer.diskStorage({
		destination : function(req, file, callback) {
			callback(null, path);
		},
		filename : function(req, file, callback) {
			var fileFormat = (file.originalname).split(".");
			 //console.log(fileFormat);
			 originalname = file.originalname.slice(0,
					(fileFormat[fileFormat.length - 1].length + 1) * -1);
			callback(null, originalname + '-' + Date.now() + "."+ fileFormat[fileFormat.length - 1]);
		}
	});
	var upload = multer({
		storage : storage
	}).single('uploadfile');
	console.log(req.session.companyname);
	// console.log(req);
	// console.log(Date.now());
	upload(req, res, function(err) {		
		if (err) {
			console.log('Error Occured');
			return;
		}
		console.log(req.file);
		console.log('file uploaded');
		
		mailTransport.sendMail({
	        from: '"BIAU": biaufileserver@gmail.com',
	        to: req.body.mail,
	        subject: 'BIAU感謝您的註冊',
	        html: '<h2>有訂單喔感謝您的註冊</h2>'
	        +'<p>'+req.body.name+'</p>'
	        +'<p>'+req.body.clothType+'</p>'
	        +'<p>'+req.body.color+'</p>'
	        +'<p>'+req.body.numbers+'</p>'
	        +'<p>'+req.body.desc+'</p>'
	    }, function(err) {
	        if(err){
	            console.error('Unable to send confirmation: ' + err.stack);
	        		}
	    });
	});
	
	
	
	
});

module.exports = router;
