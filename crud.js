import fs from "fs";

export async function readFile (path) {
    try {
        const result = await fs.promises.readFile(path, "utf-8")
        const data = await JSON.parse(result.toString());
        console.log(data);
        console.log(data.nombre)
    } catch (error) {console.error("Error al leer el archivo")}
}

export async function writeFile (path, text) {
    try {
        await fs.promises.writeFile(path, text)
    } catch (error) {console.error("Error al crear el archivo")}
} 

export async function updateFile (path, text) {
    try {
        await fs.promises.appendFile (path, text)
        console.log(`El archivo ${path} fue modificado con éxito.`)
    } catch (error) {console.error("Error al modificar el archivo")}
}

export async function deleteFile (path) {
    try {
        await fs.promises.unlink(path)
        console.log(`El archivo ${path} fue eliminado.`)
    } catch (error) {console.error("No se ha podido eliminar el archivo.")}
}
