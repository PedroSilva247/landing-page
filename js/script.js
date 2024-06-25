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


let secProdutos = document.getElementById("sec-produtos")


let idsCarrinho = []

function imprimir(produtos) {
    secProdutos.innerHTML = ''
    for (produto of produtos) {
        let divProduto = document.createElement('div')
        let imgProduto = document.createElement('img')
        let h3Produto = document.createElement('h3')
        let h4Produto = document.createElement('h4')
        let botaoProduto = document.createElement('button')
        
    
    
        divProduto.className = "produto"
    
        imgProduto.className = "img-produto"
        imgProduto.src = produto.img
    
        h3Produto.className = "nome-produto"
        h3Produto.innerHTML = produto.nome
    
        h4Produto.className = "preco-produto"
        h4Produto.innerHTML = produto.preco
    
        botaoProduto.className = "preco-produto"
        botaoProduto.innerHTML = "Adicionar ao carrinho"
        botaoProduto.id = produto.id
        

        
        botaoProduto.onclick = function () {
            if (idsCarrinho.indexOf(botaoProduto.id) == -1) {
                idsCarrinho.push(botaoProduto.id)
                
                alert("Item adicionado ao carrinho!")
                registerProdutoId(botaoProduto.id)
            } else {
                alert("Item já foi adicionado ao carrinho!")
            }
        }
        

        
    
    
    
        divProduto.appendChild(imgProduto)
        divProduto.appendChild(h3Produto)
        divProduto.appendChild(h4Produto)
        divProduto.appendChild(botaoProduto)
    
    
        secProdutos.appendChild(divProduto)
    }
}




function buscar() {
    let barraDePesquisa = document.getElementById("input-search")
    let filtrado = []
    for (produto of todosProdutos) {
        if (produto.nome.toLowerCase().indexOf(barraDePesquisa.value.toLowerCase()) != -1) {
            filtrado.push(produto)
        }
    }
    imprimir(filtrado)
    barraDePesquisa.value = ''
}


imprimir(todosProdutos)
























class Produto {
    constructor(id){
        this.id = id
    }

    validateData(){
        for (let i in this){
            if(this[i] === undefined || this[i] === ""){
                return false
            }
        }
        return true
    }
}

let cont = Number(JSON.parse(localStorage.getItem('cont')))
class Database {

    constructor(){
        let cont = localStorage.getItem('cont')

        if(cont === null){
            localStorage.setItem('cont', 0)
        }
    }

    
    createProduto(idProduto) {
        cont++
        const id = idProduto
        localStorage.setItem(id, JSON.stringify(idProduto))
        localStorage.setItem('cont', cont)
    }

    removeProduto(id) {
        localStorage.removeItem(id)
    }
}


const database = new Database()

function getNextId() {
    const nextId = localStorage.getItem('id')
    
    return parseInt(nextId) + 1;
}

function registerProdutoId(idProduto) {
    const id = idProduto
    

    const produto = new Produto(id)

    if(produto.validateData()){
        database.createProduto(produto.id)
    }
}

