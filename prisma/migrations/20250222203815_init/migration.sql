-- CreateTable
CREATE TABLE "testEvents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "testEvents_pkey" PRIMARY KEY ("id")
);
