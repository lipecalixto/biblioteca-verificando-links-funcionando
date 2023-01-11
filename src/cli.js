import pegaArquivoAsync from "./index.js"
import chalk from "chalk"


const caminho = process.argv

async function processoTexto (caminho) {
    const resultado = await pegaArquivoAsync(caminho[2])

}

processoTexto(caminho)