import utils from "./utils.js";

export class ProductManager {
    static ultimoId = 0;
        
    constructor (path) {
        this.path = path;
        this.products = [];
    }

    async addProduct (nombre, descripcion, img, precio, stock, code) {
        if( nombre === undefined || descripcion === undefined || img === undefined || precio === undefined || stock === undefined || code === undefined) {
            throw new Error("Por favor completar todos los datos.")
        }
        try {
            let data = await utils.readfile(this.path);
            this.products = data?.length>0 ? data : [];
        } catch (error) {console.error("Error al agregar el producto", error)}

        let codeExistente = this.products.some((dato) => dato.code === code);

        if (codeExistente) {throw new Error("El código ya existe, por favor ingrese uno nuevo.")
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
            await utils.writefile(this.path, this.products)
        } catch (error) { console.error(error)}
        } 
        }

    async getProducts () {
        try {
            let data = await utils.readfile(this.path);
            this.products = data;
            return data?.length>0 ? data : "No hay archivos guardados";
        } catch (error) {console.error(error)};}

    async getProductById (idProduct) {
        try {
            let data = utils.readfile(this.path);
            this.products = data?.length>0 ? data : [];

            const elProductoExiste = this.products.find((item) => item.id === idProduct);

            if(elProductoExiste) {return elProductoExiste;
            } else {return `El producto id: ${id} no existe`}
        } catch (error) {console.error(error)}
    }

    async editProduct(idProduct, nuevoDato) {
        try {
            let data = utils.readfile(this.path)
            this.products = data?.length>0 ? data : [];

            const productoAEditar = this.products.findIndex(item=>item.id === idProduct);

            if(productoAEditar !== -1) {
                this.products[productoAEditar] = {...this.products[productoAEditar], ...nuevoDato};
                await utils.writefile(this.path, data);

                return {
                    message:`El producto ${productoAEditar} ha sido modificado`,
                    data: this.products[productoAEditar],
                }} else { return {message:"No existe el producto solicitado"}}
        } catch (error) {console.error(`No se ha encontrado el producto con id: ${idProduct}`)}
    }

    async deleteProductById(idProduct) {
        try {
            let data = utils.readfile(this.path)
            this.products = data?.length>0 ? data : [];
    
            let productoAEliminar = this.products.findIndex(item=>item.id === idProduct);

            if(productoAEliminar !== -1) {
                let product = this.products[productoAEliminar];
                this.products.splice(productoAEliminar, 1);
                
                await utils.writefile(this.path, data);

                return {
                    message:`El producto ${productoAEliminar} ha sido eliminado`,
                    producto: product,
                }} else { return {message:"No existe el producto solicitado"}}
        } catch (error) {console.error(`No se ha encontrado el producto con id: ${idProduct}`)}
    }
}

export default ProductManager;
