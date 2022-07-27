import Logger from '../services/logger.js'

const errorMiddleware = (err, req, res, _) => {
    const status = err.status ?? 500
    const message = err.message ?? 'smt wrong'
    const logger = new Logger()

    logger.error(`${err.message}. Status code: ${err.status}`)

    res.status(status).json({ message })
}

export default errorMiddleware
