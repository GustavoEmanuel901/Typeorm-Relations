import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'

import Usuario from '../models/Usuario'
import { uuid } from 'uuidv4'

export default {
    async index(req: Request, res: Response) {
        const { PropriedadeId } = req.params

        try {
        const UsuarioRepository = getRepository(Usuario)

        const usuario = await UsuarioRepository.find({ where: { propriedade: PropriedadeId}})

        return res.json(usuario)
        } catch (error) {
            console.log(error)
        }
    },
    async create(req: Request, res: Response) {
        const { Nome, Login, Funcao, Pin, propriedade } = req.body

        try {
            const UsuarioRepository = await getRepository(Usuario)

            const PinHash = await bcrypt.hash(Pin, 8)

            const Id = uuid()

            const data = {
                Id,
                Nome, 
                Login,
                Funcao,
                PinHash,
                DataCadastro: new Date(),
                DataAlteracao: new Date(),
                propriedade
            }

            const usuario = await UsuarioRepository.create(data)

            await UsuarioRepository.save(usuario)

            usuario.PinHash = undefined

            return res.status(201).json(usuario)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'SERVER INTERNAL ERROR' })
        }
    }
}