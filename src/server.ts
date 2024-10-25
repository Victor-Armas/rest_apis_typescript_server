import  express  from "express";
import  colors  from "colors";
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import SwaggerUi from "swagger-ui-express";
import swaggerSpec from "./Config/swagger";
import router from "./router";
import db from "./Config/db";

//Conectar a base de datos
async function conectDB() {
    try {
        await db.authenticate()
        db.sync()
    } catch (error) {
        //console.log(error)
        console.log(colors.bgRed.bold('Hubo un error al conectar a la base de datos'))
    }
}

conectDB()

//Intancia de Express 
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

//DOCS
server.use('/docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec))

export default server