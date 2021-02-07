import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Usuario1612557238006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Usuario',
            columns: [
                {
                    name: 'Id',
                    type: 'varchar',
                    unsigned: true,
                    isPrimary: true,
                    isUnique: true
                }, 
                {
                    name: 'Nome',
                    type: 'varchar',
                    unsigned: true
                },
                {
                    name: 'Login',
                    type: 'varchar',
                    unsigned: true
                },
                {
                    name: 'Funcao',
                    type: 'varchar',
                    unsigned: true
                },
                {
                    name: 'PinHash',
                    type: 'varchar',
                    unsigned: true
                },
                {
                    name: 'DataCadastro',
                    type: 'timestamp without time zone',
                    unsigned: true
                }, 
                {
                    name: 'DataAlteracao',
                    type: 'timestamp without time zone',
                    unsigned: true
                },
                {
                    name: 'Ativo',
                    type: 'boolean',
                    unsigned: true,
                    isNullable: true
                },
                {
                    name: 'PropriedadeId',
                    type: 'varchar'
                }
            ],
            foreignKeys: [
                {
                    name: 'PropriedadeUsuario',
                    columnNames: ['PropriedadeId'],
                    referencedTableName: 'Propriedade',
                    referencedColumnNames: ['Id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Usuario')
    }

}
