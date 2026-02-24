async function buscarProdutos(){
    try{
        const resposta = await fetch ('https://api.escuelajs.co/api/v1/products');
        const produtos = await resposta.json();
        return produtos;        
    }catch (error){
        throw new Error('Erro ao buscar produtos');
    }
}

function alterarTema(){
    const html = document.documentElement;
    const temaAtual = html.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark'? 'light' : 'dark';

    html.setAttribute('data-theme', novoTema);

    localStorage.setItem('theme', novoTema);
}

document.addEventListener('DOMContentLoaded',()=>{
    const listaDestaques = document.getElementById('featured-list');

    if(listaDestaques){
        console.log('Iniciando carregamento da Home...')
        executarPaginaInicial();
    }
});

async function executarPaginaInicial() {
    
    const container = document.getElementById('featured-list');

    container.innerHTML = '';

    const todosProdutos = await buscarProdutos();

    const destaques  = todosProdutos.slice (0, 3);

    destaques.forEach((produto) => {
        container.innerHTML += `
            <article class="card">
                <div class="card-img-wrapper">
                    <img src="${produto.images[0]}" alt="${produto.title}" class="card-img">
                </div>
                <div class="card-content">
                    <span class="card-category">${produto.category.name}</span>
                    <h3 class="card-title">${produto.title}</h3>
                    <div class="card-footer">
                        <span class="card-price">R$ ${produto.price}</span>
                        <a href="detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>
        `;
    });

}


const filtroCategoria = document.getElementById('category-filter');
const listaProdutos = document.getElementById('products-list');

if (listaProdutos && filtroCategoria) {
    console.log('Iniciando carregamento do Catálogo... 🛒');
    carregarCategorias(filtroCategoria);

    filtroCategoria.addEventListener('change', () => {
    const idSelecionado = filtroCategoria.value;
    console.log('Filtro alterado para o ID:', idSelecionado);
    
    aplicarFiltro(idSelecionado);
});
}


async function carregarCategorias(selectElement) {
    
    const resposta = await fetch ('https://api.escuelajs.co/api/v1/categories');
    const categorias = await resposta.json();

    selectElement.innerHTML = '<option value="all">Todas as categorias</option>'

    categorias.forEach (categoria => {
        selectElement.innerHTML += `   
        <option value="${categoria.id}">${categoria.name}</option> `
    });
}

async function executarPaginaCatalogo() {
    const container = document.getElementById(products-list);
    container.innerHTML = '';

    const todosProdutos = await buscarProdutos();

    renderizarProdutos(todosProdutos, container);

    todosProdutos.forEach(produto => {
        let imagemLimpa = produto.images[0].replace(/[\[\]"]/g,"");
        
        container.innerHTML += `
        <article class="card">
                <div class="card-img-wrapper">
                    <img src="${imagemLimpa}" alt="${produto.title}" class="card-img" onerror="this.src='https://placehold.co/600x400?text=Imagem+Indisponível'">
                </div>
                <div class="card-content">
                    <span class="card-category">${produto.category.name}</span>
                    <h3 class="card-title">${produto.title}</h3>
                    <div class="card-footer">
                        <span class="card-price">R$ ${produto.price}</span>
                        <a href="detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>
        `;
    });
}

async function aplicarFiltro(idSelecionado) {
    const container = document.getElementById('products-list');
    const todosProdutos = await buscarProdutos(); 

    let produtosExibidos;

    if (idSelecionado === 'all') {
        produtosExibidos = todosProdutos;
    } else {
        produtosExibidos = todosProdutos.filter(produto => {
            return produto.category.id == idSelecionado;
        });
    }

    renderizarProdutos(produtosExibidos, container);
}


function renderizarProdutos(lista, elemento) {
    elemento.innerHTML = '';

    lista.forEach(produto => {
        let imagemLimpa = produto.images[0].replace(/[\[\]"]/g, "");

        elemento.innerHTML += `
            <article class="card">
                <div class="card-img-wrapper">
                    <img src="${imagemLimpa}" alt="${produto.title}" class="card-img" onerror="this.src='https://placehold.co/600x400?text=Imagem+Indisponível'">
                </div>
                <div class="card-content">
                    <span class="card-category">${produto.category.name}</span>
                    <h3 class="card-title">${produto.title}</h3>
                    <div class="card-footer">
                        <span class="card-price">R$ ${produto.price}</span>
                        <a href="detail.html?id=${produto.id}" class="btn-primary btn-small">Ver Detalhes</a>
                    </div>
                </div>
            </article>
        `;
    });
}

