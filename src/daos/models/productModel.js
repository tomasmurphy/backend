import { Schema, model } from 'mongoose'

const productCollection = 'products'

const productSchema = new Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true
    },
    code: { 
        type: String, 
        required: true, 
        unique: true
    },
    price: { 
        type: Number, 
        required: true
    },
    stock: { 
        type: Number, 
        required: true
    },
    category: { 
        type: String, 
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    thumbnail:{
        type: [String],
        required: true
    }
})

const productModel = model(productCollection, productSchema)

export default productModel