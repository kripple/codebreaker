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
ALTER TABLE "attempts" DROP CONSTRAINT "game_type";--> statement-breakpoint
ALTER TABLE "attempts" DROP CONSTRAINT "attempts_daily_game_id_daily_games_id_fk";
--> statement-breakpoint
ALTER TABLE "attempts" DROP CONSTRAINT "attempts_adhoc_game_id_adhoc_games_id_fk";
--> statement-breakpoint
DROP INDEX "daily_game_attempt_idx";--> statement-breakpoint
DROP INDEX "adhoc_game_attempt_idx";--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "id" PRIMARY KEY("game_id","game_attempts_order");--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "game_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "attempts" ADD COLUMN "game_attempts_order" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "generic_games" ADD CONSTRAINT "generic_games_daily_game_id_daily_games_id_fk" FOREIGN KEY ("daily_game_id") REFERENCES "public"."daily_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generic_games" ADD CONSTRAINT "generic_games_adhoc_game_id_adhoc_games_id_fk" FOREIGN KEY ("adhoc_game_id") REFERENCES "public"."adhoc_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "daily_game_idx" ON "generic_games" USING btree ("daily_game_id");--> statement-breakpoint
CREATE INDEX "adhoc_game_idx" ON "generic_games" USING btree ("adhoc_game_id");--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_game_id_generic_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."generic_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "game_attempts_idx" ON "attempts" USING btree ("game_id");--> statement-breakpoint
ALTER TABLE "attempts" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "attempts" DROP COLUMN "daily_game_id";--> statement-breakpoint
ALTER TABLE "attempts" DROP COLUMN "adhoc_game_id";--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "game_attempts_order_check" CHECK (
      ("attempts"."game_attempts_order" > 0 AND "attempts"."game_attempts_order" < 17)
    );