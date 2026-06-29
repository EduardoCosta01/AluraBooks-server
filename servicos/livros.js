const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname, '..', 'livros.json')

function getTodosLivros() {
    return JSON.parse(fs.readFileSync(arquivo, 'utf8'))
}

function getLivroPorId(id) {
    const livros = getTodosLivros()
    return livros.find(livro => livro.id === id)
}

function insereLivro(livroNovo) {
    const livros = getTodosLivros()
    const novaListaLivro = [...livros, livroNovo]

    fs.writeFileSync(arquivo, JSON.stringify(novaListaLivro, null, 2))
    return novaListaLivro
}

function modificaLivro(atualizacoes, id) {
    const livrosAtuais = getTodosLivros()
    const indiceModificado = livrosAtuais.findIndex(livro => livro.id === id)

    if (indiceModificado === -1) {
        throw new Error('Livro não encontrado')
    }

    const conteudoModificado = {
        ...livrosAtuais[indiceModificado],
        ...atualizacoes
    }

    livrosAtuais[indiceModificado] = conteudoModificado

    fs.writeFileSync(arquivo, JSON.stringify(livrosAtuais, null, 2))
    return livrosAtuais
}

function deletaLivroId(id) {
    const livros = getTodosLivros()
    const livrosFiltrados = livros.filter(livro => livro.id !== id)

    fs.writeFileSync(arquivo, JSON.stringify(livrosFiltrados, null, 2))
    return livrosFiltrados
}

module.exports = {
    getTodosLivros,
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deletaLivroId
}