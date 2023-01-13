import chalk from 'chalk'
import fs from 'fs'
import pegaArquivoAsync from './index.js'

const caminho = process.argv

function mostraLista (lista, nome = '') {
    console.log(
        chalk.red('lista de links'),
        chalk.black.bgGreen(nome),
        lista
    )
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]

    try {
        if (fs.lstatSync(caminho).isFile()) {
            mostraLista(await pegaArquivoAsync(argumentos[2]))
            return
        }
        
        if (fs.lstatSync(caminho).isDirectory()) {
            const arquivos = await fs.promises.readdir(caminho)
    
            arquivos.forEach(async (nomeArquivo)  => {
                const lista = await pegaArquivoAsync(`${caminho}/${nomeArquivo}`)
                mostraLista(lista, nomeArquivo)
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