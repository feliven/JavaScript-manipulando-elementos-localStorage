"use strict";

// lista de tarefas a ser montada no DOM
const elementoListaTarefas = document.querySelector(".app__section-task-list");

// interface para adicionar nova tarefa
const botaoAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const campoTextoAdicionarTarefa = document.querySelector(".app__form-textarea");
const botaoCancelar = document.querySelector(".app__form-footer__button--cancel");
const botaoDeletar = document.querySelector(".app__form-footer__button--delete");

// puxa lista salva no localStorage
const listaTarefas = JSON.parse(localStorage.getItem("listaTarefas")) || [];

// mostra tarefa em andamento (última a ser clicada)
let paragrafoDescricaoTarefa = document.querySelector(".app__section-active-task-description");
let itensListaTarefas = document.querySelectorAll(".app__section-task-list-item");

// permite editar tarefas
let botoesEditarTarefa;

function atualizarTarefas() {
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
}

function criarElementoDOMParaTarefas() {
  elementoListaTarefas.innerHTML = "";
  // innerHTML = "" destroys the DOM elements and creates new ones.
  // This removes all previously attached event listeners.

  listaTarefas.forEach((tarefa, indice) => {
    const elementoTarefa = `
    <li class="app__section-task-list-item">
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    <p class="app__section-task-list-item-description">${tarefa.descricaoTarefa}</p>
    <button class="app_button-edit" data-index="${indice}">
    <img src="/imagens/edit.png">
    </button>
    </li>
    `;

    elementoListaTarefas.innerHTML += elementoTarefa;
  });
  atualizarBotoesEditar();
}

let tarefaClicadaEstaAtiva = false;
let tarefaClicada = null;
let liTarefaClicada = null;

function atualizarBotoesEditar() {
  botoesEditarTarefa = document.querySelectorAll(".app_button-edit");
  itensListaTarefas = document.querySelectorAll(".app__section-task-list-item");

  itensListaTarefas.forEach((item) => {
    item.addEventListener("click", (evento) => {
      const itemClicado = evento.target;

      if (itemClicado.closest(".app_button-edit")) {
        return; // bail out before changing active selection
      }

      tarefaClicadaEstaAtiva =
        itemClicado.classList.contains("app__section-task-list-item-active") ||
        itemClicado.parentElement.classList.contains("app__section-task-list-item-active");

      // remove borda ao redor de todas as tarefas
      document.querySelectorAll(".app__section-task-list-item-active").forEach((itemAtivo) => {
        itemAtivo.classList.remove("app__section-task-list-item-active");
      });

      // confere se usuário clicou no botão Editar, que tem classe "app_button-edit", ou se clicou no ícone, que é uma imagem
      if (itemClicado.classList.contains("app_button-edit") || itemClicado.tagName == "IMG") {
      } else {
        if (tarefaClicadaEstaAtiva === false) {
          // ativa borda ao redor da tarefa clicada se ela estiver inativa
          item.classList.add("app__section-task-list-item-active");
          itemClicado.parentElement.classList.add("app__section-task-list-item-active");
          paragrafoDescricaoTarefa.textContent = itemClicado.textContent;

          if (item.tagName == "LI") {
            liTarefaClicada = item;
            tarefaClicada = liTarefaClicada.textContent.trim();
          } else if (itemClicado.parentElement.tagName == "LI") {
            liTarefaClicada = itemClicado.parentElement;
            tarefaClicada = liTarefaClicada.textContent.trim();
          }
        } else {
          // desativa borda ao redor da tarefa clicada se ela estiver ativa
          item.classList.remove("app__section-task-list-item-active");
          itemClicado.parentElement.classList.remove("app__section-task-list-item-active");
          paragrafoDescricaoTarefa.textContent = "Nenhuma";

          liTarefaClicada = null;
          tarefaClicada = null;
        }
        console.log(tarefaClicada);
      }
    });
  });

  botoesEditarTarefa.forEach((botao) => {
    botao.addEventListener("click", () => {
      const indice = Number(botao.dataset.index);
      const novoNomeTarefa = prompt("Digite o novo nome da tarefa:");

      if (!novoNomeTarefa) {
        alert("ERRO");
        return;
      }

      // atualiza o array
      listaTarefas[indice].descricaoTarefa = novoNomeTarefa;
      atualizarTarefas();

      criarElementoDOMParaTarefas();
    });
  });
}

botaoAdicionarTarefa.addEventListener("click", () => {
  formularioAdicionarTarefa.classList.remove("hidden");
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
  listaTarefas.push(tarefa);
  atualizarTarefas();

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
  // body
});
