import swaggerAutogen from "swagger-autogen"
import swaggerDoc from "../config/swagger.doc.js"

const outputFile = "src/swagger/swagger.doc.json"
const endpoints = ["src/routes/meetup.routes.js"]

swaggerAutogen()(outputFile, endpoints, swaggerDoc)
