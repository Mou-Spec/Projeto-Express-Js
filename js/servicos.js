// Sistema de pesquisa de serviços
document.addEventListener('DOMContentLoaded', function() {
    const botao = document.getElementById("botaoPesquisar");
    const campo = document.getElementById("campoPesquisa");
    const resultado = document.getElementById("resultado");
    
    const materiais = {
        'garrafa pet': {
            titulo: 'Descarte Correto — Garrafa PET',
            descricao: 'As garrafas PET devem ser lavadas e secas antes do descarte. Retire o rótulo e a tampa, pois são de tipos de plástico diferentes. Coloque-as no lixo destinado à reciclagem de plásticos ou leve a um ponto de coleta seletiva.',
            categoria: 'Plástico',
            dica: '💡 Amasse a garrafa para ocupar menos espaço no coletor!'
        },
        'papelão': {
            titulo: 'Descarte Correto — Papelão',
            descricao: 'Desmonte as caixas de papelão para economizar espaço. Certifique-se de que estejam secas e limpas. Se estiverem sujas com gordura ou alimentos, não podem ser recicladas.',
            categoria: 'Papel',
            dica: '💡 Remova fitas adesivas e plásticos antes de descartar!'
        },
        'vidro': {
            titulo: 'Descarte Correto — Vidro',
            descricao: 'Lave bem os frascos e potes de vidro. Separe por cores quando possível (transparente, verde, âmbar). Cuidado com vidros quebrados - embale em papel grosso e identifique.',
            categoria: 'Vidro',
            dica: '💡 Espelhos e vidros de janela não são recicláveis!'
        },
        'alumínio': {
            titulo: 'Descarte Correto — Alumínio',
            descricao: 'Latas de alumínio devem ser amassadas ou prensadas. Não é necessário retirar o rótulo. Lave para evitar odores e atrair animais.',
            categoria: 'Metal',
            dica: '💡 As latas de alumínio são 100% recicláveis!'
        },
        'eletrônico': {
            titulo: 'Descarte Correto — Eletrônicos',
            descricao: 'Nunca descarte no lixo comum. Leve a pontos de coleta específicos para lixo eletrônico. Pilhas e baterias devem ser separadas dos aparelhos.',
            categoria: 'Eletrônico',
            dica: '💡 Muitas lojas de eletrônicos aceitam aparelhos antigos!'
        }
    };

    function pesquisarMaterial() {
        const valor = campo.value.trim().toLowerCase();
        
        if (materiais[valor]) {
            const material = materiais[valor];
            resultado.innerHTML = `
                <div class="categoria-badge">${material.categoria}</div>
                <h2>${material.titulo}</h2>
                <p>${material.descricao}</p>
                <div class="dica">${material.dica}</div>
            `;
            resultado.classList.remove("resultado-oculto");
            resultado.classList.add("resultado-visivel");
        } else if (valor) {
            resultado.innerHTML = `
                <h2>Material não encontrado</h2>
                <p>Não encontramos informações sobre "<strong>${valor}</strong>".</p>
                <p>Tente pesquisar por: garrafa pet, papelão, vidro, alumínio, eletrônico</p>
            `;
            resultado.classList.remove("resultado-oculto");
            resultado.classList.add("resultado-visivel");
        } else {
            resultado.classList.remove("resultado-visivel");
            resultado.classList.add("resultado-oculto");
        }
    }

    // Event listeners
    botao.addEventListener("click", pesquisarMaterial);
    campo.addEventListener("keypress", (e) => {
        if (e.key === "Enter") pesquisarMaterial();
    });

    // Focar no campo de pesquisa ao carregar a página
    campo.focus();
});