import { promises as fs, readFile } from 'fs';
import ProductManager from '../../../dao/controllers/FileSystem/PManager.js'
export default class CartManager {

    constructor() {
        this.cfile = "./src/dao/models/FileSystem/carrito.txt";
        this.pfile = "./src/dao/models/FileSystem/productos.txt"        
    }
     
    static cid = 1;    
    
    getCart = async () => {
        let resul = await fs.readFile(this.cfile, 'utf-8')
        return JSON.parse(resul)
    }    
    
    addCart = async({ productos }) => {        
        const carts = JSON.parse(await fs.readFile(this.cfile, 'utf-8'))
        carts.push({ cid:CartManager.cid, productos });
        CartManager.cid++;        
        await fs.writeFile(this.cfile, JSON.stringify(carts));
    }  

    addCartProd = async( cid, { codprod, quantify } ) => {
        //consulto si el carrito existe 
        let existcart = JSON.parse(await fs.readFile(this.cfile, 'utf-8'))        
        if(existcart.find(car => car.cid === parseInt(cid))) {

            //consulto si el producto existe
            let fileprod = JSON.parse(await fs.readFile(this.pfile, 'utf-8'))            
            if(fileprod.find(produ => produ.code == codprod)) {
                                       
                let tod = await this.getCart();        
                let queCart = tod.find(car => car.cid === parseInt(cid));
                let produ = queCart.productos            
            
                //consulto si ese producto ya existia en el carrito
                //si existia solo actualizo el quantify
                if(produ.find(pro => pro.codprod == codprod)) {
                    let indice = produ.findIndex(pro => pro.codprod == codprod);                    
                    let cuantos = produ[indice].quantify + quantify
                    produ[indice].quantify = cuantos                    
                } else {
                    //sino existia lo agrego en el carrito    
                    produ.push({codprod, quantify})                    
                }            
                
                //registro la operacion
                await fs.writeFile(this.cfile, JSON.stringify(tod))
        
            } else {
                console.log("El producto no existe")
            }
        } else {
            
            console.log("el carrito no existe")
            
        }    
    } 
}