import prisma from "../../../../../../../lib/prisma/prisma";

export default async function getLocations() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return locations;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}
