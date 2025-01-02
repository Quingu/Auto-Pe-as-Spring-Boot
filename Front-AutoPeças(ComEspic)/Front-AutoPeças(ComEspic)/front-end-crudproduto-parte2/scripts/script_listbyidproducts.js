async function getProductById() {
    const productId = document.getElementById("productId").value; 
    const url = `http://localhost:8080/produto/list/${productId}`;
    
    const response = await fetch(url, { method: "GET" });
    if (response.status === 200) {
        const product = await response.json();
        //clearLoading();
        if (product) {
            showProductDetails(product); 
        }
    } else if (response.status === 404) {
        alert("Produto não encontrado");
    } else {
        alert("Erro ao buscar produto");
    }
}

function showProductDetails(product) {
    const tab = `
        <thead>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Fabricante</th>
            <th>Modelo</th>
            <th>Data Fabricacao</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Lote</th>
            <th>Editar</th>
            <th>Remover</th>
        </thead>
        <tr>
            <td>${product.id}</td>
            <td>${product.nome}</td>
            <td>${product.descricao}</td>
            <td>${product.categoria}</td>
            <td>${product.fabricante}</td>
            <td>${product.modelo}</td>
            <td>${product.data_fabricacao}</td>
            <td>${product.preco}</td>
            <td>${product.quantidade}</td>
            <td>${product.lote}</td>
            <td><a href="updateproducts.html?id=${product.id}" target="_blank"><img src="images/edit01.png" width="20" height="15"></a></td>
            <td><img src="images/trash01.png" width="20" height="15"onclick="deleteProduct(${product.id})"></td>
        </tr>
    `;
    document.getElementById("products").innerHTML = tab;
}
