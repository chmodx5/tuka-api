const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

//somehow get all the products, not really a billion dollar idea hahah
router.get("/products", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({});

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// geting products from by category
router.get("/products/category/:category", async (req, res, next) => {
  // need to add validation
  let { category } = req.params;
  try {
    const getCategory = await prisma.category.findMany({
      where: {
        name: category,
      },
    });
    const catid = Number(getCategory[0].id);
    const products = await prisma.product.findMany({
      where: {
        // categoryId: req.params.category,
        categoryId: 1,
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// geting all categories
router.get("/products/categories", async (req, res, next) => {
  try {
    const products = await prisma.category.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// getting single product using id
router.get("/product/:id", async (req, res, next) => {
  try {
    //get the id from the request
    //the id needs some validation : **note**
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//getting featured products
router.get("/products/featured", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({});
    // return n random items from the database
    res.json(products.sort(() => Math.random() - Math.random()).slice(0, 10));
  } catch (error) {
    next(error);
  }
});

// getting trending products
router.get("/products/trending", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({});
    // return n random items from the database
    res.json(products.sort(() => Math.random() - Math.random()).slice(0, 5));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
