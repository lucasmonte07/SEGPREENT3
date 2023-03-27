import mongoose from 'mongoose';
import { msgModel } from '../../../dao/models/MongoDB/Message.js'

export default class ManagerMsgMongoDB {    
     
    constructor(collection, schema) {
 //       this.#url = url;
        this.collection = "messages";
        this.schema = msgModel.schema
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

    async getElementsById(id) {
       // this.#setConnection()        
        try {
            const element = await this.model.findById(id)
            return element
        } catch(error) {
            console.log("Error en consulta de elemento en MongoDB", error)
        }
    }
    
}