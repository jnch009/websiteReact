var express = require("express");
var secured = require("../lib/middleware/secured");
var router = express.Router();

/* GET user profile. */
router.get("/profile", secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  //   res.render('user', {
  //     userProfile: JSON.stringify(userProfile, null, 2),
  //     title: 'Profile page'
  //   });
  res.json({userProfile: JSON.stringify(userProfile, null, 2),title: 'Profile Page'});
});

module.exports = router;
