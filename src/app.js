import express from 'express'
import ProductManager from './ProductManager.js'

    
const app = express();
let productManager = new ProductManager('./src/data/products.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res)  => {
    let products =  await productManager.getProducts()
    let limit = req.query.limit;
    if(!limit) return res.send({products})

    let productLimit =  products.filter((product, indice) => indice < limit );
    
    res.send({productLimit})
})
app.get('/products/:pid', async (req, res) => {
    let pid = req.params.pid;
    let products =  await productManager.getProducts()
    let product =  products.find(p => p.id == pid);
    
    if (!product) return res.send( 'No existe ese ID')

    res.send({product})
});


app.listen(8080, () => console.log("Servidor andando"))
