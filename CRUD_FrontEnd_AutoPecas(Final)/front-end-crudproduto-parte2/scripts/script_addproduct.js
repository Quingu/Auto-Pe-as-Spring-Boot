function clearTextFields() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("fabricante").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("data_fabricacao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("lote").value = "";
}

async function addProduct() {
    const formE1 = document.querySelector("#formadd");
    const formData = new FormData(formE1);
    const product = Object.fromEntries(formData);
    const url = "http://localhost:8080/produto/add";
    const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    try {
        const result = await fetch(url, option);

        if (result.status === 201) {
            clearTextFields();
            showMessage("Cadastro realizado com sucesso!", "success");
        } else {
            showMessage("Erro ao cadastrar. Verifique os dados e tente novamente.", "error");
        }
    } catch (error) {
        showMessage("Erro de conexão com o servidor. Tente novamente mais tarde.", "error");
    }
}

function showMessage(message, type) {
    let messageDiv = document.getElementById("message");


    if (!messageDiv) {
        messageDiv = document.createElement("div");
        messageDiv.id = "message";
        document.body.appendChild(messageDiv);
    }


    messageDiv.style.color = type === "success" ? "green" : "red";
    messageDiv.style.fontWeight = "bold";
    messageDiv.style.marginTop = "10px";
    messageDiv.textContent = message;


    setTimeout(() => {
        messageDiv.textContent = "";
    }, 3000);
}