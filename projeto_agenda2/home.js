// Verificar se usuário está logado
window.addEventListener('DOMContentLoaded', function() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        window.location.href = 'index.html';
        return;
    }

    // Exibir nome do usuário
    const nome = localStorage.getItem('nomeUsuario');
    if (nome) {
        document.getElementById('userName').textContent = nome.split(' ')[0];
    }

    // Carregar dados do sistema
    carregarClientes();
    atualizarCalendario();
    carregarAgendamentos();
    atualizarResumoFinanceiro();
});

// Função de Logout
function logout() {
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    }
}

// ==================== GERENCIAMENTO DE MODAIS ====================
function abrirModal(tipo) {
    const modal = document.getElementById('modal' + capitalizar(tipo));
    if (modal) {
        modal.style.display = 'block';
    }
}

function fecharModal(tipo) {
    const modal = document.getElementById('modal' + capitalizar(tipo));
    if (modal) {
        modal.style.display = 'none';
    }
}

function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// ==================== CALENDÁRIO ====================
let mesAtual = new Date().getMonth();
let anoAtual = new Date().getFullYear();
let diaSelecionado = new Date().getDate();

function atualizarCalendario() {
    const mesSelect = document.getElementById('mesSelect');
    const anoSelect = document.getElementById('anoSelect');
    
    if (mesSelect) mesAtual = parseInt(mesSelect.value);
    if (anoSelect) anoAtual = parseInt(anoSelect.value);

    const grid = document.getElementById('calendarioGrid');
    if (!grid) return;
    
    grid.innerHTML = '';

    // Dias da semana
    const diasSemana = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    diasSemana.forEach(dia => {
        const div = document.createElement('div');
        div.className = 'dia-semana';
        div.textContent = dia;
        grid.appendChild(div);
    });

    // Primeiro dia do mês
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    // Dias do mês anterior
    const diasMesAnterior = new Date(anoAtual, mesAtual, 0).getDate();
    for (let i = primeiroDia - 1; i >= 0; i--) {
        const div = document.createElement('div');
        div.className = 'dia outro-mes';
        div.textContent = diasMesAnterior - i;
        grid.appendChild(div);
    }

    // Dias do mês atual
    const hoje = new Date();
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const div = document.createElement('div');
        div.className = 'dia';
        div.textContent = dia;

        // Marcar dia de hoje
        if (dia === hoje.getDate() && 
            mesAtual === hoje.getMonth() && 
            anoAtual === hoje.getFullYear()) {
            div.classList.add('hoje');
        }

        // Marcar dia selecionado
        if (dia === diaSelecionado && 
            mesAtual === hoje.getMonth() && 
            anoAtual === hoje.getFullYear()) {
            div.classList.add('selecionado');
        }

        div.onclick = function() {
            document.querySelectorAll('.dia.selecionado').forEach(d => {
                d.classList.remove('selecionado');
            });
            this.classList.add('selecionado');
            diaSelecionado = dia;
            filtrarAgendamentosPorDia(dia, mesAtual, anoAtual);
        };

        grid.appendChild(div);
    }

    // Dias do próximo mês
    const diasRestantes = 42 - (primeiroDia + diasNoMes);
    for (let dia = 1; dia <= diasRestantes; dia++) {
        const div = document.createElement('div');
        div.className = 'dia outro-mes';
        div.textContent = dia;
        grid.appendChild(div);
    }
}

function mudarMes(direcao) {
    mesAtual += direcao;
    
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    } else if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }

    document.getElementById('mesSelect').value = mesAtual;
    document.getElementById('anoSelect').value = anoAtual;
    atualizarCalendario();
}

// ==================== CLIENTES ====================
function carregarClientes() {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const select = document.getElementById('agendamentoCliente');
    
    if (select) {
        select.innerHTML = '<option value="">Selecione um cliente</option>';
        clientes.forEach((cliente, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = cliente.nome;
            select.appendChild(option);
        });
    }
}

// Form Cadastrar Cliente
const formCliente = document.getElementById('formNovoCliente');
if (formCliente) {
    formCliente.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cliente = {
            nome: document.getElementById('clienteNome').value,
            telefone: document.getElementById('clienteTelefone').value,
            email: document.getElementById('clienteEmail').value
        };

        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));

        alert('Cliente cadastrado com sucesso!');
        formCliente.reset();
        fecharModal('cadastrarCliente');
        carregarClientes();
    });
}

// ==================== AGENDAMENTOS ====================
function carregarAgendamentos() {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const lista = document.getElementById('listaAgendamentos');
    
    if (!lista) return;
    
    lista.innerHTML = '';

    if (agendamentos.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhum agendamento encontrado</p>';
        return;
    }

    agendamentos.forEach((agendamento, index) => {
        const div = document.createElement('div');
        div.className = 'agendamento-item';
        div.innerHTML = `
            <div class="agendamento-info">
                <span class="agendamento-icon">👤</span>
                <div>
                    <strong>${agendamento.cliente}</strong>
                    <p>${agendamento.servico}</p>
                </div>
            </div>
            <div class="agendamento-data">
                <span>${formatarData(agendamento.data)}</span>
                <span class="data-icon">📅</span>
            </div>
        `;
        lista.appendChild(div);
    });
}

function filtrarAgendamentosPorDia(dia, mes, ano) {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const lista = document.getElementById('listaAgendamentos');
    
    if (!lista) return;
    
    const dataFiltro = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const agendamentosFiltrados = agendamentos.filter(a => a.data === dataFiltro);

    lista.innerHTML = '';

    if (agendamentosFiltrados.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhum agendamento neste dia</p>';
        return;
    }

    agendamentosFiltrados.forEach(agendamento => {
        const div = document.createElement('div');
        div.className = 'agendamento-item';
        div.innerHTML = `
            <div class="agendamento-info">
                <span class="agendamento-icon">👤</span>
                <div>
                    <strong>${agendamento.cliente}</strong>
                    <p>${agendamento.servico}</p>
                </div>
            </div>
            <div class="agendamento-data">
                <span>${agendamento.hora}</span>
                <span class="data-icon">⏰</span>
            </div>
        `;
        lista.appendChild(div);
    });
}

// Form Novo Agendamento
const formAgendamento = document.getElementById('formNovoAgendamento');
if (formAgendamento) {
    formAgendamento.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const clienteIndex = document.getElementById('agendamentoCliente').value;
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const cliente = clientes[clienteIndex];

        const agendamento = {
            cliente: cliente.nome,
            clienteTelefone: cliente.telefone,
            servico: document.getElementById('agendamentoServico').options[
                document.getElementById('agendamentoServico').selectedIndex
            ].text,
            data: document.getElementById('agendamentoData').value,
            hora: document.getElementById('agendamentoHora').value,
            valor: parseFloat(document.getElementById('agendamentoValor').value)
        };

        let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.push(agendamento);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        // Atualizar financeiro
        atualizarFinanceiro(agendamento.valor, 'receita');

        alert('Agendamento realizado com sucesso!');
        formAgendamento.reset();
        fecharModal('novoAgendamento');
        carregarAgendamentos();
        atualizarResumoFinanceiro();
    });
}

// ==================== FINANCEIRO ====================
function atualizarFinanceiro(valor, tipo) {
    let financeiro = JSON.parse(localStorage.getItem('financeiro')) || {
        receitaHoje: 0,
        receitaMensal: 0,
        receitaAnual: 0,
        despesas: 0
    };

    if (tipo === 'receita') {
        financeiro.receitaHoje += valor;
        financeiro.receitaMensal += valor;
        financeiro.receitaAnual += valor;
    } else if (tipo === 'despesa') {
        financeiro.despesas += valor;
    }

    localStorage.setItem('financeiro', JSON.stringify(financeiro));
}

function atualizarResumoFinanceiro() {
    let financeiro = JSON.parse(localStorage.getItem('financeiro')) || {
        receitaHoje: 0,
        receitaMensal: 0,
        receitaAnual: 0,
        despesas: 0
    };

    const content = document.getElementById('financeiroContent');
    if (!content) return;

    content.innerHTML = `
        <div class="financeiro-item receita">
            <span>Receita Hoje</span>
            <h3>R$ ${financeiro.receitaHoje.toFixed(2)}</h3>
        </div>
        <div class="financeiro-valor-grande">
            <span class="valor-positivo">+R$${financeiro.receitaHoje.toFixed(2)}</span>
        </div>
        
        <div class="financeiro-item despesa">
            <span>Despesas</span>
            <h3 class="texto-vermelho">-R$${financeiro.despesas.toFixed(2)}</h3>
        </div>
        <div class="financeiro-valor-grande">
            <span class="valor-negativo">-R$${financeiro.despesas.toFixed(2)}</span>
        </div>

        <div class="financeiro-item">
            <span>Saldo do Dia</span>
            <h3 style="color: ${(financeiro.receitaHoje - financeiro.despesas) >= 0 ? '#27ae60' : '#e74c3c'}">
                R$ ${(financeiro.receitaHoje - financeiro.despesas).toFixed(2)}
            </h3>
        </div>
    `;
}

function mudarTab(periodo) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    let financeiro = JSON.parse(localStorage.getItem('financeiro')) || {
        receitaHoje: 0,
        receitaMensal: 0,
        receitaAnual: 0,
        despesas: 0
    };

    const content = document.getElementById('financeiroContent');
    if (!content) return;

    let receita = 0;
    let label = '';

    switch(periodo) {
        case 'hoje':
            receita = financeiro.receitaHoje;
            label = 'Receita Hoje';
            break;
        case 'mensal':
            receita = financeiro.receitaMensal;
            label = 'Receita Mensal';
            break;
        case 'anual':
            receita = financeiro.receitaAnual;
            label = 'Receita Anual';
            break;
    }

    content.innerHTML = `
        <div class="financeiro-item receita">
            <span>${label}</span>
            <h3>R$ ${receita.toFixed(2)}</h3>
        </div>
        <div class="financeiro-valor-grande">
            <span class="valor-positivo">+R$${receita.toFixed(2)}</span>
        </div>
        
        <div class="financeiro-item despesa">
            <span>Despesas</span>
            <h3 class="texto-vermelho">-R$${financeiro.despesas.toFixed(2)}</h3>
        </div>
        <div class="financeiro-valor-grande">
            <span class="valor-negativo">-R$${financeiro.despesas.toFixed(2)}</span>
        </div>

        <div class="financeiro-item">
            <span>Saldo Total</span>
            <h3 style="color: ${(receita - financeiro.despesas) >= 0 ? '#27ae60' : '#e74c3c'}">
                R$ ${(receita - financeiro.despesas).toFixed(2)}
            </h3>
        </div>
    `;
}

// ==================== RELATÓRIOS ====================
function carregarRelatorio(periodo) {
    document.querySelectorAll('.periodo-selector button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const financeiro = JSON.parse(localStorage.getItem('financeiro')) || {
        receitaHoje: 0,
        receitaMensal: 0,
        receitaAnual: 0,
        despesas: 0
    };

    const resultado = document.getElementById('relatorioResultado');
    
    let receita = 0;
    let titulo = '';

    switch(periodo) {
        case 'dia':
            receita = financeiro.receitaHoje;
            titulo = 'Relatório do Dia';
            break;
        case 'semana':
            receita = financeiro.receitaHoje * 7;
            titulo = 'Relatório da Semana';
            break;
        case 'mes':
            receita = financeiro.receitaMensal;
            titulo = 'Relatório do Mês';
            break;
        case 'ano':
            receita = financeiro.receitaAnual;
            titulo = 'Relatório do Ano';
            break;
    }

    resultado.innerHTML = `
        <h3 style="color: #7d4a9a; margin-bottom: 20px;">${titulo}</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div style="background: white; padding: 20px; border-radius: 10px;">
                <p style="color: #666; margin-bottom: 10px;">Receitas</p>
                <h2 style="color: #27ae60;">R$ ${receita.toFixed(2)}</h2>
            </div>
            <div style="background: white; padding: 20px; border-radius: 10px;">
                <p style="color: #666; margin-bottom: 10px;">Despesas</p>
                <h2 style="color: #e74c3c;">R$ ${financeiro.despesas.toFixed(2)}</h2>
            </div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 15px;">
            <p style="color: #666; margin-bottom: 10px;">Saldo</p>
            <h2 style="color: ${(receita - financeiro.despesas) >= 0 ? '#27ae60' : '#e74c3c'}">
                R$ ${(receita - financeiro.despesas).toFixed(2)}
            </h2>
        </div>
        <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 15px;">
            <p style="color: #666; margin-bottom: 10px;">Total de Agendamentos</p>
            <h2 style="color: #7d4a9a;">${agendamentos.length}</h2>
        </div>
    `;
}

// ==================== FORMAS DE PAGAMENTO ====================
function salvarFormasPagamento() {
    const formas = document.querySelectorAll('.forma-item input[type="checkbox"]');
    const formasSelecionadas = [];

    formas.forEach(forma => {
        if (forma.checked) {
            const texto = forma.parentElement.querySelector('span').textContent;
            formasSelecionadas.push(texto);
        }
    });

    localStorage.setItem('formasPagamento', JSON.stringify(formasSelecionadas));
    alert('Formas de pagamento salvas com sucesso!');
    fecharModal('formasPagamento');
}

// ==================== UTILITÁRIOS ====================
function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}
