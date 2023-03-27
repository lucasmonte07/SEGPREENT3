import { Router } from 'express';
import ManagerCartMongoDB from '../../dao/controllers/MongoDB/MCManager.js'

const cartMDB = new ManagerCartMongoDB()

const routerCartMDB = Router()

routerCartMDB.get('/', async (req, res) => {    
    let limite = parseInt(req.query.limit);    
    if(!limite) return res.send(await cartMDB.getElements());
    let todos = await cartMDB.getElements();    
    let algunos = todos.slice(0, limite);
    res.send(await algunos);    
}) 

routerCartMDB.get('/:id', async (req, res) => {
    await cartMDB.getElementById(req.params.id);    
    res.send(await cartMDB.getElementById(req.params.id))
})

routerCartMDB.delete('/:id', async (req, res) => {  
    await cartMDB.deleteElement(req.params.id);    
    res.send("Baja del carrito registrada");
})

routerCartMDB.post('/', async (req, res) => {  
    await cartMDB.addElements(req.body)
    res.send("Carrito creado");
})

routerCartMDB.post('/product/:id', async (req, res) => { 
    await cartMDB.addCartElements(req.params.id, req.body);    
    res.send("Producto Agregado")
})

routerCartMDB.delete('/product/:id', async (req, res) => {  
    await cartMDB.deleteProductCart(req.params.id, req.body);    
    res.send("Baja del producto registrada");
})

export default routerCartMDB;