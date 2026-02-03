CREATE TABLE `album` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`title` text(500) NOT NULL,
	`slug` text(500) NOT NULL,
	`images` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `album_title_unique` ON `album` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `album_slug_unique` ON `album` (`slug`);--> statement-breakpoint
CREATE TABLE `article` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`title` text(500) NOT NULL,
	`description` text(500) NOT NULL,
	`slug` text(500) NOT NULL,
	`content` text NOT NULL,
	`cover_image` text(500) NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `article_title_unique` ON `article` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `article_slug_unique` ON `article` (`slug`);--> statement-breakpoint
CREATE TABLE `message` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`lastname` text(500) NOT NULL,
	`firstname` text(500) NOT NULL,
	`email` text(500) NOT NULL,
	`is-read` integer,
	`body` text NOT NULL,
	`response` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `message_lastname_unique` ON `message` (`lastname`);--> statement-breakpoint
CREATE UNIQUE INDEX `message_firstname_unique` ON `message` (`firstname`);--> statement-breakpoint
CREATE UNIQUE INDEX `message_email_unique` ON `message` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `message_body_unique` ON `message` (`body`);