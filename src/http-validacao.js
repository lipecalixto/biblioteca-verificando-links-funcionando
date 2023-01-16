import chalk from "chalk"

function extraiLinks (links) {
    return links.map((link) => Object.values(link).join())
}

async function checaStatus (urls) {
    return await Promise.all(
        urls.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status
            } catch (erro) {
                return manejaErros(erro)
            }
        })
    )
    
}

function manejaErros (erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Link não disponivel!'
    }

    return 'Ocorreu algum erro'
}

export default async function listaValidada (listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}