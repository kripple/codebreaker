CREATE TABLE "practice" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "practice_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"win" boolean,
	"max_attempts" integer DEFAULT 8 NOT NULL,
	"user_id" integer NOT NULL,
	"solution" varchar NOT NULL,
	"solution_length" integer DEFAULT 4 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "practice" ADD CONSTRAINT "practice_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;