var express = require('express');
var multer = require('multer');
var fs = require('fs');
var nodemailer = require('nodemailer');
var credentials = require('../views/credentials');
var router = express.Router();


var upload = multer({dest:'/public/uploads/'});

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
router.post('/uploadfile',upload.any(), function(req, res,next) {
	//檔案存入路徑
	console.log("有近來");
	console.log(req.body);
	console.log(req.files);
	
	if(req.files.length != 0){
		console.log("havefile");
		req.files.forEach(function(file){
			console.log(file);
			
			var filename1 = file.originalname;
			fs.rename(file.path, '/public/images/'+filename1,function(err){
				if(err)throw err;
				
				console.log("file uploaded.....");
			});
			
			mailTransport.sendMail({
		        from: '"AW": amosnowvan@gmail.com',
		        to: 'echoplus2016.gmail.com',
		        subject: '網頁訂單',
		        html: 
		        	
     	
		        '<h2>Echo+網頁訂單</h2>'
		        +'<p>客戶名稱:'+req.body.name+'</p>'
		        +'<p>客戶信箱:'+req.body.mail+'</p>'
		        +'<p>款式:'+req.body.clothType+'</p>'
		        +'<p>色號:'+req.body.color+'</p>'
		        +'<p>件數:'+req.body.numbers+'</p>'
		        +'<p>附加說明:'+req.body.desc+'</p>'
		        	,
		      //附件檔案
		        attachments: [ {
		            filename: filename1,
		            path: '../public/images/'+filename1
		        }]
		    }, function(err) {
		        if(err){
		            console.error('Unable to send confirmation: ' + err.stack);
		            res.send('上傳失敗');
		        		}
		        else{
		        	console.log('email send completed');
		        	res.send('上傳成功');
		        }
		    });				
		});
	}
	else{
		console.log("nofile");
		mailTransport.sendMail({
	        from: '"AW": amosnowvan@gmail.com',
	        to: req.body.mail,
	        subject: '網頁訂單',
	        html: 
	        	
 	
	        '<h2>Echo+網頁訂單</h2>'
	        +'<p>客戶名稱:'+req.body.name+'</p>'
	        +'<p>客戶信箱:'+req.body.mail+'</p>'
	        +'<p>款式:'+req.body.clothType+'</p>'
	        +'<p>色號:'+req.body.color+'</p>'
	        +'<p>件數:'+req.body.numbers+'</p>'
	        +'<p>附加說明:'+req.body.desc+'</p>'
	        	
	    }, function(err) {
	        if(err){
	            console.error('Unable to send confirmation: ' + err.stack);
	            res.send('上傳失敗');
	        		}
	        else{
	        	console.log('email send completed');
	        	res.send('上傳成功');
	        }
	    });
	}
    
				
});
	
module.exports = router;
