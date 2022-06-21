import passport from "passport"
import { Strategy } from "passport-local"
import AuthentificationServices from "../services/authentification.services.js"
import bcrypt from "bcrypt"

const service = new AuthentificationServices()

passport.use(
    new Strategy(
        {
            usernameField: "email",
        },
        async (username, password, done) => {
            try {
                const user = await service.getUserByEmail(username)

                if (!user) {
                    console.log("p1")
                    return done(null, false)
                }

                if (!bcrypt.compareSync(password, user.hash)) {
                    return done(null, false)
                }

                return done(null, user)
            } catch (err) {
                console.log(err)
                return done(err)
            }
        }
    )
)
