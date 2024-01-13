require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var { body, validationResult } = require('express-validator');

const userSchema = new mongoose.Schema({
  email: {type: String},
  password: {type: String}
});
const User = mongoose.model('Users', userSchema)

var opts = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.sub}, function(err, user){
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    else {return done(null, false);}
  })
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/register', 
  body("email").trim().isEmail(), 
  body("password").not().isLowercase().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),

function(req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({"errors": errors.array()})
  }

  const mail = req.body.email;
  const pw = req.body.password;

  User.findOne({email: mail}, (err, user) => {
    if(user) {
      return res.status(403).json({email: "Email already in use"})
    }
    else {
      var salt = bcrypt.genSaltSync(10)
      var hash = bcrypt.hashSync(pw,salt)
      const us = new User({
        email: mail,
        password: hash
      });
      us.save()
      res.send("ok")
    }
  })
})

router.post('/api/user/login', function(req, res) {
  User.findOne({email: req.body.email}, (err, user) =>{
    if(!user) {
      return res.status(403).send("No such email")
    }
    else {
      bcrypt.compare(req.body.password, user.password, (err, match) => {
        if(err) throw err;
        if (match) {
          var token = jwt.sign(
            { //payload
              email: user.email,
            },
            process.env.SECRET
          )
          return res.json({"success":true, "token": token})
        }
      })
    }
  })
})

router.get('/api/private', passport.authenticate('jwt', {session: false}), (req,res) => {
  res.json({"email": req.user.email})
})

module.exports = router;
