const express = require('express');
const ProductManager = require("./ProductManager");
const productManager = new ProductManager("./src/products.json");
const PORT = 8080
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, ()=> console.log(`📢 Server listening on port: ${PORT}`));


app.get('/products', async (req, res) => {
    try{
        const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit){
        res.status(200).json(products.slice(0, limit));
    } else{
        res.status(200).json(products);
    }
    }
    catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }
});


app.get('/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
    const product = await productManager.getProductById(parseInt(id));
    if (product) {
        res.status(200).json(product);
    } else {
        return res.status(404).json({error: 'Product not found'});
    }
    }
    catch (error) {
        res.status(500).json({message: 'Error encountered'});
    }
});