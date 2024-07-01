CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"src_code" text NOT NULL,
	"stdinp" text NOT NULL,
	"lang" text NOT NULL,
	"stdout" text NOT NULL,
	"status" text NOT NULL
);
