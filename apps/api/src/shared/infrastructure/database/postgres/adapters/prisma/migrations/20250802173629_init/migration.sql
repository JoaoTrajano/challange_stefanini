-- CreateTable
CREATE TABLE "public"."persons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT,
    "email" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthplace" TEXT,
    "nationality" TEXT,
    "document" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);
