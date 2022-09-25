const fs = require("fs");


class Contenedor {
    constructor (fileName){
        this.fileName = fileName;
    }

    save= async(product)=>{
        try{
            if(fs.existsSync(this.fileName)){
                const contenido = await fs.promises.readFile(this.fileName, "utf8");
                const productos = JSON.parse(contenido);
                //Agregar producto.
                const newProduct={
                    id:productos.length+1,
                    ...product
                }
                console.log(`El id del producto es: ${productos.length+1}`)
                productos.push(newProduct);
                await fs.promises.writeFile(this.fileName, JSON.stringify(productos, null, 2))

            } else{
                const newProduct={
                    id:1,
                    ...product
                }
                console.log("El id del producto es: 1")
                await fs.promises.writeFile(this.fileName, JSON.stringify([newProduct], null, 2))
            }
        }catch (error) {
            console.log(error);
        }

    }

    getById= async(id)=>{
        //devuelve el objeto con este id, o null si no esta
        try{
            if(fs.existsSync(this.fileName)){
                const contenido = await fs.promises.readFile(this.fileName, "utf8");
                if (contenido){
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item=>item.id===id);
                    return producto
                } else{
                    return "El archivo esta vacio"
                }
            }
        } catch (error){
            console.log(error)
    }
    }

    getAll = async()=>{
        //devuelve un array con todos los objetos
        const contenido = await fs.promises.readFile(this.fileName, "utf8");
        const productos = JSON.parse(contenido);
        return productos
    }

    deleteById = async(id)=>{
        //recibe id y borra el objeto
        try{
            if(fs.existsSync(this.fileName)){
                const contenido = await fs.promises.readFile(this.fileName, "utf8");
                if (contenido){
                    const productos = JSON.parse(contenido);
                    const producto = productos.filter(item=>item.id!==id);
                    await fs.promises.writeFile(this.fileName, JSON.stringify([producto], null, 2))
                    return producto
                } else{
                    return "El archivo esta vacio"
                }
            }
        } catch (error){
            console.log(error)
        }
    }

    deleteAll= async()=>{
        //borra todos los objetos
        await fs.promises.writeFile(this.fileName, [])
    }
}

const listaDeProductos = new Contenedor("productos.txt")
const producto1 = {
    title:"Galletas surtidas",
    price:"$250",
    thumbnail:"https://arcorencasa.com/wp-content/uploads/2021/03/20210301-13276.png"
}
const producto2 = {
    title:"Papas fritas Lays",
    price:"$300",
    thumbnail:"https://www.multifood.com.ar/images/000Z-007-001-00190159z-001-001-001-lays-clasica.jpg"
}
const crearProductos = async()=>{
    await listaDeProductos.save(producto1)
    await listaDeProductos.save(producto2)
    const resultado = await listaDeProductos.getById(1);
    console.log("El producto correspondiente al id es: ")
    console.log(resultado)
    const productos = await listaDeProductos.getAll();
    console.log("La lista completa de productos es: ")
    console.log(productos)
    const listaActualizada = await listaDeProductos.deleteById(1)
    console.log("La lista con el elemento eliminado queda: ")
    console.log(listaActualizada)
    //listaDeProductos.deleteAll();
    //console.log("El contenido del archivo ha sido eliminado correctamente")
}

crearProductos();
