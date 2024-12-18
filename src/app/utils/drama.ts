import { prisma } from "@/lib/prisma";

// Cari drama berdasarkan trope dari database
export const searchDramasByTrope = async (trope: string) => {
  try {
    const results = await prisma.drama.findMany({
      where: {
        trope: {
          contains: trope, // Pencarian menggunakan kata kunci (case insensitive)
          mode: 'insensitive',
        },
      },
    });
    return results;
  } catch (error) {
    console.error("Error fetching data from database:", error);
    return [];
  }
};
