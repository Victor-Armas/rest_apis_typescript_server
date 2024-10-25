import {request, Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) =>{
    const products = await Product.findAll({
        order: [
            ['id', 'DESC'] //Para traer de id mas nuevo al mas antiguo {4,3,2,1}
            //['price', 'DESC'] //Para traer del mas caro al mas economico
        ],
        attributes:{exclude: ['createdAt','updatedAt']} //para que no muestre ciertas columnas al momento de consultar
    })
    res.json({data: products})
}

export const getProductsByID = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return 
    }
    res.json({data: product})
}

export const createProduct = async (req: Request, res: Response) =>{
    const product = await Product.create(req.body)
    res.status(201).json({data: product})

}

export const UpdateProduct = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return 
    }

    //Actualizar
    //NOTA IMPORTANTE: Cuando se trabaja con PUT se debe de actualizar todas las columnas, name, price, availability, por eso se hace la validacion en el router (router.ts)
    //ya que si no actualizas todo, te puede borrar lo que no esta actualizando
    await product.update(req.body)
    await product.save()

    
    res.json({data: product})
}

export const UpdateAvailability = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return 
    }

    //Actualizar
    //De esta manera solamente con enviar la informacion (SEND) hace que cambie el valor de Availability
    product.availability = !product.dataValues.availability

    await product.save()
    res.json({data: product})
}





export const deleteProduct = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return 
    }

    await product.destroy()
    res.json({data: 'Producto Eliminado'})
    
}

//Por si en ves de Eliminar solamente ocultar la informacion
export const visibilityProduct = async (req: Request, res: Response) =>{
    const {id} = req.params
    const product = await Product.findByPk(id)

    if(!product){
        res.status(404).json({
            error: 'Producto no encontrado'
        })
        return 
    }

    //Actualizar
    //De esta manera solamente con enviar la informacion (SEND) hace que cambie el valor de Availability
    product.visibility = !product.dataValues.visibility

    await product.save()
    res.json({data: product})
}