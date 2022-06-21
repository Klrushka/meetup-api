import AuthentificationServices, {generateJwt} from "../services/authentification.services.js"
import passport from "passport"

class AuthentificationController {
    constructor() {
        this.service = new AuthentificationServices()

        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter((prop) => typeof this[prop] === "function")
            .forEach((prop) => (this[prop] = this[prop].bind(this)))
    }

    async registration(req, res, next) {
        try {
            const user = await this.service.createUser(req.body)
            res.status(201).json(user)
        } catch (err) {
            next(err)
        }
    }

    async login(req, res, next) {
        passport.authenticate("local", (err, user) => {
            if (err) {
                res.status(404).json(err)
            } else {
                if (!user) {
                    res.status(401).json({
                        message: "Invalid password or email",
                    })
                } else {
                    res.status(200).json({
                        token: generateJwt(user.id, user.roles),
                    })
                }
            }
        })(req, res, next)
    }
}

export default AuthentificationController
