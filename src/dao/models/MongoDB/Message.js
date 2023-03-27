import {Schema, model} from 'mongoose';

const msgCollection = "messages" // nombre de la colección

const msgSchema = new Schema({
    user: String,
    message: String
}) 

export const msgModel = model(msgCollection, msgSchema)
