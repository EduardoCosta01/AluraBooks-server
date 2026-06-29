const express = require("express")
const rotaLivros = require('./rotas/livros')

const app = express()

app.use(express.json())
app.use('/livros', rotaLivros)

const port = 8000

app.listen(port, () => {
    console.log(`Escutando na porta ${port}`)
})