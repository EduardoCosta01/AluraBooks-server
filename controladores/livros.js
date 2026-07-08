const { getTodosLivros, getLivroPorId, insereLivro, modificaLivro, deletaLivroId } = require('../servicos/livros')

function getLivros(req, res) {
    try {
        const livros = getTodosLivros()
        res.send(livros)
    
    }catch (error) {
    
        res.status(500)
        res.send(error.message)
    }
}

function getLivro(req, res) {
    try {
        const id = req.params.id
        const idNumero = Number(id)
        
        if (Number.isInteger(idNumero) && idNumero >= 0) {
            const livro = getLivroPorId(id)
            if (!livro) {
                res.status(404)
                res.send('Livro não encontrado')
                return
            }
            res.send(livro)
        } else {
            res.status(422)
            res.send('Id inválido')
        }
    
    } catch (error) {
    
        res.status(500)
        res.send(error.message)
    }
}

function postLivro(req, res) {
    try {
        const livroNovo = req.body
        const nomeValido = typeof livroNovo.nome === 'string' && livroNovo.nome.trim().length > 0

        if (nomeValido) {
            const livroCriado = insereLivro(livroNovo)
            res.status(201).send(livroCriado)
        } else {
            res.status(422)
            res.send('O campo nome é obrigatório e não pode ser vazio')
        }
        
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

function patchLivro (req, res) {
    try{
        const id = req.params.id
        const idNumero = Number(id)
        const body = req.body

        if (!body || Object.keys(body).length === 0) {
            res.status(422)
            res.send('Nenhum dado enviado para atualizar')
            return
        }

        if (body.nome !== undefined && (typeof body.nome !== 'string' || body.nome.trim().length === 0)) {
            res.status(422)
            res.send('O campo nome não pode ser vazio')
            return
        }

        if (Number.isInteger(idNumero) && idNumero >= 0) {
            modificaLivro(body, id)
            res.send('Item modificado com sucesso')
        } else {
            res.status(422)
            res.send('Id inválido')
        }

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

function deleteLivro(req, res) {
    try {
        const id = req.params.id
        const idNumero = Number(id)

         if (Number.isInteger(idNumero) && idNumero >= 0) {
             deletaLivroId(id)
             res.send('Livro deletado com sucesso')
         } else {
            res.status(422)
            res.send('Id inválido')
        }

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getLivros,
    getLivro,
    postLivro,
    patchLivro,
    deleteLivro
}