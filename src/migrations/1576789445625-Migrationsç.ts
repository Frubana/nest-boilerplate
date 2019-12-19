import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrationsç1576789445625 implements MigrationInterface {
    name = 'Migrationsç1576789445625'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "is_enabled" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
