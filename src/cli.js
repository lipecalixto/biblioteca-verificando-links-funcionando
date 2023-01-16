import chalk from 'chalk'
import fs from 'fs'
import pegaArquivoAsync from './index.js'
import listaValidada from './http-validacao.js'

const caminho = process.argv

async function mostraLista (valida, lista, nome = '') {
    if (valida) {
        console.log(
            chalk.red('lista validada'),
            chalk.black.bgGreen(nome),
            await listaValidada(lista)
        )

        return
    }

    console.log(
        chalk.red('lista de links'),
        chalk.black.bgGreen(nome),
        lista
    )
}

async function processaTexto(argumentos) {
    const caminho   = argumentos[2]
    const valida    = argumentos[3] === '--valida'

    try {
        if (fs.lstatSync(caminho).isFile()) {
            mostraLista(valida, await pegaArquivoAsync(argumentos[2]))
            return
        }
        
        if (fs.lstatSync(caminho).isDirectory()) {
            const arquivos = await fs.promises.readdir(caminho)
    
            arquivos.forEach(async (nomeArquivo)  => {
                const lista = await pegaArquivoAsync(`${caminho}/${nomeArquivo}`)
                mostraLista(valida, lista, nomeArquivo)
            })

            return
        }
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log(chalk.red('Arquivo ou diretorio não existe'))
            return
        } 
    }

}

processaTexto(caminho)