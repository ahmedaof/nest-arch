import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumnToUser1708254282222 implements MigrationInterface {
    name = 'AddRoleColumnToUser1708254282222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying(100) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
