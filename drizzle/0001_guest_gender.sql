CREATE TYPE "public"."gender" AS ENUM('female', 'male');--> statement-breakpoint
ALTER TABLE "guests" ADD COLUMN "gender" "gender" NOT NULL;