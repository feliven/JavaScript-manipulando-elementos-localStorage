// puxa lista salva no localStorage
let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas")) || [];

function atualizarTarefas() {
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
}

export function getListaTarefas() {
  return listaTarefas;
}

export function setListaTarefas(novaLista) {
  listaTarefas.length = 0;
  listaTarefas.push(...novaLista);
  atualizarTarefas();
}

export function adicionarTarefa(tarefa) {
  listaTarefas.push(tarefa);
  atualizarTarefas();
}
