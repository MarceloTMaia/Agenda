// Função para exibir contatos na tela
function exibirContatos(contatos) {
    const listaContatos = document.getElementById('lista-contatos');
    listaContatos.innerHTML = ''; // Limpa a lista de contatos

    contatos.forEach(contato => {
        const li = document.createElement('li');
        li.textContent = `${contato.nome} - ${contato.email}`;
        listaContatos.appendChild(li);
    });
}

// Função para obter contatos via GET
async function buscarContatos() {
    try {
        const response = await fetch('http://127.0.0.1:5000/contatos');
        const contatos = await response.json();
        exibirContatos(contatos);
    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
    }
}

// Função para cadastrar contato via POST
async function cadastrarContato(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const novoContato = {
        nome,
        email
    };

    try {
        const response = await fetch('http://127.0.0.1:5500/contatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoContato)
        });

        const data = await response.json();
        alert(data.mensagem || 'Erro ao cadastrar contato!');
        buscarContatos(); // Atualiza a lista de contatos
    } catch (error) {
        console.error('Erro ao cadastrar contato:', error);
        alert('Erro ao cadastrar contato!');
    }
}

// Evento para enviar o formulário
document.getElementById('form-contato').addEventListener('submit', cadastrarContato);

// Carrega os contatos quando a página for carregada
window.onload = buscarContatos;
