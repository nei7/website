CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`post_slug` text NOT NULL,
	`user_id` text NOT NULL,
	`parent_id` text,
	`body` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`deleted_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `comments_post_created_idx` ON `comments` (`post_slug`,`created_at`);--> statement-breakpoint
CREATE INDEX `comments_user_created_idx` ON `comments` (`user_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`login` text NOT NULL,
	`name` text,
	`avatar_url` text,
	`created_at` integer NOT NULL,
	`last_login_at` integer NOT NULL
);
