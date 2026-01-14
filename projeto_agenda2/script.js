// ==================== CADASTRO ====================
const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();
        cadastrar();
    });
}

function cadastrar() {
    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmarSenha").value;

    // Validações
    if (!nome || !telefone || !senha || !confirmar) {
        alert("❌ Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    if (nome.length < 3) {
        alert("❌ O nome deve ter pelo menos 3 caracteres!");
        return;
    }

    if (telefone.length < 10) {
        alert("❌ Digite um telefone válido!");
        return;
    }

    if (senha.length < 6) {
        alert("❌ A senha deve ter no mínimo 6 caracteres!");
        return;
    }

    if (senha !== confirmar) {
        alert("❌ As senhas não conferem!");
        return;
    }

    // Verificar se já existe usuário
    const usuarioExistente = localStorage.getItem("telefone");
    if (usuarioExistente === telefone) {
        alert("❌ Já existe um usuário cadastrado com este telefone!");
        return;
    }

    // Salvar no LocalStorage
    localStorage.setItem("nome", nome);
    localStorage.setItem("telefone", telefone);
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

    alert("✅ Cadastro realizado com sucesso!\n\nVocê será redirecionado para fazer login.");
    
    // Redirecionar para login
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
}

// ==================== LOGIN ====================
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        login();
    });
}

function login() {
    const telefoneDigitado = document.getElementById("telefone").value.trim();
    const senhaDigitada = document.getElementById("senha").value;

    // Validações
    if (!telefoneDigitado || !senhaDigitada) {
        alert("❌ Por favor, preencha todos os campos!");
        return;
    }

    const telefoneSalvo = localStorage.getItem("telefone");
    const senhaSalva = localStorage.getItem("senha");

    if (!telefoneSalvo || !senhaSalva) {
        alert("❌ Nenhum usuário cadastrado!\n\nPor favor, cadastre-se primeiro.");
        return;
    }

    if (telefoneDigitado === telefoneSalvo && senhaDigitada === senhaSalva) {
        // Salvar estado de login
        localStorage.setItem('usuarioLogado', 'true');
        localStorage.setItem('nomeUsuario', localStorage.getItem('nome'));
        
        alert("✅ Login realizado com sucesso!\n\nBem-vinda ao sistema!");
        
        // Redirecionar para home
        setTimeout(() => {
            window.location.href = "home.html";
        }, 500);
    } else {
        alert("❌ Telefone ou senha incorretos!\n\nTente novamente.");
        
        // Limpar campo senha
        document.getElementById("senha").value = "";
        document.getElementById("senha").focus();
    }
}

// ==================== FORMATAÇÃO AUTOMÁTICA ====================
// Máscara de telefone
const inputTelefone = document.getElementById("telefone");

if (inputTelefone) {
    inputTelefone.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length <= 11) {
            if (valor.length <= 2) {
                valor = valor.replace(/^(\d{0,2})/, '($1');
            } else if (valor.length <= 6) {
                valor = valor.replace(/^(\d{2})(\d{0,4})/, '($1) $2');
            } else if (valor.length <= 10) {
                valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
            e.target.value = valor;
        }
    });
}

// ==================== VERIFICAÇÃO DE SESSÃO ====================
// Verificar se está na página de login ou cadastro e já está logado
window.addEventListener('DOMContentLoaded', function() {
    const paginaAtual = window.location.pathname;
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    // Se está logado e tenta acessar login/cadastro, redireciona para home
    if (usuarioLogado === 'true' && 
        (paginaAtual.includes('index.html') || paginaAtual.includes('cadastro.html'))) {
        window.location.href = 'home.html';
    }
});

// ==================== PREVENÇÃO DE REFRESH NA HOME ====================
// Salvar dados importantes antes de sair
window.addEventListener('beforeunload', function() {
    // Dados já são salvos em localStorage, não precisa fazer nada extra
});

// ==================== UTILITÁRIOS ====================
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, '');
    return numeros.length >= 10 && numeros.length <= 11;
}
