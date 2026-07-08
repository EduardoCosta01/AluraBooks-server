const fs = require('fs')
const path = require('path')

const arquivo = path.join(__dirname, '..', 'livros.json')

function getTodosLivros() {
    return JSON.parse(fs.readFileSync(arquivo, 'utf8'))
}

function getLivroPorId(id) {
    const livros = getTodosLivros()
    const idNumero = Number(id)
    return livros.find(livro => Number(livro.id) === idNumero)
}

function insereLivro(livroNovo) {
    const livros = getTodosLivros()
    const novoId = livros.length > 0
        ? Math.max(...livros.map(livro => Number(livro.id))) + 1
        : 1

    const livroComId = {
        ...livroNovo,
        id: novoId
    }

    const novaListaLivro = [...livros, livroComId]

    fs.writeFileSync(arquivo, JSON.stringify(novaListaLivro, null, 2))
    return livroComId
}

function modificaLivro(atualizacoes, id) {
    const livrosAtuais = getTodosLivros()
    const idNumero = Number(id)
    const indiceModificado = livrosAtuais.findIndex(livro => Number(livro.id) === idNumero)

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
    const idNumero = Number(id)
    const livrosFiltrados = livros.filter(livro => Number(livro.id) !== idNumero)

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