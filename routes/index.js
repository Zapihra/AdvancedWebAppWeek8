var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: {type: String},
  password: {type: String}
});
const User = mongoose.model('Users', userSchema)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/user/register/', function(req, res) {
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
module.exports = router;
