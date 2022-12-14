import express from 'express'
import ProductManager from './ProductManager.js'

    
const app = express();


app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res)  => {
    let productManager = new ProductManager('./src/data/products.json');

    res.send(await productManager.getProducts())
})
app.get('/consultas', (req, res) => {
    let consultas = ["a", "b", "c"];
    res.send(consultas)
});

app.listen(8080, () => console.log("Servidor andando"))
