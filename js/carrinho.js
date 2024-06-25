let todosProdutos = [
    {
        id: 1,
        nome: "RTX 4070 Super",
        preco: "R$4.099,99",
        img: "../imagens/rtx4070.png"
    },
    {
        id: 2,
        nome: "RX 6600 Eagle",
        preco: "R$1.369,99",
        img: "../imagens/rx6600.png"
    },
    {
        id: 3,
        nome: "RTX 3050 Ventus 2x",
        preco: "R$1.369,99",
        img: "../imagens/rtx3050.png"
    },
    {
        id: 4,
        nome: "GTX 1630 Galax",
        preco: "R$1.369,99",
        img: "../imagens/gtx1630.png"
    }
]




let idProdutosCarrinho = []

function loadProdutosDatabase() {
    const produtos = Array()
    
    const cont = localStorage.getItem('cont')
    let contabilizados = 0
    let i = 0
    while (cont != contabilizados){
        i++
        
            
        let produto = JSON.parse(localStorage.getItem(i))
        while (produto == undefined) {
            i++
            produto = JSON.parse(localStorage.getItem(i))
        }
        contabilizados++
        

        if(produto === null){
            continue
        }

        produto.id = i
        produtos.push(produto)
        
    }
    contabilizados = 0
    i = 0
    return produtos
}
function removeProdutoDatabase(id) {
    localStorage.removeItem(id)
}






function loadProdutos(produtos) {

    if(produtos === undefined){
        produtos = loadProdutosDatabase()
        for(id1 of produtos) {
            idProdutosCarrinho.push(id1)
        }
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    let sec = document.getElementById("produtos")
    if(true){
        loadProdutos()
        let precos = []
        for(id of idProdutosCarrinho) {
            let nome = ""
            let preco = ""
            let img = ""
            for (produto of todosProdutos) {
                if (produto.id == id) {
                    nome = produto.nome
                    preco = produto.preco
                    img = produto.img
                }
            }
            let divProdutoCarrinho = document.createElement("div")
            divProdutoCarrinho.className = "produto-carrinho"

            let imgProduto = document.createElement("img")
            imgProduto.className = "img-produto"
            imgProduto.src = img

            let divTextoProduto = document.createElement("div")
            divTextoProduto.className = "texto-produto"

            let nomeProduto = document.createElement("h3")
            nomeProduto.className = "titulo-produto"
            nomeProduto.innerHTML = nome

            let precoProduto = document.createElement("h4")
            precoProduto.className = "preco-produto"
            precoProduto.innerHTML = preco
            precos.push(preco)

            let botaoExcluir = document.createElement("button")
            botaoExcluir.innerHTML = "Excluir"
            botaoExcluir.className = "botao-excluir"
            botaoExcluir.id = id


            
            botaoExcluir.onclick = function () {
                removeProdutoDatabase(this.id)
                let contAtual = Number(JSON.parse(localStorage.getItem("cont")))
                contAtual--
                localStorage.setItem('cont', contAtual)
                window.open("index.html", self)
            }


            divTextoProduto.appendChild(nomeProduto)
            divTextoProduto.appendChild(precoProduto)

            divProdutoCarrinho.appendChild(imgProduto)
            divProdutoCarrinho.appendChild(divTextoProduto)
            divProdutoCarrinho.appendChild(botaoExcluir)
            
            sec.appendChild(divProdutoCarrinho)

        }

        let valorSubtotal = 0
        for(precoStr of precos) {
            
            let precoNum = Number(precoStr.replace(',','.').replace('R$','').replace('.',''))
            
            valorSubtotal += precoNum
        }
        let valorDesconto = 0
        let valorTotal = valorSubtotal - valorDesconto
        let total = document.getElementById("total")
        let subtotal = document.getElementById("subtotal")
        let desconto = document.getElementById("desconto")
        
        
        subtotal.innerHTML = "R$" + String(valorSubtotal).replace('.',',')
        desconto.innerHTML = "- R$" + String(valorDesconto).replace('.',',')
        total.innerHTML = "R$" + String(valorTotal).replace('.',',')

        
    }
})
