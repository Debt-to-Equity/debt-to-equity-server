CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "phone_number" varchar,
  "email" varchar,
  "password" text,
  "active" boolean,
  "parent_id" int,
  "user_type" varchar,
  "address" varchar,
  "created_at" timestamp,
);

CREATE TABLE "token" (
  "id" SERIAL PRIMARY KEY,
  "token" text,
  "user_id" int,
  "created_at" timestamp
);

CREATE TABLE "expected" (
  "id" SERIAL PRIMARY KEY,
  "transaction_type" varchar,
  "value" varchar,
  "name" varchar,
  "debt_id" int,
  "notes" varchar,
  "user_id" int,
  "created_at" timestamp
);

CREATE TABLE "actual" (
  "id" SERIAL PRIMARY KEY,
  "transaction_type" varchar,
  "name" varchar,
  "notes" varchar,
  "value" varchar,
  "expected_id" int,
  "user_id" int,
  "created_at" timestamp
);

CREATE TABLE "debt" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "amount" varchar,
  "amortized" boolean,
  "interest" varchar,
  "user_id" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "debt_transaction" (
  "id" SERIAL PRIMARY KEY,
  "amount" varchar,
  "notes" varchar,
  "debt_id" int,
  "user_id" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "users" ADD FOREIGN KEY ("parent_id") REFERENCES "users" ("id");

ALTER TABLE "token" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "expected" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "expected" ADD FOREIGN KEY ("debt_id") REFERENCES "debt" ("id");

ALTER TABLE "actual" ADD FOREIGN KEY ("expected_id") REFERENCES "expected" ("id");

ALTER TABLE "actual" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "debt" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "debt_transaction" ADD FOREIGN KEY ("debt_id") REFERENCES "debt" ("id");

ALTER TABLE "debt_transaction" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
