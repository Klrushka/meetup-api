import { createLogger, format, transports } from 'winston'

const formatFunction = format.combine(
    format.timestamp(),
    format.printf(
        (info) =>
            `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`
    )
)

const transportConfig = [
    new transports.Console(),
    new transports.File({
        filename: process.env.LOG_FILE_PATH,
    }),
]

class Logger {
    constructor(formatter = formatFunction, transport = transportConfig) {
        return createLogger({
            level: process.env.LOG_LEVEL,
            format: formatter,
            transports: transport,
        })
    }
}

export default Logger
