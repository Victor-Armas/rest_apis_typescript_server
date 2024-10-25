import { exit } from 'node:process'
import db from '../Config/db'

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos Eliminados Correctamente')
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === '--clear'){
    clearDB()
}