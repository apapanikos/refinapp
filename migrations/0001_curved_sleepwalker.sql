ALTER TABLE "users_table" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "users_table" DROP COLUMN IF EXISTS "age";