const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * GET - Browser test
 */
exports.getTest = (req, res) => {
  res.json({ message: "Design route working ✅" });
};

/**
 * POST - Create Design
 */
exports.createDesign = async (req, res, next) => {
  try {
    const { productType, color, size, price, designData } = req.body;

    const design = await prisma.design.create({
      data: {
        
        productType,
        color,
        size,
        price,
        designData,
         user: {
          connect: {
            id: req.user.id, // 🔥 attach logged in user
          },
        },
      }
    });

    res.status(201).json(design);
  } catch (error) {
    next(error);
  }
};

/**
 * GET - Get All Designs
 */
exports.getDesigns = async (req, res, next) => {
  try {
    const designs = await prisma.design.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(designs);
  } catch (error) {
    next("error",error);
  }
};

 //DElete
 exports.deleteDesign = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.design.delete({
      where: { id }
    });

    res.json({ message: "Design deleted successfully" });

  } catch (error) {
    next(error);
  }
};

