import { criarElementoDOMParaTarefas } from "./criarElementoDOMParaTarefas.js";
import { getListaTarefas, atualizarTarefas } from "./funcoesLocalStorage.js";

// mostra tarefa em andamento (última a ser clicada)
let paragrafoDescricaoTarefa = document.querySelector(".app__section-active-task-description");
let itensListaTarefas = document.querySelectorAll(".app__section-task-list-item");

// permite editar tarefas
let botoesEditarTarefa;
let tarefaClicadaEstaAtiva = false;
export let tarefaClicada = null;
export let liTarefaClicada = null;

export function atualizarBotoesEditar() {
  let listaTarefas = getListaTarefas();

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

      const tarefaClicadaEstaCompleta =
        itemClicado.classList.contains("app__section-task-list-item-complete") ||
        itemClicado.parentElement.classList.contains("app__section-task-list-item-complete");

      if (!tarefaClicadaEstaCompleta) {
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
        }
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
