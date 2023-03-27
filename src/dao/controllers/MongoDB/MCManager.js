import mongoose from 'mongoose';
import { cartModel } from '../../../dao/models/MongoDB/Cart.js'
import ManagerProdMongoDB from '../../../dao/controllers/MongoDB/MPManager.js'

const MPMDB = new ManagerProdMongoDB()

export default class ManagerCartMongoDB {    
     
    constructor(collection, schema) {
 //       this.#url = url;
        this.collection = "carts";
        this.schema = cartModel.schema
        this.model = mongoose.model(this.collection, this.schema)
    }

    /*    
    async #setConnection() {
        try {
            await mongoose.connect(this.#url)
            console.log("MongoDB connected")
        } catch(error) {
            console.log("Connection MongoDB failed", error)
            return error
        }
    }
    */

    async getElements() {
      //  this.#setConnection()
        try {
            const elements = await this.model.find()
            return elements
        } catch(error) {
            return ("Error en consulta de elementos MongoDB")
        }
    }

    async addElements(elements) {
       // this.#setConnection()        
        try {
            const msgAdd = await this.model.insertMany(elements)            
            return msgAdd
        } catch(error) {
            return ("Error al agregar elemento/s en MongoDB")
        }
    }   
    
    async getElementById(id) { //Agrego 1 o varios elementos
        //   this.setConnection()
           try {
            const msFind =  await this.model.findById(id)
              return msFind  
            } catch (error) {
               return ("cart no encontrado")
           }
       }        
    
    async deleteElement(id) {
        // this.#setConnection()        
        try {
            const msgDelete = await this.model.findByIdAndRemove(id)            
            return msgDelete
        } catch(error) {
            return ("Error al eliminar elemento en MongoDB")
        }
    }    
    
    deleteProductCart = async( id, { codprod } ) => {                 
        // this.#setConnection()
        try {
            //consulto si el carrito existe
            const carrito = await this.model.findById(id)             
            console.log("carrito existe")            
            
                //consulto si el producto ya existe en el carrito                            
                const queprodu = carrito.productos            
                
                console.log(queprodu)

                //busca producto a eliminar
                
                if(queprodu.find(pro => pro.codprod == codprod)) {              
                    console.log("el producto existe en el carrito")
                    let quedan = queprodu.filter(pro => pro.codprod != codprod) 
                    console.log(quedan)

                    //salvar proceso
                                  
                } else {            
                    console.log("el producto no existe")                    
                }
                
        } catch(error) { 
            console.log("carrito inexistente")   
        }        
    }


    addCartElements = async( id, { codprod, quantify } ) => {                 
        // this.#setConnection()
        try {
            //consulto si el carrito existe
            const carrito = await this.model.findById(id)             
            console.log("carrito existe")
            
            //consulto si el producto existe
            const produc = await MPMDB.getElements()            
            
            if(produc.find(produ => produ.code == codprod)) {
            
                console.log(codprod)  
            
                //consulto si el producto ya existe en el carrito
                const queCarrito = await this.model.findById(id)            
                const queprodu = queCarrito.productos            
                    
                //si existe
                if(queprodu.find(pro => pro.codprod == codprod)) {              
                    console.log("ya existia en el carrito")        
                    let indice = queprodu.findIndex(pro => pro.codprod == codprod);                    
                    let cuantos = queprodu[indice].quantify + quantify
                    queprodu[indice].quantify = cuantos
                    console.log(queprodu)                
                    // como grabo esto en mongodb? 
                    // con carrito.save() no me funciona. no graba nada.    
                
                } else {            
                    
                    //sino existia lo agrego en el carrito    
                    console.log("nuevo")
                    queprodu.push({codprod: codprod, quantify: quantify})                    
                    return queCarrito.save()
                } 
            
            } else {            
                console.log("el producto no existe")            
            }            
            
        } catch(error) { 
            console.log("carrito inexistente")   
        }        
    }
}