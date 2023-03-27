
import { promises as fs } from 'fs';
export default class ProductManager {

    constructor() {
        this.file = "./src/dao/models/FileSystem/productos.txt";        
    }
     
    static id = 1;
    
    addProduct = async({ title, description, code, price, status, stock, category, thumbnail }) => {                      

        let duplicado = false;
        let vacio = false;
        
        const nuevoIngreso = { title, description, code, price, status, stock, category, thumbnail };
        const products = JSON.parse(await fs.readFile(this.file, 'utf-8'))

        if(products.find(produ => produ.code == code)) {
            console.log("El Producto ya existe en la base")
            duplicado = true;
        } 

        if(Object.values(nuevoIngreso).includes(undefined)) {        
           console.log(`Alguno de los campos enviados esta vacio`);
           vacio = true;
        }     

        if(duplicado == false && vacio == false) {        
           products.push({...nuevoIngreso, id:ProductManager.id});
           ProductManager.id++;        
           await fs.writeFile(this.file, JSON.stringify(products));
           console.log("producto ingresado")        
        }          
    }     
    
    getProduct = async () => {
        let resultado = await fs.readFile(this.file, 'utf-8')
        return JSON.parse(resultado)
    }     

    getProductById = async (id) => {
        let resultado = await fs.readFile(this.file, "utf-8");
        let caso = JSON.parse(resultado);
        if (caso.find(products => products.id === id)) {
            console.log(caso.find(products => products.id === id));
        }
        else {
            console.log("El Producto especificado no se encuentra en la base");
        }
    };

    deleteProductById = async (id) => {
        let resultado8 = await fs.readFile(this.file, "utf-8");
        let caso = JSON.parse(resultado8);
        let quedan = caso.filter(products => products.id != id);
        await fs.writeFile(this.file, JSON.stringify(quedan));
        console.log("El producto, ha sido eliminado");
        };

    updateProductById = async (id, { title, description, code, price, status, stock, category, thumbnail }) => {
        let todas = await this.getProduct()
        if (todas.some(pr => pr.id == id)) {
            let indice = todas.findIndex(pro => pro.id == id);
            todas[indice].title = title;
            todas[indice].description = description;
            todas[indice].code = code;
            todas[indice].price = price;
            todas[indice].status = status;
            todas[indice].stock = stock;
            todas[indice].category = category;
            todas[indice].thumbnail = thumbnail;            
            await fs.writeFile(this.file, JSON.stringify(todas));
            
            console.log("producto modificado");
        }
        else {            
            console.log("producto no encontrado");
        }
    };
}