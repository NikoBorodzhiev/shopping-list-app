import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1613326382623 implements MigrationInterface {
    name = 'CreateTable1613326382623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "role" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "price" double precision NOT NULL, "owner_id" uuid NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "items_lists" ("list_id" uuid NOT NULL, "item_id" uuid NOT NULL, CONSTRAINT "PK_5d805adfec2060eabf27b4baa44" PRIMARY KEY ("list_id", "item_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c869c622b5396380cb5b5f6341" ON "items_lists" ("list_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5ca8b7acc089468b441e7b2755" ON "items_lists" ("item_id") `);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items" ADD CONSTRAINT "FK_3dfe6bec02ed2b26ded4bd89253" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_lists" ADD CONSTRAINT "FK_c869c622b5396380cb5b5f6341f" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "items_lists" ADD CONSTRAINT "FK_5ca8b7acc089468b441e7b2755d" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_lists" DROP CONSTRAINT "FK_5ca8b7acc089468b441e7b2755d"`);
        await queryRunner.query(`ALTER TABLE "items_lists" DROP CONSTRAINT "FK_c869c622b5396380cb5b5f6341f"`);
        await queryRunner.query(`ALTER TABLE "items" DROP CONSTRAINT "FK_3dfe6bec02ed2b26ded4bd89253"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b"`);
        await queryRunner.query(`DROP INDEX "IDX_5ca8b7acc089468b441e7b2755"`);
        await queryRunner.query(`DROP INDEX "IDX_c869c622b5396380cb5b5f6341"`);
        await queryRunner.query(`DROP TABLE "items_lists"`);
        await queryRunner.query(`DROP TABLE "items"`);
        await queryRunner.query(`DROP TABLE "lists"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
