function cadastrar() {
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmarSenha").value;

    if (!telefone || !senha || !confirmar) {
        alert("Preencha todos os dados")
        return;
    }

    if (senha !== confirmar) {
        alert("As senhas não conferem!")
        return;
    }

    // salvando no LocalStorage
    localStorage.setItem("telefone", telefone);
    localStorage.setItem("senha", senha);

    alert("cadastro realizado com sucesso!")
    return;
}

// função de login

function login() {
    const telefoneDigitado = document.getElementById("telefone").value;
    const senhaDigitada = document.getElementById("senha").value;

    const telefoneSalvo = localStorage.getItem("telefone");
    const senhaSalva = localStorage.getItem("senha");

    if (!telefoneSalvo || !senhaSalva) {
        alert("Nenhum usuario cadastrado!");
        return;
    }

    if (telefoneDigitado === telefoneSalvo && senhaDigitada === senhaSalva) {
        alert("Login realizado com sucesso!");
        window.location.href = "home.html";
    } else {
        alert("Telefone ou senha incorettos!")
    }
}