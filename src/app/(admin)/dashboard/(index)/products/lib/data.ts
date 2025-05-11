import prisma from "../../../../../../../lib/prisma/prisma";
import { TColumns } from "../columns";
export default async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        price: true,
        stock: true,
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        location: {
          select: {
            name: true,
          },
        },
        images: true,
        _count: {
          select: {
            OrderProduct: true,
          },
        },
      },
    });
    const responseProducts: TColumns[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      categoryName: product.category.name,
      productName: product.brand.name,
      price: Number(product.price),
      totalSales: product._count.OrderProduct,
      stock: product.stock,
      createdAt: product.createdAt,
    }));
    return responseProducts;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
