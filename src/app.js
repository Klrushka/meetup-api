import express from "express"
import errorMiddleware from "./middlewares/error.middleware.js"
import swaggerUi from "swagger-ui-express"
import swaggerFile from "./swagger/swagger.doc.json" assert { type: "json" }
import passport from "passport"
import "./config/passport.js"

class App {
    constructor(routes) {
        this.app = express()
        this.port = process.env.PORT ?? 3000

        this.initMiddleware()
        this.initRoutes(routes)
        this.initErrorHandling()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        })
    }

    initMiddleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(passport.initialize())
    }

    initRoutes(routes) {
        routes.forEach((route) => this.app.use("/api", route.router))
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
    }

    initErrorHandling() {
        this.app.use(errorMiddleware)
    }
}

export default App
