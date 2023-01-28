import { Router } from "express";
import ProductManager from '../daos/filesManager/ProductManager.js';
import { uploader } from "../utils.js";

const viewsRoutes = Router();
let productManager = new ProductManager('./src/data/products.json');

viewsRoutes.get('/home', async (req, res) => {
    const products = await productManager.getProducts()
    const limit = req.query.limit
    if (!limit) {
        return res.render('home', {
            products: products,
            title: 'Products'
        })
    }
    const limitedProducts = products.slice(0, limit)
    res.render('home', {
        products: limitedProducts,
        title: 'Products'
    })
})

viewsRoutes.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts()
    const limit = req.query.limit
    if (!limit) {
        return res.render('realTimeProducts', {
            products: products,
            title: 'Real Time Products'
        })
    }
    const limitedProducts = products.slice(0, limit)
    res.render('realTimeProducts', {
        products: limitedProducts,
        title: 'Real Time Products'
    })
})

viewsRoutes.post('/realtimeproducts', uploader.array('thumbnail'), async (req, res) => {
    const newProduct = req.body
    let thumbnail = req.files ? (req.files.map(file => `/img/${file.originalname}`)) : [];
    newProduct.thumbnail = thumbnail
    let statusProduct = (newProduct.status) ? newProduct.status.toLowerCase() === "true" ? true : false : true
    let productJson = {
        ...newProduct,
        thumbnail: thumbnail,
        price: +(newProduct.price),
        stock: +(newProduct.stock),
        status: statusProduct
    }
    const createProduct = await productManager.addProduct(productJson)

    const socket = req.app.get('socket')
    console.log(productJson)
    if (!newProduct) {
        return res.status(400).send({
            error: 'missing product'
        })
    }
    socket.emit('newProduct', newProduct)
    res.send({
        status: 'success',
        payload: createProduct
    })
})


viewsRoutes.get('/chat', (req, res) => {

    res.render('chat', {})
})


export default viewsRoutes