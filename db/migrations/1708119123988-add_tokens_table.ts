import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTokensTable1708119123988 implements MigrationInterface {
    name = 'AddTokensTable1708119123988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a8ca5961656d13c16c04079dd" ON "tokens" ("token") `);
        await queryRunner.query(`CREATE INDEX "IDX_d417e5d35f2434afc4bd48cb4d" ON "tokens" ("userId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d417e5d35f2434afc4bd48cb4d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a8ca5961656d13c16c04079dd"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
    }

}
