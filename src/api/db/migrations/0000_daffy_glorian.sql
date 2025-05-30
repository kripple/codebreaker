CREATE TABLE "adhoc_games" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "adhoc_games_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"solution" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "attempts" (
	"game_id" integer NOT NULL,
	"game_attempts_order" integer NOT NULL,
	"value" varchar NOT NULL,
	"feedback" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "id" PRIMARY KEY("game_id","game_attempts_order"),
	CONSTRAINT "game_attempts_order_check" CHECK (
      ("attempts"."game_attempts_order" > 0 AND "attempts"."game_attempts_order" < 17)
    )
);
--> statement-breakpoint
CREATE TABLE "daily_games" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "daily_games_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"solution_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "generic_games" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "generic_games_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"daily_game_id" integer,
	"adhoc_game_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "game_type" CHECK (
      ("generic_games"."daily_game_id" IS NOT NULL AND "generic_games"."adhoc_game_id" IS NULL)
      OR
      ("generic_games"."daily_game_id" IS NULL AND "generic_games"."adhoc_game_id" IS NOT NULL)
    )
);
--> statement-breakpoint
CREATE TABLE "solutions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "solutions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"value" varchar NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "solutions_value_unique" UNIQUE("value"),
	CONSTRAINT "solutions_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "users_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
ALTER TABLE "adhoc_games" ADD CONSTRAINT "adhoc_games_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_game_id_generic_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."generic_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_games" ADD CONSTRAINT "daily_games_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_games" ADD CONSTRAINT "daily_games_solution_id_solutions_id_fk" FOREIGN KEY ("solution_id") REFERENCES "public"."solutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generic_games" ADD CONSTRAINT "generic_games_daily_game_id_daily_games_id_fk" FOREIGN KEY ("daily_game_id") REFERENCES "public"."daily_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generic_games" ADD CONSTRAINT "generic_games_adhoc_game_id_adhoc_games_id_fk" FOREIGN KEY ("adhoc_game_id") REFERENCES "public"."adhoc_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "adhoc_game_user_idx" ON "adhoc_games" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "game_attempts_idx" ON "attempts" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "daily_game_user_idx" ON "daily_games" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "daily_game_solution_idx" ON "daily_games" USING btree ("solution_id");--> statement-breakpoint
CREATE INDEX "daily_game_idx" ON "generic_games" USING btree ("daily_game_id");--> statement-breakpoint
CREATE INDEX "adhoc_game_idx" ON "generic_games" USING btree ("adhoc_game_id");--> statement-breakpoint
CREATE UNIQUE INDEX "daily_game_solution_date_idx" ON "solutions" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX "uuid_idx" ON "users" USING btree ("uuid");