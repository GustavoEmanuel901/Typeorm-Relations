import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import Usuario from './Usuario'

@Entity('Propriedade')
export default class Propriedade {
    @PrimaryColumn()
    Id: string

    @Column()
    Nome: string

    @Column()
    Localizacao: string

    @Column() 
    Empresa: string

    @Column()
    Observacoes: string

    @Column()
    Ativo: boolean

    @OneToMany(type => Usuario, propriedade => Propriedade)
    usuario: Usuario[]
}
