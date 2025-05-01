import prisma from "../../../../../../../lib/prisma/prisma";

export default async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return brands;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
