# Sistema de Agendamento - Simone Rocha Nail Designer

## 📋 Descrição
Sistema completo de agendamento para salão de beleza com gerenciamento de clientes, agendamentos e controle financeiro.

## 🚀 Funcionalidades

### Autenticação
- ✅ Login seguro com telefone e senha
- ✅ Cadastro de novos usuários
- ✅ Validação de dados
- ✅ Proteção de rotas (requer login)
- ✅ Função de logout

### Gerenciamento de Clientes
- ✅ Cadastro de clientes com nome, telefone e e-mail
- ✅ Lista de clientes disponível para agendamentos
- ✅ Armazenamento local dos dados

### Sistema de Agendamentos
- ✅ Calendário interativo
- ✅ Visualização mensal
- ✅ Seleção de datas
- ✅ Cadastro de novos agendamentos com:
  - Cliente
  - Tipo de serviço (Manicure, Pedicure, Decoração, etc.)
  - Data e horário
  - Valor do serviço
- ✅ Lista de agendamentos do dia/mês
- ✅ Filtro por data

### Controle Financeiro
- ✅ Resumo financeiro com:
  - Receitas (Hoje/Mensal/Anual)
  - Despesas
  - Saldo
- ✅ Relatórios detalhados por período
- ✅ Visualização por dia/semana/mês/ano
- ✅ Gráficos de receitas e despesas

### Formas de Pagamento
- ✅ Configuração de métodos aceitos:
  - Dinheiro
  - Cartão de Crédito
  - Cartão de Débito
  - PIX

## 📁 Arquivos do Projeto

### Páginas HTML
- `index.html` - Página de login
- `cadastro.html` - Página de cadastro de usuário
- `home.html` - Dashboard principal do sistema

### Folhas de Estilo
- `style.css` - Estilos da página de login
- `cadastro.css` - Estilos da página de cadastro
- `home.css` - Estilos do dashboard

### Scripts JavaScript
- `script.js` - Lógica de login e cadastro
- `home.js` - Lógica do sistema de agendamentos

### Recursos
- `logo.jpeg` - Logo da empresa

## 🎨 Design
- Gradiente suave em tons de rosa e roxo
- Interface moderna e responsiva
- Cards interativos
- Calendário visual
- Modais para ações específicas

## 💾 Armazenamento
Todos os dados são armazenados localmente no navegador usando **localStorage**:
- Dados de usuário (login)
- Lista de clientes
- Agendamentos
- Informações financeiras
- Configurações de pagamento

## 🔒 Segurança
- Validação de campos obrigatórios
- Verificação de senha (mínimo 6 caracteres)
- Confirmação de senha no cadastro
- Proteção de rotas (redirecionamento automático)
- Logout seguro

## 📱 Responsividade
O sistema é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Tablets
- 📱 Smartphones

## 🎯 Como Usar

### 1. Primeiro Acesso
1. Abra `index.html` no navegador
2. Clique em "Cadastre-se aqui!"
3. Preencha seus dados:
   - Nome completo
   - Telefone (será seu login)
   - E-mail
   - Senha (mínimo 6 caracteres)
4. Clique em "Cadastrar"

### 2. Login
1. Digite seu telefone
2. Digite sua senha
3. Clique em "Entrar"

### 3. Dashboard Principal
Após o login, você terá acesso a:

#### Cadastrar Cliente
1. Clique no card "Cadastrar Cliente"
2. Preencha nome, telefone e e-mail
3. Clique em "Cadastrar Cliente"

#### Novo Agendamento
1. Clique no card "Novo Agendamento"
2. Selecione o cliente
3. Escolha o serviço
4. Defina data e horário
5. Informe o valor
6. Clique em "Agendar"

#### Visualizar Agendamentos
- Use o calendário para navegar entre os meses
- Clique em um dia para ver os agendamentos
- Agendamentos aparecem listados com cliente, serviço e horário

#### Controle Financeiro
- Visualize receitas e despesas
- Alterne entre "Hoje", "Mensal" e "Anual"
- Clique em "Ver Relatórios" para detalhes

#### Relatórios Financeiros
- Escolha o período (Dia/Semana/Mês/Ano)
- Veja receitas, despesas e saldo
- Acompanhe total de agendamentos

#### Formas de Pagamento
- Configure os métodos aceitos
- Marque/desmarque as opções
- Salve as configurações

### 4. Logout
- Clique no botão "Logout" no canto superior direito
- Confirme a ação

## 🛠️ Melhorias Implementadas

### Em relação ao código original:
1. ✅ Estrutura HTML5 semântica
2. ✅ CSS moderno com gradientes e animações
3. ✅ JavaScript organizado em módulos
4. ✅ Validações completas de formulários
5. ✅ Máscaras de entrada (telefone)
6. ✅ Sistema de proteção de rotas
7. ✅ Interface responsiva
8. ✅ Modais para ações específicas
9. ✅ Calendário funcional
10. ✅ Gestão financeira completa
11. ✅ Sistema de relatórios
12. ✅ Feedback visual (alertas, animações)
13. ✅ Código comentado e documentado

## 🐛 Correções de Bugs
- ✅ Validação adequada de campos
- ✅ Tratamento de erros
- ✅ Prevenção de cadastros duplicados
- ✅ Sincronização entre páginas
- ✅ Persistência de dados
- ✅ Formatação de valores monetários
- ✅ Formatação de datas

## 📊 Dados de Exemplo
O sistema vem com alguns agendamentos de exemplo para demonstração. Você pode:
- Adicionar novos agendamentos
- Visualizar no calendário
- Gerar relatórios
- Gerenciar tudo através da interface

## 🎓 Tecnologias Utilizadas
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript ES6+ (Vanilla)
- LocalStorage API

## 📞 Contato
Sistema desenvolvido para **Simone Rocha - Nail Designer**

---

**Versão:** 2.0
**Data:** Janeiro 2026
**Status:** ✅ Completo e Funcional
