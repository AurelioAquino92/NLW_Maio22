import express from 'express'

const app = express()

app.get('/users', (req, res) => {
    return res.send('Hello user')
})

app.listen(3333, () => {
    console.log('http server is running')
})