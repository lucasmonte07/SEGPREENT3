import { Router } from 'express';  
import CartManager from '../../dao/controllers/FileSystem/CManager.js'

const carrito = new CartManager();

const routerCart = Router();

routerCart.get('/', async (req, res) => {    
    let tod = await carrito.getCart();    
    res.send(await tod);    
}) 

routerCart.get('/:cid', async (req, res) => {
    let tod = await carrito.getCart();
    let queCart = tod.find(car => car.cid === parseInt(req.params.cid));
    res.send(await queCart)
})

routerCart.post('/', async (req, res) => {  
    await carrito.addCart(req.body)
    res.send("Carrito Creado");
})

routerCart.post('/:cid/product', async (req, res) => { 
    await carrito.addCartProd(req.params.cid, req.body);    
    res.send("Producto Agregado")
})

export default routerCart;