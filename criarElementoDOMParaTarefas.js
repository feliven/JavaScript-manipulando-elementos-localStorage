import { atualizarBotoesEditar } from "./atualizarBotoesEditar.js";
import { listaTarefas } from "./funcoesLocalStorage.js";

// lista de tarefas a ser montada no DOM
const elementoListaTarefas = document.querySelector(".app__section-task-list");

export function criarElementoDOMParaTarefas() {
  elementoListaTarefas.innerHTML = "";
  // innerHTML = "" destroys the DOM elements and creates new ones.
  // This removes all previously attached event listeners.

  listaTarefas.forEach((tarefa, indice) => {
    let classeTarefaCompleta;
    let classeBotaoTarefaCompleta;

    if (tarefa.completa) {
      classeTarefaCompleta = "app__section-task-list-item-complete";
      classeBotaoTarefaCompleta = `disabled="disabled"`;
    } else {
      classeTarefaCompleta = "";
      classeBotaoTarefaCompleta = "";
    }

    const elementoTarefa = `
    <li class="app__section-task-list-item ${classeTarefaCompleta}">
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    <p class="app__section-task-list-item-description">${tarefa.descricaoTarefa}</p>
    <button class="app_button-edit" data-index="${indice}" ${classeBotaoTarefaCompleta}>
    <img src="/imagens/edit.png">
    </button>
    </li>
    `;

    elementoListaTarefas.innerHTML += elementoTarefa;
  });
  atualizarBotoesEditar();
}
