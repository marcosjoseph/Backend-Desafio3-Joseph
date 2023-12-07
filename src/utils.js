import fs from "fs";

import {fileURLToPath} from "url";
import {dirname} from "path";

export const __filename = fileURLToPath (import.meta.url);
export const __dirname = dirname(__filename);


async function writeFile (file, data) {
    try {
        await fs.promises.writeFile(__dirname + "/" + file, JSON.stringify(data);
        return true;
    } catch (error) {console.error("Error al crear el archivo")}
} 

async function readFile (file) {
    try {
        let readFileName = __dirname + "/" + file;
        console.log("readfile", readFileName)

        let result  = await fs.promises.readFile(readFileName, "utf-8");
        let data = await JSON.parse(result);
        return data;
    } catch (error) {console.error("Error al leer el archivo")}
} 

async function deleteFile (file) {
    try {
        await fs.promises.unlink(__dirname + "/" + file);
        return true;
    } catch (error) {console.error("No se ha podido eliminar el archivo.")}
}

export default {writeFile, readFile, deleteFile};