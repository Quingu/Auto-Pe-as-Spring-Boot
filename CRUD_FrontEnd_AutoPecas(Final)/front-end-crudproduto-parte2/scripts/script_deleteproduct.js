async function deleteProduct(id) {
    const url = `http://localhost:8080/produto/delete/${id}`;
    const confirmation = confirm("Tem certeza de que deseja remover este produto?");

    if (confirmation) { //
        try {
            const response = await fetch(url, { method: "DELETE" });
            if (response.status === 204) {  //
                alert("Produto removido com sucesso!");
                listAllProducts(); //
            } else {
                alert("Erro ao remover o produto.");
            }
        } catch (error) {
            console.error("Erro ao tentar remover o produto:", error);
        }
    } else {
        alert("A exclusão foi cancelada.");
    }
}
