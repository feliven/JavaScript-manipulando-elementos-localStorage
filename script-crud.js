const botaoAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const campoTextoAdicionarTarefa = document.querySelector(".app__form-textarea");
const elementoListaTarefas = document.querySelector(".app__section-task-list");

const listaTarefas = JSON.parse(localStorage.getItem("listaTarefas")) || [];

let botoesEditarTarefa = document.querySelectorAll(".app_button-edit");

function criarElementoTarefa() {
  listaTarefas.forEach((tarefa) => {
    const elementoTarefa = `
    <li class="app__section-task-list-item">
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    <p class="app__section-task-list-item-description">${tarefa.descricaoTarefa}</p>
    <button class="app_button-edit">
    <img src="/imagens/edit.png">
    </button>
    </li>
    `;

    elementoListaTarefas.innerHTML += elementoTarefa;

    botoesEditarTarefa = document.querySelectorAll(".app_button-edit");
  });
}

criarElementoTarefa();
console.log(botoesEditarTarefa);

botaoAdicionarTarefa.addEventListener("click", () => {
  formularioAdicionarTarefa.classList.remove("hidden");
});

formularioAdicionarTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tarefa = { descricaoTarefa: campoTextoAdicionarTarefa.value };
  listaTarefas.push(tarefa);
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
  elementoListaTarefas.innerHTML = "";
  criarElementoTarefa();
  campoTextoAdicionarTarefa.value = "";
  formularioAdicionarTarefa.classList.add("hidden");
});

botoesEditarTarefa.forEach((botao) => {
  botao.onclick = () => {
    let nomeTarefa = botao.parentElement.querySelector("p");
    const novoNomeTarefa = prompt("Digite o novo nome da tarefa:");

    if (novoNomeTarefa) {
      nomeTarefa.textContent = novoNomeTarefa;
      console.log(novoNomeTarefa);
    } else {
      alert("ERRO");
    }
  };
});
