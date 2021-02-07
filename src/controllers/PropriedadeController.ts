import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { uuid } from 'uuidv4'
import Propriedade from '../models/Propriedade'

export default {

    async index(req: Request, res: Response) {
        const { Id } = req.params

        try {
            const PropriedadeRepository = await getRepository(Propriedade)

            const propriedade = await PropriedadeRepository.findOne({ where: { Id }})

            if(!propriedade) {
                return res.status(404).json({ message: 'PROPRIEDADE NOT FOUND' })
            }

            return res.status(200).json(propriedade)
        } catch (error) {
            return res.status(500).json({ message: 'SERVER INTERNAL ERROR'})
        }
    },

    async create(req: Request, res: Response) {
        const { Nome, Localizacao, Empresa, Observacoes } = req.body

        try {
            const PropriedadeRepository = getRepository(Propriedade)

            const Id = uuid()

            const data = {
                Id,
                Nome,
                Localizacao, 
                Empresa,
                Observacoes
            }

            const propriedade = await PropriedadeRepository.create(data)

            await PropriedadeRepository.save(propriedade)

            return res.status(201).json(propriedade)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'SERVER INTERNAL ERROR' })
        }
    },

    async update(req: Request, res: Response) {
        const { Nome, Localizacao, Empresa, Observacoes } = req.body
        const { Id } = req.params

        try {
            const PropriedadeRepository = await getRepository(Propriedade)

            const propriedade = await PropriedadeRepository.findOne({ where: { Id } })

            await PropriedadeRepository
                .createQueryBuilder()
                .update()
                .set({ 
                    Nome: Nome != propriedade.Nome ? Nome : propriedade.Nome,
                    Localizacao: Localizacao != propriedade.Localizacao ? Localizacao : propriedade.Localizacao,
                    Empresa: Empresa != propriedade.Empresa ? Empresa : propriedade.Empresa,
                    Observacoes: Observacoes != propriedade.Observacoes ? Observacoes : propriedade.Observacoes 
                })
                .where("Id = :Id", { Id })
                .execute()
            return res.status(200).json({ message: 'UPDATE WITH SUCCESS'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'SERVER INTERNAL ERROR '})
        }
    },

    async delete(req: Request, res: Response) {
        const { Id } = req.params

        try {
            const PropriedadeRepository = getRepository(Propriedade)

            const propriedade = await PropriedadeRepository.findOne({ where: { Id }})

            if(!propriedade) {
                return res.status(404).json({ message: 'PROPRIEDADE NOT FOUND' })
            }

            await PropriedadeRepository
                    .createQueryBuilder()
                    .delete()
                    .where('Id = :Id', { Id })
                    .execute()

            return res.status(200).json({ message: 'DELETED SUCCESSFULLY'})
        } catch (error) {
            return res.status(500).json({ message: 'SERVER INTERNAL ERROR'})
        }
    }
}