const { getTodosFavoritos, insereFavorito, deletaFavoritoPorId } = require('../servicos/favoritos')

function getFavoritos(req, res) {
    try {
        const favoritos = getTodosFavoritos()
        res.send(favoritos)
    
    }catch (error) {
    
        res.status(500)
        res.send(error.message)
    }
}

function postFavorito(req, res) {
    try {
        const id = req.params.id
        const idNumero = Number(id)

        if (!Number.isInteger(idNumero) || idNumero < 0) {
            res.status(422)
            res.send('Id inválido')
            return
        }

        const favoritoCriado = insereFavorito(idNumero)
        res.status(201).send(favoritoCriado)

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

function deleteFavorito(req, res) {
    try {
        const id = req.params.id
        const idNumero = Number(id)

        if (!Number.isInteger(idNumero) || idNumero < 0) {
            res.status(422)
            res.send('Id inválido')
            return
        }

        const resultado = deletaFavoritoPorId(idNumero)
        if (!resultado) {
            res.status(404)
            res.send('Favorito não encontrado')
            return
        }

        res.send('Favorito deletado com sucesso')
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

module.exports = {
    getFavoritos,
    postFavorito,
    deleteFavorito
}