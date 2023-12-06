import {readFile, writeFile, updateFile, deleteFile} from "./crud.js";

export class ProductManager {
    static ultimoId = 0;
        
    constructor (path) {
        this.path = './productos.json';
        this.products = [];
    }

    async addProduct (nombre, descripcion, img, precio, stock, code) {
        if( nombre === undefined || descripcion === undefined || img === undefined || precio === undefined || stock === undefined || code === undefined) {
            console.error("Por favor completar todos los datos.")
        }
        try {
            let data = await readFile(this.path);
            console.log (data);
            this.products = data?.length>0 ? data : [];
        } catch (error) {console.error(error)}

        let codeExistente = this.products.some((dato) => dato.code === code);

        if (codeExistente) {console.error("El código ya existe, por favor ingrese uno nuevo.")
        } else {
                ProductManager.ultimoId++;
                const nuevoProducto = {
                id: ProductManager.ultimoId,
                nombre,
                descripcion,
                img,
                precio,
                stock,
                code,
        }
        this.products.push(nuevoProducto)
        console.log("Producto Agregado");
        console.log(this.products.length);
        try {
            await writeFile(this.path, this.products)
        } catch (error) { console.error(error)}
        } 
        }

    async getProducts () {
        try {
            let data = readFile(this.path);
            this.products = data;
            return data?.length>0 ? this.products : "No hay archivos guardados";
        } catch (error) {console.error(error)};


        
        if(!productosGuardados.length) {
            id=1;
        } else {id = productosGuardados[productosGuardados.length-1].id+1}

        productosGuardados.push({id,...product})
        await writeFile;
        console.log("El producto se ha agregado")
    }

    async getProductById (idProduct) {
        try {
            let data = readFile(this.path);
            this.products = data?.length>0 ? data : [];

            const elProductoExiste = this.products.find((item) => item.id === idProduct);

            if(elProductoExiste) {return elProductoExiste;
            } else {console.error(`El producto id: ${id} no existe`)}
        } catch (error) {console.error(error)}
    }

    async editProduct(idProduct, nuevoDato) {
        try {
            let data = readFile(this.path)
            this.products = data?.length>0 ? data : [];

            const productoAEditar = this.products.find(item=>item.id === idProduct);

            if(productoAEditar) {
                this.products[productoAEditar] = {...this.products[productoAEditar], ...nuevoDato};
                await writeFile(this.path, data);
                console.log(`El producto ${productoAEditar} ha sido modificado`);
            }
        } catch (error) {console.error(`No se ha encontrado el producto con id: ${idProduct}`)}
    }

    async deleteProductById(idProduct) {
        let data = readFile(this.path)
        this.products = data?.length>0 ? data : [];

        const productosGuardadosNuevo = this.products.filter((item) => item.id === idProduct); 
        await writeFile (this.path, productosGuardadosNuevo)
        console.log(`Se ha eliminado el producto con el id: ${idProduct}`)}
}

async function pruebaFuncional () {
    const productoNuevo = new ProductManager();

    await productoNuevo.addProduct("Mesa", "Mesa de Quebracho", "Url Imagen", 400000, 3, 1000);
    await productoNuevo.addProduct("Banco", "Banco de Quebracho", "Url Imagen", 100000, 10,1001);
    await productoNuevo.addProduct("Banco2", "Banco de Quebracho", "Url Imagen", 100000, 10,1001);
    await productoNuevo.addProduct("Banco3", "Banco de Quebracho", "Url Imagen", 100000);

    const obtenerProductos = await productoNuevo.getProducts();
    console.log(obtenerProductos);

    const buscarProducto = await productoNuevo.getProductById(1);
    console.log(buscarProducto);

    const editarProducto = await productoNuevo.editProduct(2,nombre,"banco de quebracho");
    console.log(editarProducto);

    const borrarProducto = await productoNuevo.deleteProductById(1);
    console.log(borrarProducto);

    const borrarArchivo = await productoNuevo.deleteFile();
    console.log (borrarArchivo)
}

pruebaFuncional();



// console.log(productoNuevo);

// productoNuevo.addProduct("Mesa", "Mesa de Quebracho", "Url Imagen", 400000, 3, 1000);

// productoNuevo.addProduct("Banco", "Banco de Quebracho", "Url Imagen", 100000, 10,1001);

// productoNuevo.addProduct("Banco2", "Banco de Quebracho", "Url Imagen", 100000, 10,1001);

// productoNuevo.addProduct("Estante", "Url Imagen", 60000, 5);

// console.log(productoNuevo);

// console.log(productoNuevo.getProductById(2))
