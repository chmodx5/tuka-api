const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../controllers/auth");

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
      user: req.user,
    });
  }
);
router.post("/login", auth.login);
router.post("/register", auth.register);
router.get("/logout", auth.logout);
router.post("/forgotpassword", auth.forgotpassword);
module.exports = router;
