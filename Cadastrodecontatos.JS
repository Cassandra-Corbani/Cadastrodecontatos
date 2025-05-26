let listaContatos = [];


function validarTelefone(telefone) {

    
    if (telefone.length === 10 || telefone.length === 11) {
        return true; 
    } else {
        return false; 
    }
}

function adicionarContato() {
    
    const inputNome = document.getElementById('input_nome');
    const inputTelefoneP = document.getElementById('input_telefone_principal');
    const inputTelefoneS = document.getElementById('input_telefone_secundario');

        if (!inputNome.value.trim()) {
        alert("Por favor, insira um nome."); 
        return; 
    }
    if (!inputTelefoneP.value.trim()) {
        alert("Por favor, insira o telefone principal.");
        return;
    }
    if (!inputTelefoneS.value.trim()) {
        alert("Por favor, insira o telefone secundário.");
        return;
    }

    
    if (!validarTelefone(inputTelefoneP.value)) {
        alert("O telefone principal deve ter 10 ou 11 dígitos.");
        return;
    }
    if (!validarTelefone(inputTelefoneS.value)) {
        alert("O telefone secundário deve ter 10 ou 11 dígitos.");
        return;
    }

    
    for (const contato of listaContatos) {

      
        if (contato.telefonePrincipal === inputTelefoneP.value) {
            alert("O telefone principal já está cadastrado.");
            return; 
        }
    }

  
    const novoContato = {
        nome: inputNome.value,
        telefonePrincipal: inputTelefoneP.value,
        telefoneSecundario: inputTelefoneS.value
    };

   
    listaContatos.push(novoContato);
    salvarContato();

    
    adicionarContatoNaTela(novoContato.nome, novoContato.telefonePrincipal, novoContato.telefoneSecundario);
}


function salvarContato() {


    localStorage.setItem('listaDeContatos', JSON.stringify(listaContatos));
}

function carregarContatos() {

    const armazenamento = localStorage.getItem('listaDeContatos');


    listaContatos = armazenamento ? JSON.parse(armazenamento) : [];


    for (const contato of listaContatos) {
        adicionarContatoNaTela(contato.nome, contato.telefonePrincipal, contato.telefoneSecundario);
    }
}

function adicionarContatoNaTela(nome, telefone1, telefone2) {


    const novaLinha = document.createElement("tr");


    const colunaNome = document.createElement("td");
    const colunaTelefonePrincipal = document.createElement("td");
    const colunaTelefoneSecundario = document.createElement("td");

    colunaNome.innerText = nome;
    colunaTelefonePrincipal.innerText = telefone1;

    novaLinha.appendChild(colunaNome);
    novaLinha.appendChild(colunaTelefonePrincipal);
    novaLinha.appendChild(colunaTelefoneSecundario);

    const tabelaContatos = document.getElementById("tabela_contatos");
    tabelaContatos.appendChild(novaLinha);
}

function configurarEventos() {
    console.log("Página carregada");

    carregarContatos();


    const botaoAdicionar = document.getElementById('botao_adicionar');
    botaoAdicionar.addEventListener('click', adicionarContato);
}

window.addEventListener('load', configurarEventos);