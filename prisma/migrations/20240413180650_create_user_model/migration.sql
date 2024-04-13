-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
