async function updateProduct() {
    const formE1 = document.querySelector("#formupdate");
    const formData = new FormData(formE1);
    const product = Object.fromEntries(formData);

    const urlParams = new URLSearchParams(window.location.search);


    const productId = urlParams.get('id');
   
    const url = `http://localhost:8080/produto/update/${productId}`;

    const dataFabricacao = document.getElementById("data_fabricacao").value;
    if (dataFabricacao) {
        const formattedDate = new Date(dataFabricacao).toISOString().split('T')[0];
        product.data_fabricacao = formattedDate;
    }

    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    };

    try {
        const result = await fetch(url, options);
        if (result.status === 200 || result.status === 204) {
            alert('Produto atualizado com sucesso');
        } else {
            alert('Erro ao atualizar produto');
        }
    } catch (error) {
        alert('Erro ao atualizar produto. Tente novamente.');
        console.error(error);
    }
}


async function setup() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');  
    
    const product = await getProductById(productId);
    if (product) {
        document.getElementById("id").value = product.id;
        document.getElementById("nome").value = product.nome;
        document.getElementById("descricao").value = product.descricao;
        document.getElementById("categoria").value = product.categoria;
        document.getElementById("fabricante").value = product.fabricante;
        document.getElementById("modelo").value = product.modelo;
        document.getElementById("data_fabricacao").value = product.data_fabricacao.split('T')[0];
        document.getElementById("preco").value = product.preco;
        document.getElementById("quantidade").value = product.quantidade;
        document.getElementById("lote").value = product.lote;
    }
}


async function getProductById(productId) {
    const url = `http://localhost:8080/produto/list/${productId}`;
    
    const response = await fetch(url, { method: "GET" });
    if (response.status === 200) {
        const product = await response.json();
        return product;
    } else if (response.status === 404) {
        alert("Produto não encontrado");
        return null;
    } else {
        alert("Erro ao buscar produto");
        return null;
    }
}

window.onload = setup;
