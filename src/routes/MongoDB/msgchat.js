import { Router } from 'express';
import ManagerMsgMongoDB from '../../dao/controllers/MongoDB/MMManager.js'

const msgchatMDB = new ManagerMsgMongoDB()

const routerMsgChat = Router()

routerMsgChat.get('/', async (req, res) => {    
    let limite = parseInt(req.query.limit);    
    if(!limite) return res.send(await msgchatMDB.getElements());
    let todos = await msgchatMDB.getElements();    
    let algunos = todos.slice(0, limite);
    res.send(await algunos);    
}) 

routerMsgChat.get('/:id', async (req, res) => {
    let todos = await msgchatMDB.getElemtents();    
    let queProducto = todos.find(prod => prod.id === parseInt(req.params.id));
    res.send(await queProducto)
})

routerMsgChat.delete('/:id', async (req, res) => {  
    await msgchatMDB.deleteElement(req.params.id);    
    res.send("Se efectuó la baja del mensaje");
})

routerMsgChat.post('/', async (req, res) => {  
    await msgchatMDB.addElements(req.body)
    res.send("Mensaje creado");
})

routerMsgChat.put('/:id', async (req, res) => {     
    await msgchatMDB.updateElementById(req.params.id, req.body)
    res.send("Mensaje Modificado");
})

export default routerMsgChat;