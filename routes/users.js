const express = require("express");
const router = require("express").Router();
const users = require("../controllers/users");

router.get("/profile", users.getProfile);

module.exports = router;
