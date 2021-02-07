import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Propriedade from "./Propriedade"

@Entity('Usuario')
export default class Usuario {
    @PrimaryColumn('uuid')
    Id: String

    @Column()
    Nome: string

    @Column()
    Login: string

    @Column()
    Funcao: string

    @Column()
    PinHash: string

    @Column()
    DataCadastro: Date

    @Column()
    DataAlteracao: Date

    @Column()
    Ativo: boolean

    @ManyToOne(type => Propriedade, usuarios => Usuario, { eager: true })

    @JoinColumn({ name: 'PropriedadeId'})
    propriedade: Propriedade
}