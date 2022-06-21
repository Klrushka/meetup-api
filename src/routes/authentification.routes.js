import { Router } from "express"
import AuthentificationController from "../controllers/authentification.controller.js"

class AuthentificationRoutes {
    constructor() {
        this.router = Router()
        this.authentificationController = new AuthentificationController()

        this.initRoutes()
    }

    initRoutes() {
        this.router.post(
            "/registration",
            this.authentificationController.registration
        )
        this.router.post("/login", this.authentificationController.login)
    }
}

export default AuthentificationRoutes
