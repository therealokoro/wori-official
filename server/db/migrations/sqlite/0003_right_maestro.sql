ALTER TABLE `message` RENAME COLUMN "lastname" TO "name";--> statement-breakpoint
DROP INDEX `message_lastname_unique`;--> statement-breakpoint
DROP INDEX `message_firstname_unique`;--> statement-breakpoint
DROP INDEX `message_email_unique`;--> statement-breakpoint
DROP INDEX `message_body_unique`;--> statement-breakpoint
ALTER TABLE `message` ADD `is_read` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `message` DROP COLUMN `firstname`;--> statement-breakpoint
ALTER TABLE `message` DROP COLUMN `is-read`;