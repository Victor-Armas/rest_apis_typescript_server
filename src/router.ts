import { Router } from "express"
import { createProduct, deleteProduct, getProducts, getProductsByID, UpdateAvailability, UpdateProduct, visibilityProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputError } from "./middleware"

const router = Router()
/**  
*
* @swagger
* components:
*      schemas:
*          Product:
*
*
*/

//Routing
router.get('/', getProducts)


router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputError,
    getProductsByID
)

router.post('/', 
    //Validacion
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede estar vacio'),
    body('price')
        .isNumeric().withMessage('El valor debe ser numerico')
        .notEmpty().withMessage('El precio del producto no puede estar vacio')
        .custom( value => value > 0).withMessage('El precio debe ser positivo, mayor a 0'),
    handleInputError,
    createProduct
)

router.put('/:id', 
    //Validacion
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede estar vacio'),
    body('price')
        .isNumeric().withMessage('El valor debe ser numerico')
        .notEmpty().withMessage('El precio del producto no puede estar vacio')
        .custom( value => value > 0).withMessage('El precio debe ser positivo, mayor a 0'),
    body('availability')
        .isBoolean().withMessage('El valor para disponibilidad no es válido'),
    handleInputError,
    UpdateProduct
)

router.delete

router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputError,
    UpdateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputError,
    deleteProduct
)

//EXTRA -----> POR SI SOLAMENTE SE QUIERE OCULTAR LA INFORMACION Y NO ELIMINAR COMPLETAMENTE
router.patch('/:id/v', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputError,
    visibilityProduct
)

export default router