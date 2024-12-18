-- CreateTable
CREATE TABLE "Drama" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "episode" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "sinopsis" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "trope" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Drama_pkey" PRIMARY KEY ("id")
);
