// puxa lista salva no localStorage
export var listaTarefas = JSON.parse(localStorage.getItem("listaTarefas")) || [];

export function atualizarTarefas() {
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
}
