import { Schema, model, SchemaTypeOptions } from 'mongoose'

const cartCollection = 'carts'

const cartSchema = new Schema({
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'productId' },
        quantity: Number,
        _id:false
      }]
})

const cartModel = model(cartCollection, cartSchema)

export default cartModel