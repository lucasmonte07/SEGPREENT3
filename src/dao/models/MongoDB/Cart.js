import {Schema, model} from 'mongoose';

const cartCollection = "cart" // nombre de la colección

const cartSchema = new Schema({    
    productos: []        
}) 

export const cartModel = model(cartCollection, cartSchema)
