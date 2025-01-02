function clearLoading() {
    document.getElementById("loading").style.display = "none";
}

function showProducts(products) {

    const tbody = document.getElementById("products");
    tbody.innerHTML = "";


    for (let product of products) {
        let formattedDate = "";
        if (product.data_fabricacao) {
            formattedDate = product.data_fabricacao.split("T")[0];
        }

        const row = `
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
                <td><a href="updateproducts.html?id=${product.id}" target="_blank"><img src="images/edit01.png" width="20" height="15"></a></td>
                <td><img src="images/trash01.png" width="20" height="15" class="delete-icon" data-id="${product.id}"></td>
            </tr>
        `;
        tbody.innerHTML += row;
    }


    const deleteIcons = document.querySelectorAll(".delete-icon");
    deleteIcons.forEach((icon) => {
        icon.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            deleteProduct(productId);
        });
    });
}


async function deleteProduct(productId) {
    if (confirm("Você tem certeza que deseja excluir este produto?")) {
        const url = `http://localhost:8080/produto/${productId}`;

        try {
            const response = await fetch(url, { method: "DELETE" });
            if (response.status === 200) {
                alert("Produto excluído com sucesso!");
                listAllProducts(); // Atualiza a lista de produtos após a exclusão
            } else {
                alert("Erro ao excluir o produto.");
            }
        } catch (error) {
            console.error("Erro ao excluir o produto:", error);
        }
    }
}


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