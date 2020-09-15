function numPages(){
    const nomePaginas = [
        {
            titulo: "Ondas de som",
            link: "index.html"
        },
        {
            titulo: "Formas de ondas",
            link: "formasdeondas.html"
        },
        {
            titulo: "Construindo um Sintetizador",
            link: "construindo.html"
        },
        {
            titulo: "Tutorial Modulator",
            link: "modulator.html"
        },
        {
            titulo: "Filtros",
            link: "filtros.html"
        },
        {
            titulo: "Sintetizador",
            link: "sintetizador.html"
        }
    ]
    const titulo = document.getElementById("titulo").innerHTML
    const divConteudo = document.getElementById("conteudo")
    let numPaginaAtual = 0

    const divLink = document.createElement("div")
    divLink.classList.add("link")
    divConteudo.appendChild(divLink)

    for(let cont = 0; cont< Object.keys(nomePaginas).length; cont++){
        if(titulo == nomePaginas[cont].titulo){
            numPaginaAtual = cont
            break
        }
    }
    
    for(let cont = 0; cont< Object.keys(nomePaginas).length; cont++){
        let paragrafo = document.createElement("p")
        paragrafo.classList.add("numpagina")
        divLink.appendChild(paragrafo)

        if(cont == numPaginaAtual)
            paragrafo.innerHTML = cont + 1
        else{
            let link = document.createElement("a")
            link.setAttribute("href", nomePaginas[cont].link)
            link.innerHTML = cont + 1
            paragrafo.appendChild(link)
        }
    }
}