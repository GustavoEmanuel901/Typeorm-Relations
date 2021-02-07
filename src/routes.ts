import { Router } from 'express'
import PropriedadeController from './controllers/PropriedadeController'
import UsuarioController from './controllers/UsuarioController'

const routes = Router()

routes.post('/Propriedade', PropriedadeController.create)
routes.get('/Propriedade/:Id', PropriedadeController.index)
routes.delete('/Propriedade/:Id', PropriedadeController.delete)
routes.put('/Propriedade/:Id', PropriedadeController.update)

routes.post('/Usuario', UsuarioController.create)
routes.get('/Usuario/:PropriedadeId', UsuarioController.index)


export default routes