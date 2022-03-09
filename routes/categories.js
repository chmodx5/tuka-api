const express = require("express");
const router = express.Router();
const categories = require("../controllers/categories");

// geting products from by category
router.get("/featured", categories.getFeaturedCategories);

// geting products from by category
router.get("/", categories.getAllCategories);

module.exports = router;
