import fs from 'fs';
import chalk from 'chalk';

//função para teste
function pegaArquivoSinc (caminho) {
    fs.readFile(caminho, 'utf-8', (erro, texto) => {
        if (erro) {
            trataErro(erro)
        }
        
        console.log(chalk.blue(texto))
    })
}

//função para teste
function pegaArquivoAssinc (caminho) {
    fs.promises
        .readFile(caminho, 'utf-8')
        .then((texto) => console.log(chalk.green(texto)))
        .catch(trataErro)
}

// pegaArquivoSinc('./arquivos/texto.md')
// pegaArquivoAssinc('./arquivos/texto.md')

/* ----------------------------------------------------------------------------------------------------------------------------------------*/ 

function trataErro(e) {
    throw new Error(chalk.red(e.code, 'Ocorreu um erro'))
}

async function pegaArquivoAsync(caminho) {
    try {
        // não retorna
        const texto = fs.promises.readFile(caminho, 'utf-8')
        console.log(texto)

        //retorna
        const texto2 = await fs.promises.readFile(caminho, 'utf-8')
        console.log(texto2)
    } catch (erro) {
        trataErro(erro)
    }
}

// \[[^[\]]*?\]
pegaArquivoAsync('./arquivos/texto.md')