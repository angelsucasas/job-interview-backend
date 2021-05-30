import {MigrationInterface, QueryRunner} from "typeorm";

export class hope771622257859564 implements MigrationInterface {
    name = 'hope771622257859564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Account" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "product_number" integer NOT NULL, "current_amount" integer NOT NULL, CONSTRAINT "PK_bf68fd30f1adeede9c72a5cac09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Employee" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "first_name" text NOT NULL, "second_name" text, "first_lastname" text NOT NULL, "second_lastname" text, "position" text NOT NULL, "deparment" text NOT NULL, CONSTRAINT "PK_9a993c20751b9867abc60108433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_supervisor" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "employee_fk" integer, "supervisor_fk" integer, CONSTRAINT "PK_6a2fbedecc40487d99a47bdcbff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_account" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "employee_fk" integer, "account_fk" integer, CONSTRAINT "PK_f92b141ca4b0ca2defc719674cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "amount" text NOT NULL, "description" text, "origin_fk" integer, "destiny_fk" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "concept" text NOT NULL, "aproved_by" text NOT NULL, "sign" text NOT NULL, "start_date" TIMESTAMP DEFAULT now(), "end_date" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invoice_transaction" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "invoice_fk" integer, "transaction_fk" integer, CONSTRAINT "PK_a32ef5f07283d881032b4fa961e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_supervisor" ADD CONSTRAINT "FK_734bf5d8642fb1bb306a77ec067" FOREIGN KEY ("employee_fk") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_supervisor" ADD CONSTRAINT "FK_9187a78393679e73fdc7213c380" FOREIGN KEY ("supervisor_fk") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_account" ADD CONSTRAINT "FK_19afaf3d3c2466bec2830a83866" FOREIGN KEY ("employee_fk") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_account" ADD CONSTRAINT "FK_9d30756363446acb54d1aae9487" FOREIGN KEY ("account_fk") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_35ec5160cf22cb744ebad576c35" FOREIGN KEY ("origin_fk") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_0a08f87b2353326c66e41ebbb10" FOREIGN KEY ("destiny_fk") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice_transaction" ADD CONSTRAINT "FK_66faf2dfe86570fba6e56e05da7" FOREIGN KEY ("invoice_fk") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice_transaction" ADD CONSTRAINT "FK_996846117d5ae0da5886a05de9f" FOREIGN KEY ("transaction_fk") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice_transaction" DROP CONSTRAINT "FK_996846117d5ae0da5886a05de9f"`);
        await queryRunner.query(`ALTER TABLE "invoice_transaction" DROP CONSTRAINT "FK_66faf2dfe86570fba6e56e05da7"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_0a08f87b2353326c66e41ebbb10"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_35ec5160cf22cb744ebad576c35"`);
        await queryRunner.query(`ALTER TABLE "employee_account" DROP CONSTRAINT "FK_9d30756363446acb54d1aae9487"`);
        await queryRunner.query(`ALTER TABLE "employee_account" DROP CONSTRAINT "FK_19afaf3d3c2466bec2830a83866"`);
        await queryRunner.query(`ALTER TABLE "employee_supervisor" DROP CONSTRAINT "FK_9187a78393679e73fdc7213c380"`);
        await queryRunner.query(`ALTER TABLE "employee_supervisor" DROP CONSTRAINT "FK_734bf5d8642fb1bb306a77ec067"`);
        await queryRunner.query(`DROP TABLE "invoice_transaction"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "employee_account"`);
        await queryRunner.query(`DROP TABLE "employee_supervisor"`);
        await queryRunner.query(`DROP TABLE "Employee"`);
        await queryRunner.query(`DROP TABLE "Account"`);
    }

}
