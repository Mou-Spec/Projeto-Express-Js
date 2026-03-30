// Sistema de cadastro
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formCadastro');
  const listaUsuarios = document.getElementById('listaUsuarios');
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Atualiza a lista na tela
  function atualizarLista() {
    listaUsuarios.innerHTML = '';
    
    if (usuarios.length === 0) {
      const li = document.createElement('li');
      li.className = 'list-group-item text-center text-muted';
      li.textContent = 'Nenhum usuário cadastrado';
      listaUsuarios.appendChild(li);
      return;
    }
    
    usuarios.forEach((u, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div>
          <strong>${u.nome}</strong> 
          <small class="text-muted d-block">${u.email}</small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removerUsuario(${index})">Remover</button>
      `;
      listaUsuarios.appendChild(li);
    });
  }

  // Evento de envio do formulário
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    // Validação básica
    if (!nome || !email || !senha) {
      mostrarAlerta('Por favor, preencha todos os campos.', 'danger');
      return;
    }

    // Verificar se email já existe
    if (usuarios.some(u => u.email === email)) {
      mostrarAlerta('Este e-mail já está cadastrado.', 'warning');
      return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    form.reset();
    atualizarLista();
    mostrarAlerta('Usuário cadastrado com sucesso!', 'success');
  });

  // Mostrar alerta
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

  // Inicializar lista
  atualizarLista();
});

// Função global para remover usuário
function removerUsuario(index) {
  if (confirm('Tem certeza que deseja remover este usuário?')) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Recarregar a lista
    location.reload();
  }
}