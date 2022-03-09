const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({});
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports.getProductsByCategory = async (req, res) => {
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
};

module.exports.getSingleProduct = async (req, res) => {
  try {
    //get the id from the request
    //the id needs some validation : **note**
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

module.exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({});
    // return n random items from the database
    res.json(products.sort(() => Math.random() - Math.random()).slice(0, 10));
  } catch (error) {
    next(error);
  }
};

module.exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({});
    // return n random items from the database
    res.json(products.sort(() => Math.random() - Math.random()).slice(0, 5));
  } catch (error) {
    next(error);
  }
};

module.exports.getRecommendedProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({});
    // return n random items from the database
    res.json(products.sort(() => Math.random() - Math.random()).slice(0, 10));
  } catch (error) {
    next(error);
  }
};
