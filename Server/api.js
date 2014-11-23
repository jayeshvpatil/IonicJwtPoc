/**
 * Created by Jay on 11/16/14.
 */
var express = require('express');
var mongoose = require('mongoose');
var User=require('./models/user.js');
var jwt = require('./services/jwt.js');
var bodyParser= require('body-parser');
var request = require('request');

var app = express();

app.use(bodyParser.json());
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

var places=['Atlanta','Charlotte','Miami'];
app.get('/places', function(req,res){
    if(!req.headers.authorization){
        return res.status(401).send({
            message:'You are not authorized'
        });
    }
    var token=req.headers.authorization.split(' ')[1];
    var payload=jwt.decode(token,'sshh..');
    if(!payload.sub){
        res.status(401).send({message:'Authentication failed'});
    }
    res.json(places);
})

function createSendToken(user,req,res){
    var payload={
        iss: req.hostname,
        sub:user.id

    };
    var token = jwt.encode(payload,"sshh..");

    res.status(200).send({
        user: user.toJson(),
        token:token

    });

}
app.post('/login',function(req,res){
    req.user=req.body;
    var searchUser={email:req.user.email};
    User.findOne(searchUser,function(err,user){
        if(err) throw err;
        if(!user)
        return res.status(401).send({message:"Wrong email/password"});
        user.comparePasswords(req.user.password,function(err,isMatch){
            if(err) throw err;
            if(!isMatch)
           return  res.status(401).send({message:"Wrong email/password"});
            createSendToken(user,req,res)
        });
    })

})
app.post('/register',function(req,res){
    var user =req.body;
    console.log(req.body);
    var newUser= new User({
        email: user.email,
        password: user.password
    });
    newUser.save(function(err) {
        createSendToken(newUser,req,res)
    })



})

app.post('/auth/google',function(req,res){
    var url='https://accounts.google.com/o/oauth2/token';
    var API_URL='https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params={
        client_id:req.body.clientId,
        redirect_uri:req.body.redirectUri,
        code:req.body.code,
        grant_type:'authorization_code',
        client_secret:'2Y7zy-hQlbm8msGZ-wUJpIUz'
    };
  //  console.log(req.body.code);
    request.post(url, {
        json: true,
        form: params
    },function(err,response,token) {
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
              }

        //request google+ api for profile info
        request.get({url:API_URL,
                    headers:headers,
                    json:true
                    },function(err,response,profile){
          //console.log(profile);
            User.findOne({googleId:profile.sub},function(err,foundUser){
            if(foundUser) {
                console.log(foundUser);
                return createSendToken(foundUser,req, res);
            }
                var newUser= new User();
                newUser.googleId=profile.sub;
                console.log(profile.sub);
                newUser.displayName=profile.name;
                newUser.save(function(err){
                    if(err) return next(err);

                    createSendToken(newUser,req,res);
                });
            })
        })

});
})
mongoose.connect('mongodb://localhost/psjwt');


var server = app.listen(3000,function(){
    console.log('api listening on',server.address().port);
})