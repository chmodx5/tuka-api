const { PrismaClient } = require("@prisma/client");
const router = require("express").Router();
const passport = require("passport");
const utils = require("../lib/utils");

const prisma = new PrismaClient();

module.exports.login = async (req, res, next) => {
  console.log(req.body.username);
  const selecteduser = await prisma.user.findMany({
    where: {
      // categoryId: req.params.category,
      name: req.body.username,
    },
  });

  if (selecteduser.length === 0) {
    res.send("user not found");
  } else {
    const user = selecteduser[0];
    const { password } = req.body;
    const { hash, salt } = user;
    if (utils.validPassword(password, hash, salt)) {
      const token = utils.issueJWT(user);
      res.status(200).json({
        success: true,
        token: token,
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "Password is incorrect",
      });
    }
  }
};

module.exports.register = async (req, res) => {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  try {
    prisma.user
      .create({
        data: {
          name: req.body.username,
          email: req.body.email,
          hash: hash,
          salt: salt,
        },
      })
      .then((user) => {
        const jwt = utils.issueJWT(user);
        res.json({
          success: true,
          user: user,
          token: jwt.token,
          expiresiIn: jwt.expires,
        });
      });
  } catch (err) {
    next(err);
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.forgotpassword = async (req, res) => {
  res.send("forgotpassword");
};
