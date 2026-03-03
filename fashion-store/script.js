const params = new URLSearchParams(window.location.search);
const produto_id = params.get("id")

if(produto_id){
    mostrarUnicoProduto(produto_id)
}

const lista3Recentes = document.getElementById("featured-list")
const todos = document.getElementById("products-list")
const selecaoCategorias = document.getElementById("category-filter") 
const paginaDetalhes = document.getElementById("product-detail") 

function returnURL(endpoint){
    return `https://api.escuelajs.co/api/v1/${endpoint}`
}

mostrar3Recentes()
mostrarTodos()
buscarCategorias()
mostrarPorCategoria(selecaoCategorias.value)

function mostrar3Recentes(){
    fetch(returnURL('products'))
    .then(response => response.json())
    .then(dados => {

        let top3produtos = dados.slice(0,3)
        let cards = ""

        top3produtos.forEach(produto => {
            cards += `
                <article class="card placeholder-card">
                    <div class="card-img-wrapper">
                        <img src="https://placehold.co/600x400/1e293b/6366f1?text=Carregando" alt="Loading" class="card-img">
                    </div>
                    <div class="card-content">
                        <span class="card-category">${produto.category.name}</span>
                        <h3 class="card-title">${produto.title}</h3>
                        <div class="card-footer">
                        <span class="card-price">R$ ${produto.price}</span>
                        <a href="./detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
                        </div>
                    </div>
                </article>
            `
        });

        lista3Recentes.innerHTML = cards

    })
}

function mostrarTodos(){
    fetch(returnURL('products'))
    .then(response => response.json())
    .then(dados => {

        let cards = ""

        dados.forEach(produto => {
            cards += `
                <article class="card placeholder-card">
                    <div class="card-img-wrapper">
                        <img src="https://placehold.co/600x400/1e293b/6366f1?text=Carregando" alt="Loading" class="card-img">
                    </div>
                    <div class="card-content">
                        <span class="card-category">${produto.category.name}</span>
                        <h3 class="card-title">${produto.title}</h3>
                        <div class="card-footer">
                        <span class="card-price">R$ ${produto.price}</span>
                        <a href="./detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
                        </div>
                    </div>
                </article>
            `
        });

        todos.innerHTML = cards

    })
}

function buscarCategorias(){
    fetch(returnURL('categories'))
    .then(response => response.json())
    .then(dados => {

        let options = ""

        dados.forEach(cu => {
            options += `
                <option value="${cu.id}">${cu.name}</option>
            `
        });

        selecaoCategorias.innerHTML = options

    })
}

function mostrarPorCategoria(id){
    fetch(returnURL(`products/?categoryId=${id}`))
    .then(response => response.json())
    .then(dados => {

        let cards = ""

        dados.forEach(produto => {
            cards += `
                <article class="card placeholder-card">
                    <div class="card-img-wrapper">
                        <img src="https://placehold.co/600x400/1e293b/6366f1?text=Carregando" alt="Loading" class="card-img">
                    </div>
                    <div class="card-content">
                        <span class="card-category">${produto.category.name}</span>
                        <h3 class="card-title">${produto.title}</h3>
                        <div class="card-footer">
                        <span class="card-price">R$ ${produto.price}</span>
                        <a href="./detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
                        </div>
                    </div>
                </article>
            `
        });

        todos.innerHTML = cards

    })
}

function mostrarUnicoProduto(id){
    fetch(returnURL(`products/${id}`))
    .then(response => response.json())
    .then(dados => {

        let detalhes = `
                <img src="https://placehold.co/600x400/1e293b/6366f1?text=Carregando" alt="Loading" class="detail-img">
                    <div class="detail-info">
                        <span class="card-category" style="font-size:1rem; margin-bottom:1rem; display:block;">Categoria: ${dados.category.name}</span>
                        <h1>${dados.title}</h1>
                        <div class="detail-price">R$ ${dados.price}</div>
                        <p class="detail-description">${dados.description}</p>
                        <button class="btn-primary" disabled>Adicionar ao Carrinho</button>
                    </div>
            `

        paginaDetalhes.innerHTML = detalhes

    })
}

function toggleTheme(){
    const temaAtual = document.documentElement.getAttribute("data-theme")
    
    if(temaAtual == 'dark'){
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }else{
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    }
}