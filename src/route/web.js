import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"


let router = express.Router()

let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD) //CREATE

    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD) // READ
    router.get('/edit-crud', homeController.getEditCRUD) // EDIT

    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD) //DELETE

    router.post('/api/login', userController.handleLogin)

    return app.use('/', router)
}

module.exports = initWebRouter