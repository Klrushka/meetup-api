import { Router } from 'express'
import AuthentificationController from '../controllers/authentification.controller.js'
import passport from 'passport'

class AuthentificationRoutes {
    constructor() {
        this.router = Router()
        this.authentificationController = new AuthentificationController()

        this.initRoutes()
    }

    initRoutes() {
        this.router.post(
            '/registration',
            this.authentificationController.registration
        )
        this.router.post('/login', this.authentificationController.login)
        this.router.get(
            '/auth/google',
            passport.authenticate('google', { scope: ['email', 'profile'] })
        )
        this.router.get(
            '/auth',
            passport.authenticate('google', {
                successRedirect: '/api/auth/success',
                failureRedirect: '/api/auth/failure',
            })
        )
        this.router.get(
            '/auth/success',
            this.authentificationController.googleAuth
        )
    }
}

export default AuthentificationRoutes
