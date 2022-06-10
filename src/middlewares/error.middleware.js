const errorMiddleware = (err, req, res) => {
    const status = err.status ?? 500
    const message = err.message ?? 'smt wrong'

    res.status(status).json({message})
}

export default errorMiddleware
