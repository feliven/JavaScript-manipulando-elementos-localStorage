"use strict";

import { criarElementoDOMParaTarefas } from "./criarElementoDOMParaTarefas.js";
import { tarefaClicada, liTarefaClicada } from "./atualizarBotoesEditar.js";
import { getListaTarefas, adicionarTarefa, setListaTarefas } from "./funcoesLocalStorage.js";
import { limparAleatorio } from "./limparTarefasConcluidasOuTodas.js";

// interface para adicionar nova tarefa
const botaoAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const campoTextoAdicionarTarefa = document.querySelector(".app__form-textarea");
const botaoCancelar = document.querySelector(".app__form-footer__button--cancel");
const botaoDeletar = document.querySelector(".app__form-footer__button--delete");

botaoAdicionarTarefa.addEventListener("click", () => {
  formularioAdicionarTarefa.classList.remove("hidden");
  campoTextoAdicionarTarefa.focus();
});

formularioAdicionarTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();

  /*   // evita criar tarefas vazias
  const inputAdicionarTarefa = (campoTextoAdicionarTarefa.value || "").trim();
  if (!inputAdicionarTarefa) {
    alert("Digite uma descrição válida.");
    return;
  } */

  const tarefa = { descricaoTarefa: campoTextoAdicionarTarefa.value };
  adicionarTarefa(tarefa);

  criarElementoDOMParaTarefas();

  ocultarELimparCampoAdicionarTarefa();
});

botaoCancelar.addEventListener("click", () => {
  ocultarELimparCampoAdicionarTarefa();
});

botaoDeletar.addEventListener("click", () => {
  campoTextoAdicionarTarefa.value = "";
});

function ocultarELimparCampoAdicionarTarefa() {
  campoTextoAdicionarTarefa.value = "";
  formularioAdicionarTarefa.classList.add("hidden");
}

criarElementoDOMParaTarefas();

document.addEventListener("FocoFinalizado", () => {
  let listaTarefas = getListaTarefas();

  if (tarefaClicada && liTarefaClicada) {
    liTarefaClicada.classList.remove("app__section-task-list-item-active");
    liTarefaClicada.classList.add("app__section-task-list-item-complete");
    liTarefaClicada.querySelector("button").setAttribute("disabled", "disabled");

    // encontra posição da tarefa finalizada na lista de tarefas
    const parentUL = liTarefaClicada.parentElement;
    const childrenLI = Array.from(parentUL.children);
    const posicao = childrenLI.indexOf(liTarefaClicada);

    // salva no localStorage a informação de que a tarefa foi completa
    listaTarefas[posicao].completa = true;

    console.log(listaTarefas);
    setListaTarefas(listaTarefas);
  }
});

limparAleatorio();
