import passport from 'passport'
import { Strategy } from 'passport-local'
import AuthentificationServices from '../services/authentification.services.js'
import bcrypt from 'bcrypt'
import googlePassportAOuth from 'passport-google-oauth2'
import { generateJwt } from '../services/authentification.services.js'

const service = new AuthentificationServices()
const GoogleStrategy = googlePassportAOuth.Strategy

passport.use(
    new Strategy(
        {
            usernameField: 'email',
        },
        async (username, password, done) => {
            try {
                const user = await service.getUserByEmail(username)

                if (!user) {
                    return done(null, false)
                }

                if (!bcrypt.compareSync(password, user.hash)) {
                    return done(null, false)
                }

                return done(null, user)
            } catch (err) {
                return done(err)
            }
        }
    )
)

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/api/auth',
            passReqToCallback: true,
        },
        async function (request, accessToken, refreshToken, profile, done) {
            try {
                let user = await service.getUserByGoogleEmail(profile.email)

                if (!user) {
                    user = await service.createGoogleUser(profile)

                    done(null, user)
                } else {
                    done(null, user)
                }
            } catch (err) {
                done(err)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email, done) => {
    try {
        const user = await service.getUserByGoogleEmail(email)
        done(null, user)
    } catch (err) {
        done(err)
    }
})
