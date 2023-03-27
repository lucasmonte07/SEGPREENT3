import mongoose from 'mongoose';
import { prodModel } from '../../../dao/models/MongoDB/Producto.js'

export default class ManagerProdMongoDB {    
     
    constructor(collection, schema) {
 //       this.#url = url;
        this.collection = "products";
        this.schema = prodModel.schema
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
            console.log("Error en consulta de elementos MongoDB", error)
        }
    }

    async addElements(elements) {
       // this.#setConnection()        
        try {
            const msgAdd = await this.model.insertMany(elements)            
            return msgAdd
        } catch(error) {
            console.log("Error al agregar elemento/s en MongoDB", error)
        }
    }

    async getElementById(id) { //Agrego 1 o varios elementos
        //   this.setConnection()
           try {
            const msFind =  await this.model.findById(id) 
            return msFind
           } catch (error) {
               return error
           }
       }    


    async updateElementById(id, ...info) {
       // this.#setConnection()        
        try {
            const msgUpdate = await this.model.findByIdAndUpdate(id, ...info)
            return msgUpdate
        } catch(error) {
            console.log("Error en Update de elemento en MongoDB", error)
        }
    }


    async deleteElement(id) {
       // this.#setConnection()        
        try {
            const msgDelete = await this.model.findByIdAndRemove(id)
            return msgDelete
        } catch(error) {
            console.log("Error al eliminar elemento en MongoDB", error)
        }
    }
}



