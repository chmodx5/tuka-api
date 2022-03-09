const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send("hello motto");
});
router.use("/auth", require("./auth"));
router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/categories", require("./categories"));

module.exports = router;
