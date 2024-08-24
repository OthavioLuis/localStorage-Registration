function dadosSalvar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const idade = document.getElementById("idade").value;

    if (nome && email && idade) {
        //aqui vai verificar se já tem dados salvos no localStorage
        let dados = JSON.parse(localStorage.getItem('dados')) || [];

        dados.push({ nome: nome, email: email, idade: idade });

        localStorage.setItem('dados', JSON.stringify(dados));

        //aqui vai limpar o formulário
        document.getElementById('formulario').reset();
        
        //aqui vai atualizar a lista
        exibirDados();
    } else {
        alert('Preencha todos os campos please!');
    }
}

function exibirDados() {
    const dados = JSON.parse(localStorage.getItem('dados'));
    const lista = document.getElementById('lista');

    //aqui vai limpar a lista antes de atualizar
    lista.innerHTML = '';
    
    //aqui vai verificar se tem algum dado salvo
    if (dados && dados.length > 0) {
        
        dados.forEach(function(dado, index) {
            const item = document.createElement('li');
            item.classList.add('li-itens');
            item.innerHTML = `Nome: ${dado.nome}</br> Idade: ${dado.idade}</br> Email: ${dado.email}</br>`;

            const botaoApagar = document.createElement('button')
            botaoApagar.textContent = 'Excluir';
            botaoApagar.classList.add('botao-li');
            botaoApagar.addEventListener('click', function() {
                //aqui ele vai remover o conjunto de dados do array
                dados.splice(index, 1); //esse splice é fundamental pra modifical algo dentro de um array
                localStorage.setItem('dados', JSON.stringify(dados)); //aqui vai atualizar os dados
                exibirDados(); //aqui atualiza a lista
            })

            const botaoEditar = document.createElement('button');
            botaoEditar.textContent = 'Editar';
            botaoEditar.classList.add('botao-li');
            botaoEditar.addEventListener('click', function() {

                document.getElementById('nome').value = dado.nome;
                document.getElementById('idade').value = dado.idade;
                document.getElementById('email').value = dado.email;
                dados.splice(index, 1);
                localStorage.setItem('dados', JSON.stringify(dados));
                exibirDados();
            });

            item.appendChild(botaoEditar);
            item.appendChild(botaoApagar);
            lista.appendChild(item); //aqui adicionar o item a lista
        });
    } else {
        //vamos criar uma mensagem se não tiver nenhum dado salvo na lista
        const nenhumItem = document.createElement('li');
        nenhumItem.textContent = 'Nenhum dado salvo, salve algum please!';
        lista.appendChild(nenhumItem);
    }
}

window.onload = exibirDados; //aqui vai exibir os dados ao carregar a página se existir algum dado salvo

//aqui ao fazer o envio do formulário vai adicionar o evento
document.getElementById('formulario').addEventListener('submit', function(evento) {
    evento.preventDefault(); //esse evita o envio padrão do formulário
    dadosSalvar();
})