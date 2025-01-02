function clearLoading() {
    document.getElementById("loading").style.display = "none";
}


function showProducts(products) {
    let tab = `<thead>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Fabricante</th>
            <th>Modelo</th>
            <th>Data Fabricação</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Lote</th>
            <th>Editar</th>
            <th>Remover</th>
        </tr>
    </thead>`;

    for (let product of products) {
        let formattedDate = '';
        if (product.data_fabricacao) {
            formattedDate = product.data_fabricacao.split('T')[0];
        }

        tab += `
            <tr>
                <td>${product.id}</td>
                <td>${product.nome}</td>
                <td>${product.descricao}</td>
                <td>${product.categoria}</td>
                <td>${product.fabricante}</td>
                <td>${product.modelo}</td>
                <td>${formattedDate}</td>
                <td>${product.preco}</td>
                <td>${product.quantidade}</td>
                <td>${product.lote}</td>
                <td><a href="updateproducts.html?id=${product.id}"target="_blank"><img src="images/edit01.png" width="20" height="15"></a></td>
                <td><img src="images/trash01.png" width="20" height="15" onclick="deleteProduct(${product.id})"></td>
            </tr>
        `;
    }
    document.getElementById("products").innerHTML = tab;
}

// Função para listar todos os produtos
async function listAllProducts() {
    const url = "http://localhost:8080/produto/listall";
    try {
        const response = await fetch(url, { method: "GET" });
        if (response.status === 200) {
            const products = await response.json();
            clearLoading();
            if (products.length === 0) {
                document.getElementById("products").innerHTML = "<tr><td colspan='12'>Nenhum produto encontrado.</td></tr>";
            } else {
                showProducts(products);
            }
        } else {
            console.error("Erro ao buscar produtos:", response.status);
        }
    } catch (error) {
        console.error("Erro ao se conectar ao servidor:", error);
    }
}

listAllProducts();
