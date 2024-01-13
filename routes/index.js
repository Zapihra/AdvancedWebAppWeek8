require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email: {type: String},
  password: {type: String}
});
const User = mongoose.model('Users', userSchema)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/register', function(req, res) {
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

module.exports = router;
