import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Propriedade1612383990573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Propriedade',
            columns: [
                {
                    name: 'Id',
                    type: 'varchar',
                    unsigned: true,
                    isPrimary: true,
                    isUnique: true,
                },
                {
                    name: 'Nome',
                    type: 'varchar',
                    unsigned: true
                },
                {
                    name: 'Localizacao',
                    type: 'varchar',
                    unsigned: true
                }, 
                {
                    name: 'Empresa',
                    type: 'varchar',
                    unsigned: true
                },
                {
                    name: 'Observacoes',
                    type: 'varchar',
                    unsigned: false,
                    isNullable: true
                },
                {
                    name: 'Ativo',
                    type: 'boolean',
                    unsigned: false,
                    isNullable: true
                }    
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Propriedade')
    }

}

