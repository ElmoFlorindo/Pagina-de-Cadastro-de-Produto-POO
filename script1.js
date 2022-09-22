class Produto {
    constructor(){
        this.id = 1;
        this.arrayProdutos = []
        this.editId = null

    }

    salvar() {
        let produto =  this.lerDados()

        if(this.validaCampos(produto) == true) {
            if(this.editId == null){
                this.adicionar(produto)
            } else{
                this.atualizar(this.editId , produto)
            }
            
        }

        this.listaTabela()

        this.cancelar()
       
    }

    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for(let i = 0 ; i < this.arrayProdutos.length ; i++){

            let tr = tbody.insertRow()
            
            let td_id = tr.insertCell()
            let td_produto = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_acao = tr.insertCell()


            td_id.innerText = this.arrayProdutos[i].id
            td_produto.innerText = this.arrayProdutos[i].nomeProduto
            td_valor.innerText = this.arrayProdutos[i].preco

            let imgEdit = document.createElement('img')
            imgEdit.src = 'img/botao-editar.png'
            imgEdit.setAttribute('onclick' , 'produto.preparaEdicao('+ JSON.stringify(this.arrayProdutos[i]) +')')
            
            let imgDelete = document.createElement('img')
            imgDelete.src = 'img/excluir.png'
            imgDelete.setAttribute('onclick' , 'produto.deletar('+this.arrayProdutos[i].id +')')

            td_acao.appendChild(imgEdit)        
            td_acao.appendChild(imgDelete)

        }
    }

    adicionar(produto){
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto)
        this.id++
    }

    lerDados() {
       let produto = {}

        produto.id = this.id
        produto.nomeProduto = document.getElementById('produto').value
        produto.preco = document.getElementById('preco').value

       return produto
       
       
    }

    validaCampos(produto) {
        let msg = ''
        
        if(produto.nomeProduto == ''){
            msg += '- Preencha o campro PRODUTO! \n'
        }

        if(produto.preco == '') {
            msg += '- Preencha o campo PREÇO! \n'
        }

        if(msg != ''){
            alert (msg)
            return false
        }
        
        return true

    }

    cancelar(){
        document.getElementById('produto').value = ''
        document.getElementById('preco').value = ''

        document.getElementById('bt1').innerText = 'salvar'
        this.editId = null

    }

    deletar(id){

        if(confirm('Deseja realmente deletar esse produto de ID-' + id)){
            let tbody = document.getElementById('tbody')

            for(let i = 0 ; i < this.arrayProdutos.length ; i++) {
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i , 1)
                    tbody.deleteRow(i)
                }
            } 
        }
               
    }

    preparaEdicao(dados) {

        this.editId = dados.id

        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('preco').value = dados.preco


        document.getElementById('bt1').innerText = 'Atualizar'

    }


    atualizar(id, produto) {
        for(let i = 0 ; i < this.arrayProdutos.length ; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
            }
        }

    }
}


var produto = new Produto();