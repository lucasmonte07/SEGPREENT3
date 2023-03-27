import {Schema, model} from 'mongoose';
import paginate from 'mongoose-paginate-v2'

const prodCollection = "products" // nombre de la colección

const prodSchema = new Schema({
    title:{
        type:String,
        index: true
        }, 
    description: String,
    code: String,
    price: Number,
    status: String,
    stock: Number,
    category:{
        type:String,
        index: true
        },
    thumbnail: String
}) 
prodSchema.plugin(paginate)
export const prodModel = model(prodCollection, prodSchema)
