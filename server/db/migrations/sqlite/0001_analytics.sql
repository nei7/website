CREATE TABLE `page_views` (
	`id` text PRIMARY KEY NOT NULL,
	`path` text NOT NULL,
	`post_slug` text,
	`referrer_host` text,
	`visitor_hash` text NOT NULL,
	`country` text,
	`browser` text,
	`os` text,
	`device` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `page_views_created_idx` ON `page_views` (`created_at`);--> statement-breakpoint
CREATE INDEX `page_views_path_created_idx` ON `page_views` (`path`,`created_at`);--> statement-breakpoint
CREATE TABLE `web_vitals` (
	`view_id` text PRIMARY KEY NOT NULL,
	`path` text NOT NULL,
	`ttfb` integer,
	`fcp` integer,
	`lcp` integer,
	`inp` integer,
	`cls` real,
	`load_ms` integer,
	`nav_type` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `web_vitals_created_idx` ON `web_vitals` (`created_at`);