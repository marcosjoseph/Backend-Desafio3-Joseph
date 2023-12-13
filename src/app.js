import express from "express";
import { ProductManager } from "./ProductManager.js"

const app = express();
const PORT = 8081;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

const productManager = new ProductManager ("./productos.json");

app.get("/", (req, res) => {
    res.send("Bienvenidos")
});

app.get("/products", async (req, res) => {
    const {limit} = req.query;
    try {
    let temporalProducts = await productManager.getProducts();
    
    if (limit) {
        // let temporalArray  = temporalProducts.filter((index) => index < limit);
        let temporalArray = temporalProducts.slice(0,+limit);
    
            res.json({
            data: temporalArray,
            limit: limit,
            cant: temporalArray.length,})
        } else {
            res.json({
                data: temporalProducts,
                limit: false,
                cant: temporalProducts.length,})
        } 
    } catch (error){console.log("error app.get", error)}} )

app.get("/products/:pid", async (req, res) => {
    const {pid} = req.params;

    let product = await productManager.getProductById(parseInt(pid));

    if (product) {
        res.json({ message: "success", data: product });
        } else {
        res.json({
            message: "el producto solicitado no existe",
        });
        }
    })