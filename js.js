class ProductManager {
    static idGenerator = 1;
    constructor() {
        this.products = [];
    }
    getProducts() {
        return this.products
    }
    addProduct(title, description, price, stock, thumbnail, code) {
        const newProduct = {
            title,
            description,
            price,
            stock,
            thumbnail,
            code: code,
            id: ProductManager.idGenerator++,
        }
        if (this.products.find(product => product.code === newProduct.code)) {
            console.log("Ese codigo ya existe")
        } else {
            if (
                newProduct.title === (undefined)
                || newProduct.description === (undefined)
                || newProduct.price === (undefined)
                || newProduct.stock === (undefined)
                || newProduct.thumbnail === (undefined)
                || newProduct.code === (undefined)
            ) {
                console.log("Todos los campos son obligarios")
            } else {
                this.products.push(newProduct)
            }
        }


    }
    getProductById(findId) {
        const findProduct = this.products.find(product => product.code === findId)
        findProduct ? console.log(findProduct) : console.log("No hay ningun producto con ese id")
    }
}

const productManager = new ProductManager()
// Agrega dos productos
productManager.addProduct("zapato", "esto es un zapato", 100, 4, "Esto es una foto", 1)
productManager.addProduct("camisa", "esto es una camisa", 200, 5, "Esto es una foto", 2)
// Avisa por consola que todos los campos son obligatorios
productManager.addProduct("pantalon", "esto es un pantalon", 5, "Esto es una foto", 3)
// Avisa por consola que el code se repitio 
productManager.addProduct("remera", "esto es una remera", 500, 10, "Esto es una foto", 2)

// Busca el producto de id 2
productManager.getProductById(2)

// Busca el producto de id 10 y avisa que no esta
productManager.getProductById(10)

// Muestra todos los productos 
console.log(productManager.getProducts())
