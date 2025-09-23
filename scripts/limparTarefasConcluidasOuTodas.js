import { getListaTarefas, setListaTarefas } from "./funcoesLocalStorage.js";

let listaTarefas = getListaTarefas();

// botões para limpar tarefas (só concluídas ou todas elas)
const botaoLimparTarefasConcluidas = document.getElementById("btn-remover-concluidas");
const botaoLimparTodasTarefas = document.getElementById("btn-remover-todas");

function limparConcluidasOuTodas(concluidasOuTodas) {
  let classeConcluidasOuTodas;

  switch (concluidasOuTodas) {
    case "concluidas":
      classeConcluidasOuTodas = ".app__section-task-list-item-complete";
      break;
    case "todas":
      classeConcluidasOuTodas = ".app__section-task-list-item";
      break;
    default:
      console.warn("Tipo inválido:", concluidasOuTodas);
      return;
  }

  document.querySelectorAll(classeConcluidasOuTodas).forEach((classe) => {
    classe.remove();
  });

  if (concluidasOuTodas === "concluidas") {
    listaTarefas = listaTarefas.filter((tarefa) => !tarefa.completa);
  } else if (concluidasOuTodas === "todas") {
    listaTarefas = [];
  }

  setListaTarefas(listaTarefas);
}

function limparComTernario(somenteConcluidas) {
  let classeConcluidasOuTodas = somenteConcluidas
    ? ".app__section-task-list-item-complete"
    : ".app__section-task-list-item";

  document.querySelectorAll(classeConcluidasOuTodas).forEach((classe) => {
    classe.remove();
  });

  listaTarefas = somenteConcluidas ? listaTarefas.filter((tarefa) => !tarefa.completa) : [];
  setListaTarefas(listaTarefas);
}

export function limparAleatorio() {
  const condicaoAleatoria = Math.random() < 0.5;
  if (condicaoAleatoria) {
    console.log("minha");
    botaoLimparTarefasConcluidas.onclick = () => limparConcluidasOuTodas("concluidas");
    botaoLimparTodasTarefas.onclick = () => limparConcluidasOuTodas("todas");
  } else {
    console.log("ternario");
    botaoLimparTarefasConcluidas.onclick = () => limparComTernario(true);
    botaoLimparTodasTarefas.onclick = () => limparComTernario(false);
  }
}
