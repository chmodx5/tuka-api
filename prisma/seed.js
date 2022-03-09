const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  // for (let i = 0; i < 12; i++) {
  //   await prisma.category.create({
  //     data: {
  //       name: faker.commerce.department(),
  //       thumbnail:
  //         faker.image.business() +
  //         "?" +
  //         "random=" +
  //         Math.round(Math.random() * 10000),
  //     },
  //   });
  // }

  for (let i = 0; i < 1000; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        slug: faker.commerce.productAdjective(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        slashedPrice: Number(faker.commerce.price()),
        image:
          faker.image.business() +
          "?" +
          "random=" +
          Math.round(Math.random() * 10000),
        categoryId: Math.floor(Math.random() * 4) + 1,
      },
    });
  }

  console.log("napanda mbegu");
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.disconnect;
  });
