const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports.getFeaturedCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
