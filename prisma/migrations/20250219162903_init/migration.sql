-- CreateEnum
CREATE TYPE "discard_flag" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('VOLUNTEER', 'EXPERT', 'ORGANIZER', 'CONSULTANT');

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "discardflag" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "userrole" AS ENUM ('VOLUNTEER', 'EXPERT', 'ORGANIZER', 'CONSULTANT');

-- CreateEnum
CREATE TYPE "userstatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "content" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "createdby" INTEGER,
    "createddate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "lastupdated" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "statecode" VARCHAR(5) NOT NULL,
    "zip" VARCHAR(10) NOT NULL,
    "image" TEXT,
    "status" "userstatus" NOT NULL,
    "discardflag" "discardflag" NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "contentid" INTEGER,
    "scheduleddate" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "createdby" INTEGER,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createddate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" "userstatus" NOT NULL,
    "discardflag" "discardflag" NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "contentid" INTEGER,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_logs" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "description" TEXT NOT NULL,
    "createddate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hashedpassword" TEXT NOT NULL,
    "zip" VARCHAR(10) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "createddate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "lastupdated" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userrole" "userrole" NOT NULL,
    "status" "userstatus" NOT NULL,
    "discardflag" "discardflag" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_contentid_fkey" FOREIGN KEY ("contentid") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_createdby_fkey" FOREIGN KEY ("createdby") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_contentid_fkey" FOREIGN KEY ("contentid") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_logs" ADD CONSTRAINT "user_logs_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
