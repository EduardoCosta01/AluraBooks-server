const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname, '..', 'favoritos.json')

function getTodosFavoritos() {
    const conteudo = fs.readFileSync(arquivo, 'utf8').trim()
    if (!conteudo) {
        return []
    }
    return JSON.parse(conteudo)
}

function deletaFavoritoPorId(id) {
    const idNumero = Number(id)
    const favoritos = getTodosFavoritos()
    const favoritoExiste = favoritos.some(favorito => Number(favorito.id) === idNumero)

    if (!favoritoExiste) {
        return null
    }

    const favoritosFiltrados = favoritos.filter(favorito => Number(favorito.id) !== idNumero)
    fs.writeFileSync(arquivo, JSON.stringify(favoritosFiltrados, null, 2))
    return favoritosFiltrados
}

function insereFavorito(id) {
    const favoritos = getTodosFavoritos()
    const novoFavorito = { id: Number(id) }

    const novaListaFavoritos = [...favoritos, novoFavorito]

    fs.writeFileSync(arquivo, JSON.stringify(novaListaFavoritos, null, 2))
    return novoFavorito
}

module.exports = {
    getTodosFavoritos,
    deletaFavoritoPorId,
    insereFavorito
}