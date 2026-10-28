const mensagem = document.querySelector('#mensagem');
const tabela = document.querySelector('#tabela');
const resultado = document.querySelector('#lista-tarefas');
const vazia = document.querySelector('#vazia');
const campoTarefa = document.querySelector('#tarefa');
const campoDescricao = document.querySelector('#descricao');
const campoData = document.querySelector('#data');

let tarefas = [];
let proximoId = 1;

document.addEventListener('click', (event) => {
    if (event.target.id === 'adicionar') {
        event.preventDefault();

        const tarefa = campoTarefa.value.trim();
        const descricao = campoDescricao.value.trim();
        const data = campoData.value.trim();

        if (tarefa === '' || descricao === '' || data === '') {
            mensagem.textContent = 'Por favor, preencha todos os campos.';
            mensagem.hidden = false;
            return;
        }

        tarefas.push({ id: proximoId, tarefa: tarefa, descricao: descricao, data: data });
        proximoId++;

        campoTarefa.value = '';
        campoDescricao.value = '';
        campoData.value = '';
        mensagem.hidden = true;
        campoTarefa.focus();
    }

    if (event.target.className === 'excluir') {
        const id = Number(event.target.dataset.id);

        for (let i = 0; i < tarefas.length; i++) {
            if (tarefas[i].id === id) {
                tarefas.splice(i, 1);
            }
        }
    }

    resultado.textContent = '';

    for (const item of tarefas) {
        const linha = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.textContent = item.tarefa;

        const td2 = document.createElement('td');
        td2.textContent = item.descricao;

        const td3 = document.createElement('td');
        td3.textContent = item.data;

        const td4 = document.createElement('td');
        const excluir = document.createElement('button');
        excluir.textContent = 'Excluir';
        excluir.className = 'excluir';
        excluir.dataset.id = item.id;
        td4.append(excluir);

        linha.append(td1, td2, td3, td4);
        resultado.append(linha);
    }

    tabela.hidden = tarefas.length === 0;
    vazia.hidden = tarefas.length > 0;
});