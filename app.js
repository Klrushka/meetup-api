const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 3000

app.use('/', (req, res) =>{
    res.write('Hi there')
    res.end()
})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})