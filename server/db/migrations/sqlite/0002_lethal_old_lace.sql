PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_article` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`title` text(500) NOT NULL,
	`description` text(500) NOT NULL,
	`slug` text(500) NOT NULL,
	`content` text NOT NULL,
	`cover_image` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_article`("id", "title", "description", "slug", "content", "cover_image", "created_at") SELECT "id", "title", "description", "slug", "content", "cover_image", "created_at" FROM `article`;--> statement-breakpoint
DROP TABLE `article`;--> statement-breakpoint
ALTER TABLE `__new_article` RENAME TO `article`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `article_title_unique` ON `article` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `article_slug_unique` ON `article` (`slug`);