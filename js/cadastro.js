// Sistema de cadastro


window.removerUsuario = async function(id) {
    if (!id) {
        alert("Erro: ID do usuário não encontrado. Verifique seu banco de dados.");
        return;
    }

    if (confirm('Tem certeza que deseja remover este usuário?')) {
        try {
            const resposta = await fetch(`/usuarios/${id}`, {
                method: 'DELETE'
            });

            if (resposta.ok) {
                location.reload(); 
            } else {
                alert('Erro ao tentar remover o usuário.');
            }
        } catch (erro) {
            console.error(erro);
            alert('Erro de conexão com o servidor.');
        }
    }
};

// 2. Lógica que roda quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formCadastro');
    const listaUsuarios = document.getElementById('listaUsuarios');

    // Atualiza a lista na tela
    async function atualizarLista() {
        try {
            const resposta = await fetch('/usuarios'); 
            const usuarios = await resposta.json();
            
            listaUsuarios.innerHTML = '';
            
            if (usuarios.length === 0) {
                const li = document.createElement('li');
                li.className = 'list-group-item text-center text-muted';
                li.textContent = 'Nenhum usuário cadastrado';
                listaUsuarios.appendChild(li);
                return;
            }
            
            usuarios.forEach((u) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <div>
                        <strong>${u.nome}</strong> 
                        <small class="text-muted d-block">${u.email}</small>
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="removerUsuario(${u.id})">Remover</button>
                `;
                listaUsuarios.appendChild(li);
            });
        } catch (erro) {
            console.error("Erro ao carregar a lista:", erro);
        }
    }

    // Lógica de envio do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const endereco = document.getElementById('endereco').value.trim(); 
        const telefone = document.getElementById('telefone').value.trim();

        if (!nome || !email || !senha) {
            mostrarAlerta('Por favor, preencha todos os campos.', 'danger');
            return;
        }

        try {
            const resposta = await fetch('/usuarios', {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha, telefone, endereco})
            });

            if (resposta.ok) {
                form.reset();
                atualizarLista(); 
                mostrarAlerta('Usuário cadastrado com sucesso!', 'success');
            } else {
                mostrarAlerta('Erro ao cadastrar usuário.', 'danger');
            }
        } catch (erro) {
            mostrarAlerta('Erro de conexão com o servidor.', 'danger');
        }
    });

    // Mostrar alerta animado
    function mostrarAlerta(mensagem, tipo) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${tipo} mt-3`;
        alertDiv.textContent = mensagem;
        
        const container = form.parentElement;
        container.insertBefore(alertDiv, form.nextSibling);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // Inicializar lista quando a página abre
    atualizarLista();
});